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

    const response = await axios.post('/api/sleekshop', {
      invoke: `sleekShop.categories.getCategories(${parentId}, "en_EN")`
    });

    return {
      data: response.data,
      parentId
    };
  }
);

// This action is what we will call using the dispatch in order to trigger the API call.
export const getProductsInCategory = createAsyncThunk(
  'product/ProductsInCategory',
  async (diffs: any, thunkAPI) => {
    if (diffs.isAdded) {
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
    addCart: (state, action) => {
      let temp: any = Object.assign([], state.cart);
      let index: number = _.findIndex(temp, (o: any) => { return o.id === action.payload.id; });
      if (index !== -1) {
        temp = temp.map((o: any) => o.id === action.payload.id ? action.payload : o);
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
      if (action.payload.data.object === "shopcategories") {
        if (action.payload.parentId === 0) {
          state.categories = action.payload.data.categories.map((c: any) => {
            return {
              id: c.id,
              label: c.label,
              children: [],
              value: [],
              isOpened: false
            };
          });
        } else {
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
  },
});

// Action creators are generated for each case reducer function
export const {
  addCart,
  changeDisplayMode,
  updateProductCategories,
  updateProducts
} = product.actions;

export default product.reducer;
