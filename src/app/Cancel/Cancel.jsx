import React from "react";

import { connect } from "react-redux";

import { history } from "../../history";

import { Head } from "../shared/";
const Cancel = ({ match, labels }) => {
  const channel = match.params.channel;
  const navToAccount = () => {
    history.push(`${process.env.PUBLIC_URL}/account`);
  };

  return (
    <>
      <Head title={labels.app_head_title} pageName="cancel" />
      <div className="component-cancel">
        {/* <OrderCard order={canceledOrder} /> */}
        <div className="content">
          <h3>Your Order has been canceled</h3>
          <p>you can check it in history orders</p>
        </div>
        <button onClick={navToAccount}>check history order</button>
      </div>
    </>
  );
};

const mapStateToProps = ({ labels }) => {
  return { labels };
};

export default connect(mapStateToProps)(Cancel);
