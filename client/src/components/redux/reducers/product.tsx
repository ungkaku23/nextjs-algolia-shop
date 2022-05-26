import React, { useState } from "react";
import { 
  createAsyncThunk,
  createSlice 
} from "@reduxjs/toolkit";
import axios from "axios";

const _ = require("lodash");

// This action is what we will call using the dispatch in order to trigger the API call.
export const getProductCategories = createAsyncThunk(
  'product/ProductCategories', 
  async (parentId: number) => {
    const response = await axios.post('http://localhost:8080/sleekshop', {
      invoke: `sleekShop.categories.getCategories(${parentId}, "en_EN")`
    });

    return {
      data: response.data,
      parentId
    };
  }
);

export const product = createSlice({
  name: "product",
  initialState: {
    cart: [],
    displayMode: 'grid',
    categories: []
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
                    value: c.label
                  };
                })
              };
            }

            return p;
          });
          state.categories = temp;
        }
      }
    })
  },
});

// Action creators are generated for each case reducer function
export const { 
  addCart,
  changeDisplayMode,
  updateProductCategories
} = product.actions;

export default product.reducer;
