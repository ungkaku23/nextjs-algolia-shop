import React, { useState } from "react";
import {
  createAsyncThunk,
  createSlice
} from "@reduxjs/toolkit";
import axios from "axios";
import { transformDataToSearchable } from "../helper";

const _ = require("lodash");

// This action is what we will call using the dispatch in order to trigger the API call.
export const updateAlogliaStorage = createAsyncThunk(
  'product/AlgoliaStorage',
  async (products: any, thunkAPI) => {
    thunkAPI.dispatch(product.actions.updateLoadingStatus("Loading Search Engine"));

    const response = await axios.post('/api/algolia', { products });

    return {
      data: response.data
    };
  }
);

// This action is what we will call using the dispatch in order to trigger the API call.
export const getProductCategories = createAsyncThunk(
  'product/ProductCategories',
  async (parentId: number, thunkAPI) => {

    thunkAPI.dispatch(product.actions.updateLoadingStatus("Loading Categories"));

    if (parentId === 0) {
      const response = await axios.post('/api/sleekshop', {
        invoke: `sleekShop.categories.getCategories(${parentId}, "en_EN")`
      });

      if (response.data.object === "shopcategories") {
        let axiosHandlers = response.data.categories.map((c: any) => {
          return axios.post('/api/sleekshop', {
            invoke: `sleekShop.categories.getCategories(${c.id}, "en_EN")`
          });
        });
        const axiosResponses = await Promise.all(axiosHandlers);

        let fullCategories = response.data.categories.map((c: any, cidx: any) => {
          if (axiosResponses[cidx] && axiosResponses[cidx].data.object === "shopcategories") {
            let value = axiosResponses[cidx].data.categories.map((a: any) => a.id);
            let children = axiosResponses[cidx].data.categories.map((a: any) => ({
              label: a.label,
              value: a.label,
              id: a.id
            }));

            return {
              id: c.id,
              label: c.label,
              children,
              value,
              isOpened: false
            };
          } else {
            return {
              id: c.id,
              label: c.label,
              children: [],
              value: [],
              isOpened: false
            };
          }
        });

        console.log('fullCategories: ', fullCategories);

        return {
          data: fullCategories,
          parentId
        };
      } else {
        return {
          data: [],
          parentId
        };
      }
    } else {
      const response = await axios.post('/api/sleekshop', {
        invoke: `sleekShop.categories.getCategories(${parentId}, "en_EN")`
      });

      return {
        data: response.data,
        parentId
      };
    }
  }
);

// This action is what we will call using the dispatch in order to trigger the API call.
export const getProductsInCategory = createAsyncThunk(
  'product/ProductsInCategory',
  async (diffs: any, thunkAPI) => {
    if (diffs.isAdded) {
      console.log("will get latest products under the target category");
      thunkAPI.dispatch(product.actions.updateLoadingStatus("Loading Products"));

      const response = await axios.post('/api/sleekshop', {
        invoke: `sleekShop.categories.getProductsInCategory(${diffs.value}, "en_EN", "US", "price", "DESC", 0, 500, [])`
      });

      return {
        data: response.data,
        categoryId: diffs.value
      };
    } else {
      return {
        categoryId: diffs.value
      };
    }
  }
);

// This action is what we will call using the dispatch in order to trigger the API call.
export const getAllProducts = createAsyncThunk(
  'product/AllProducts',
  async (categories: any, thunkAPI) => {
    thunkAPI.dispatch(product.actions.updateLoadingStatus("Loading Products"));

    let axiosHandlers = categories.reduce((all: any, c: any) => all.concat(c.value), [])
                                  .map((c: any) => axios.post('/api/sleekshop', {
                                    invoke: `sleekShop.categories.getProductsInCategory(${c}, "en_EN", "US", "price", "DESC", 0, 500, [])`
                                  }));
    let axiosResponses = await Promise.all(axiosHandlers);
    let products: any = [];

    axiosResponses.forEach((ar: any) => {
      if (ar.hasOwnProperty("data")) {
        if (ar.data.object === "products_in_category") {
          for (let key in ar.data.products) {
            if (_.find(products, (p: any) => p.id === ar.data.products[key].id) === undefined) {
              products.push(
                transformDataToSearchable({
                  category_id: ar.data.category.id,
                  ...ar.data.products[key]
                })
              );
            }
          }
        }
      }
    });
    
    return products;
  }
);

export const product = createSlice({
  name: "product",
  initialState: {
    cart: [],
    displayMode: 'grid',
    categories: [],
    products: [],
    loadingStatus: ""
  },
  reducers: {
    addCartTemporarily: (state, action) => {
      let temp: any = Object.assign([], state.cart);
      let index: number = _.findIndex(temp, (o: any) => { return o.id === action.payload.id; });
      if (index !== -1) {
        temp = temp.map((o: any) => o.id === action.payload.id ? {...action.payload, quantity_of_cart: o.quantity_of_cart + action.payload.quantity_of_cart} : o);
      } else {
        temp.push(action.payload);
      }

      state.cart = temp;
    },
    changeDisplayMode: (state, action) => {
      state.displayMode = action.payload;
    },
    updateProductCategories: (state, action) => {
      state.categories = action.payload;
    },
    updateProducts: (state, action) => {
      state.products = action.payload;
    },
    updateLoadingStatus: (state, action) => {
      state.loadingStatus = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getProductCategories.fulfilled, (state, action) => {
      if (action.payload.parentId === 0) {
        console.log('set categories: ', action.payload.data);
        state.categories = action.payload.data;
      } else {
        if (action.payload.data.object === "shopcategories") {
          let temp: any = state.categories.map((p: any) => {
            if (p.label === action.payload.data.parent_category.label) {
              return {
                ...p,
                children: action.payload.data.categories.map((c: any) => {
                  return {
                    label: c.label,
                    value: c.label,
                    id: c.id
                  };
                })
              };
            }

            return p;
          });
          state.categories = temp;
        }
      }
      state.loadingStatus = "";
    });

    builder.addCase(getProductsInCategory.fulfilled, (state, action) => {
      let products: any = Object.assign([], state.products);

      if (action.payload.hasOwnProperty("data")) {
        if (action.payload.data.object === "products_in_category") {
          for (let key in action.payload.data.products) {
            if (_.find(products, (p: any) => p.id === action.payload.data.products[key].id) === undefined) {
              products.push(
                transformDataToSearchable({
                  category_id: action.payload.categoryId,
                  ...action.payload.data.products[key]
                })
              );
            }
          }
        }
      } else {
        products = products.filter((o: any) => o.category_id !== action.payload.categoryId);
      }
      
      console.log('products: ', products);
      state.products = products;
      state.loadingStatus = "";
    });

    builder.addCase(updateAlogliaStorage.fulfilled, (state, action) => {
      console.log("algolia done: ", action.payload);
      state.loadingStatus = "";
    });

    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      console.log("all products: ", action.payload);
      state.products = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  addCartTemporarily,
  changeDisplayMode,
  updateProductCategories,
  updateProducts
} = product.actions;

export default product.reducer;
