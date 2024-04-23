import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    isFetching: false,
    error: null,
  },

  reducers: {
    //GET ALL
    getOrderStart: (state) => {
      state.isFetching = true;
    },
    getOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.orders = action.payload;
    },
    getOrderFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    //DELETE
    deleteOrderStart: (state) => {
      state.isFetching = true;
    },
    deleteOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.orders.splice(
        state.orders.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteOrderFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    //UPDATE
    updateOrderStart: (state) => {
      state.isFetching = true;
    },
    updateOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.orders[
        state.orders.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.order;
    },
    updateOrderFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const {
  getOrderStart,
  getOrderSuccess,
  getOrderFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
  updateOrderFailure,
} = orderSlice.actions;
export default orderSlice.reducer;
