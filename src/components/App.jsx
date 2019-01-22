import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

import Carousel from "./Carousel";
import Head from "./Head";
import Products from "./Products";
import Confirm from "./Confirm";
import Payment from "./Payment";

import "../css/App.css";

const App = () => {
  return (
    <div className="component-app">
      <Router>
        <React.Fragment>
          <Head title="天府川菜馆" />
          <Carousel />
          <Route exact path={`/products`} component={Products} />
          <Route exact path={`/confirm`} component={Confirm} />
          <Route exact path={`/payment`} componete={Payment} />
          <Route exact path={`/`} component={Products} />
        </React.Fragment>
      </Router>
    </div>
  );
};

export default App;
