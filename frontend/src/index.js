import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import productsReducer from './Features/productSlice';
import { productsApi } from './Features/productsApi';
import cartReducer, { getTotals } from "./Features/cartSlice";
import { productsFetch } from "./Features/productSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
})

store.dispatch(productsFetch());
store.dispatch(getTotals());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);