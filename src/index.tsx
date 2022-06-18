import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "./index.css";
import "antd/dist/antd.min.css";
import { Provider } from "react-redux";
import store from "./redux/store";
const root = document.getElementById("root");
const reactroot = ReactDOM.createRoot(root!);
reactroot.render(
  // <Provider store={store}>
    <App />
  // {/* </Provider> */}
);
