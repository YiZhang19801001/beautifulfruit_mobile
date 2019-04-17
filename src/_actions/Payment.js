import types from "./actionTypes";

import { kidsnParty } from "../_apis";
import { makeHeader, makeOrderInfo, makeInvoice_no } from "../_helpers";
import { history } from "../history";
const create = () => {
  return async function(dispatch, getState) {
    const {
      user,
      pickedDate,
      selectedShop,
      paymentMethod,
      customerComments
    } = getState();
    const { location_id } = selectedShop;
    const headers = makeHeader();
    const { shoppingCartList } = getState();

    const orderInfo = makeOrderInfo(shoppingCartList);
    const invoice_no = makeInvoice_no();

    const today = new Date();
    const timestamps = Math.floor(today / 1000);

    const requestBody = {
      invoice_no: invoice_no,
      store_id: location_id,
      customer_id: user.user_id,
      channel: paymentMethod,
      fax: pickedDate,
      total: orderInfo.total,
      order_items: orderInfo.items,
      timestamps,
      quantity: orderInfo.quantity,
      customerComments
    };
    const response = await kidsnParty.post("/payment", requestBody, {
      headers
    });

    dispatch({ type: types.refreshShoppingCart });

    if (response.data.status === "success") {
      window.location.href = response.data.approvel_url;
    } else {
      history.push(`${process.env.PUBLIC_URL}/`);
    }
  };
};

const continuePay = (order_id, quantity) => {
  return async function(dispatch) {
    const headers = makeHeader();
    const orderResponse = await kidsnParty.get(`/orders/${order_id}`, {
      headers
    });
    const order = orderResponse.data.order;

    const today = new Date();
    const timestamps = Math.floor(today / 1000);
    const {
      invoice_no,
      store_id,
      customer_id,
      payment_method,
      total,
      order_items,
      comments,
      picked_date
    } = order;

    const requestBody = {
      order_id,
      invoice_no,
      store_id,
      customer_id,
      channel: payment_method,
      fax: picked_date,
      total,
      order_items,
      timestamps,
      quantity,
      customerComments: comments
    };

    const paymentResponse = await kidsnParty.post("/payment", requestBody, {
      headers
    });

    dispatch({ type: types.refreshShoppingCart });

    if (paymentResponse.data.status === "success") {
      window.location.href = paymentResponse.data.approvel_url;
    } else {
      history.push(`${process.env.PUBLIC_URL}/`);
    }
  };
};

const query = (channel, payment_id) => {
  return async function(dispatch) {
    const response = await kidsnParty.get(`payment`, {
      params: {
        channel,
        payment_id
      }
    });

    dispatch({
      type: types.setPaymentInformation,
      payload: response.data.payment_information
    });
  };
};

export const setPaymentMethod = value => {
  return {
    type: types.setPaymentMethod,
    payload: value
  };
};
export default {
  create,
  query,
  setPaymentMethod,

  continuePay
};
