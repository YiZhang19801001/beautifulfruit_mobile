import types from "./actionTypes";

import Auth from "./Auth";
import Order from "./Order";
import Product from "./Product";
import Payment from "./Payment";
import Modal from "./Modal";
import App from "./App";
import Shop from "./Shop";
import Cart from "./Cart";
export const actionTypes = types;

// App actions
export const initialApp = App.index;
export const switchLanguage = App.switchLanguage;

// Product actions
export const getProducts = Product.index;

// Shopping Cart List actions
export const addToShoppingCartList = Cart.add;

export const decreaseFromShoppingCartList = Cart.decreaseByProduct;

export const increaseOrderItem = Cart.increaseByOrderItem;

export const decreaseOrderItem = Cart.decreaseByOrderItem;
export const renderNewShoppingCart = Cart.renderNew;

// Shop actions
export const fetchShops = Shop.index;
export const selectShop = Shop.selectShop;
export const selectDate = Shop.selectDate;

// auth actions
export const login = Auth.login;
export const register = Auth.register;
export const fetchUser = Auth.show;

// payment actions
export const setPaymentMethod = Payment.setPaymentMethod;
export const makePayment = Payment.create;
export const queryPayment = Payment.query;
export const continuePay = Payment.continuePay;

// order actions
export const fetchOrders = Order.index;
export const saveOrder = Order.save;
export const deleteOrder = Order.deleteOrder;
export const changeCustomerComments = Order.comments;

// modal actions
export const hideModal = Modal.hide;
export const showModal = Modal.show;
