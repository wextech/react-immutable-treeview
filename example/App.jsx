import React from "react";
import ReactDOM from "react-dom";
import ImmutableTree from "../src/ImmutableTree";
import data from "./data";
import Immutable from "immutable";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import BasicExample from './BasicExample'
import InsertAndReomve from './InsertAndReomve'

const App = () => (
  <Router>
    <div style={{ width: '100%' }}>
      <ul>
        <li><Link to="/react-immutable-treeview/">basic example</Link></li>
        <li><Link to="/react-immutable-treeview/insert_remove">insert and reomve example</Link></li>
      </ul>
      <hr />
      <Route exact path="/react-immutable-treeview/" component={BasicExample} />
      <Route path="/react-immutable-treeview/insert_remove" component={InsertAndReomve} />
    </div>
  </Router>
)
const content = document.getElementById("content");
ReactDOM.render(<App />, content);
