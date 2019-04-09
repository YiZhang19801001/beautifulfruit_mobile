import types from "./actionTypes";
import { makeHeader } from "../_helpers";

import { kidsnParty } from "../_apis";
import { history } from "../history";

const login = () => {
  return async function(dispatch, getState) {
    const { values } = getState().form.loginForm;

    const response = await kidsnParty.post(`/user/login`, values);
    if (response.data.success) {
      dispatch({ type: types.login, payload: response.data.data });
      localStorage.setItem(
        "guoli_groupon_user",
        JSON.stringify(response.data.data)
      );
      history.push(`${process.env.PUBLIC_URL}/`);
    } else {
      alert("email or password incorrect");
    }
  };
};

const register = () => {
  return async function(dispatch, getState) {
    const { values } = getState().form.registerForm;
    const response = await kidsnParty.post(`/user/register`, values);
    dispatch({ type: "abc", payload: response.data });
    history.push(`${process.env.PUBLIC_URL}/`);
  };
};

const show = () => {
  return async function(dispatch) {
    if (localStorage.getItem("guoli_groupon_user")) {
      const headers = makeHeader();
      const response = await kidsnParty
        .get("/user", { headers })
        .catch(error => {
          localStorage.removeItem("guoli_groupon_user");
          history.push(`${process.env.PUBLIC_URL}/login`);
          return { type: "abc", payload: error };
        });

      if (response.status === 200) {
        localStorage.setItem(
          "guoli_groupon_user",
          JSON.stringify(response.data.data)
        );

        dispatch({ type: types.login, payload: response.data.data });
      } else {
        localStorage.removeItem("guoli_groupon_user");
        history.push(`${process.env.PUBLIC_URL}/login`);
      }
    } else {
      history.push(`${process.env.PUBLIC_URL}/login`);
      return { type: "abc" };
    }
  };
};

export default {
  login,
  register,
  show
};
