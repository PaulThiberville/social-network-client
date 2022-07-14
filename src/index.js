import React from "react";
import ReactDOM from "react-dom/client";
import configureAppStore from "./redux/configureStore";
import { Provider } from "react-redux";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Profile from "./pages/Profile";
import FullPost from "./pages/FullPost";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");
ReactModal.defaultStyles.overlay.backgroundColor = "cornsilk";

const store = configureAppStore();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="fullpost/:id" element={<FullPost />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
