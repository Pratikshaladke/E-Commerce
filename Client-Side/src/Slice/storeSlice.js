const { createSlice } = require('@reduxjs/toolkit');
const cartSlice = createSlice({
  name: 'cart',
  initialState: [],

  reducers: {
    add(state, action) {
      const { _id } = action.payload;
      const find = state.find((item) => item._id === _id);
      console.log(find);
      if (find) {
        return state.map((item) =>
          item._id === _id
            ? {
              ...item,
              quantity: item.quantity + 1
            }
            : item
        );
      } else {
        state.push({
          ...action.payload,
          quantity: 1
        });
      }
    },

    remove(state, action) {
      console.log("remove", action.payload)
      return state.filter((item) => item._id !== action.payload);
    },

    increment(state, { payload }) {
      return state.map((item) =>
        item._id === payload
          ? {
            ...item,
            quantity: item.quantity + 1
          }
          : item
      );
    },

    decrement(state, { payload }) {
      return state.map((item) =>
        item._id === payload
          ? {
            ...item,
            quantity: item.quantity - 1
          }
          : item
      );
    },

  },
});
export const { add, remove, increment, decrement } = cartSlice.actions;
export default cartSlice.reducer;