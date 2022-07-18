import { act } from "@testing-library/react";
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    // look for the item i that matches the id and color that come from the payload.
    // we will construct our id by combining the id and color, as we can have the same id for the same product but different color
    const tempItem = state.cart.find((i) => i.id === id + color);
    if (tempItem) {
      // if there's a match, that item is already in cart.
      const tempCart = state.cart.map((cartItem) => {
        //Iterate over the cart to check where the item is
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount; // update the amount
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          return { ...cartItem, amount: newAmount };
        } else {
        }
      });

      return { ...state, cart: tempCart };
    } else {
      //If not, set up a new item
      const newItem = {
        //cart setup
        id: id + color, // these are the values coming from the state
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }

  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: tempCart };
  }

  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    // iterate over the cart to see if the item in the cart matches the payload id
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === "inc") {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        }
        if (value === "dec") {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1; //have the button to remove that item so keep it at 1 instead of removing it
          }
          return { ...item, amount: newAmount };
        }
      } else {
        return item; // return item as is
      }
    });
    return { ...state, cart: tempCart };
  }

  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem;
        total.total_items += amount;
        total.total_amount += amount * price;
        return total;
      },
      { total_items: 0, total_amount: 0 }
    );
    return { ...state, total_items, total_amount };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
