import axios from "axios";
import { SUCCESS, REQUEST, UPDATE } from "./actionTypes";

export const getOrderData = () => (dispatch) => {
  dispatch({ type: REQUEST });

  axios
    .get("https://reeco-orders.onrender.com/orders")
    .then((res) => {
      dispatch({ type: SUCCESS, payload: res.data });
    })
    .catch(() => {
      console.log("failed");
    });
};

export const updateData = (payload) => (dispatch) => {
    dispatch({ type: UPDATE,payload });
};
