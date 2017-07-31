import React from "react";
import ReactDOM from "react-dom";
import ImmutableTree from "../src/ImmutableTree";
import data from "./data";
import Immutable from "immutable";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import BasicExample from "./BasicExample";
import InsertAndReomve from "./InsertAndReomve";

const App = () =>
  <Router>
    <div style={{ padding: "1rem" }}>
      <ul>
        <li>
          <Link replace to="/basic">basic example</Link>
        </li>
        <li>
          <Link replace to="/insert_remove">
            insert and reomve example
          </Link>
        </li>
      </ul>
      <hr />
      <Route exact path="/basic" component={BasicExample} />
      <Route
        path="/insert_remove"
        component={InsertAndReomve}
      />
    </div>
  </Router>;
const app = document.getElementById("app");
ReactDOM.render(<App />, app, function () {
  console.log(1);
  document.getElementById("app").className = "";
});
