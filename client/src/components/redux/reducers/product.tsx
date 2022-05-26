import React, { useState } from "react";
import { 
  createAsyncThunk,
  createSlice 
} from "@reduxjs/toolkit";

const _ = require("lodash");

// This action is what we will call using the dispatch in order to trigger the API call.
export const getProductCategories = createAsyncThunk('product/getProductCategories', async () => {
  console.log('start async');

});

export const product = createSlice({
  name: "product",
  initialState: {
    cart: [],
    displayMode: 'grid'
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
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getProductCategories.fulfilled, (state, action) => {
      console.log('getProductCategories: ', action.payload);
    })
  },
});

// Action creators are generated for each case reducer function
export const { 
  addCart,
  changeDisplayMode
} = product.actions;

export default product.reducer;
