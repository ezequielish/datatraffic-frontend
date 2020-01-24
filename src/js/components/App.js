import React, { Fragment, useEffect } from "react";
import Header from "./Header";
import Summary from "./Summary";
import Management from "./Management";
import Roles from "./Roles";

import { Router } from "@reach/router";
export const App = () => {
  return (
    <Fragment>
      <Header />

      <Router>
        <Summary path="/" />
        <Management path="/gestion" />
        <Roles path="/roles" />
      </Router>
    </Fragment>
  );
};

