import React, { useState } from "react";
import { createSlice } from "@reduxjs/toolkit";

export const auth = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false, // true or false
    sessionId: "", // session id
    loggedInMethod: "" // registered or guest
  },
  reducers: {
    setUserAuthStatus: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.sessionId = action.payload.sessionId;
      state.loggedInMethod = action.payload.loggedInMethod;
      localStorage.setItem("isLoggedIn", JSON.stringify(action.payload.isLoggedIn));
      localStorage.setItem("sessionId", JSON.stringify(action.payload.sessionId));
      localStorage.setItem("loggedInMethod", JSON.stringify(action.payload.loggedInMethod));
    },
    loadUserAuthStatus: (state, action) => {
      let isLoggedIn = JSON.parse(JSON.stringify(localStorage.getItem("isLoggedIn")));
      let sessionId = JSON.parse(JSON.stringify(localStorage.getItem("sessionId")));
      let loggedInMethod = JSON.parse(JSON.stringify(localStorage.getItem("loggedInMethod")));
      state.isLoggedIn = isLoggedIn === null ? "" : isLoggedIn;
      state.sessionId = sessionId === null ? "" : sessionId;
      state.loggedInMethod = loggedInMethod === null ? "" : loggedInMethod;
    }
  },
});

// Action creators are generated for each case reducer function
export const { 
  setUserAuthStatus,
  loadUserAuthStatus 
} = auth.actions;

export default auth.reducer;
