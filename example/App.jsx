import React from "react";
import ReactDOM from "react-dom";
import ImmutableTree from "../src/ImmutableTree";
import data from "./data";
import Immutable from "immutable";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import BasicExample from "./BasicExample";
import InsertAndRemove from "./InsertAndRemove";

const App = () =>
  <Router>
    <div style={{ padding: "1rem" }}>
      <ul>
        <li>
          <Link replace to="/basic">basic example</Link>
        </li>
        <li>
          <Link replace to="/insert_remove">
            insert and remove example
          </Link>
        </li>
      </ul>
      <hr />
      <Route exact path="/basic" component={BasicExample} />
      <Route
        path="/insert_remove"
        component={InsertAndRemove}
      />
    </div>
  </Router>;
const app = document.getElementById("app");
ReactDOM.render(<App />, app, function () {
  document.getElementById("app").className = "";
});
