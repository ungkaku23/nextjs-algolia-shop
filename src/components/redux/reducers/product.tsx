import React, { useState } from "react";
import { createSlice } from "@reduxjs/toolkit";

const _ = require("lodash");

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
});

// Action creators are generated for each case reducer function
export const { 
  addCart,
  changeDisplayMode
} = product.actions;

export default product.reducer;
