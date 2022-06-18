import { Layout } from "antd";
import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import SideMenu from "../../components/sandbox/SideMenu";
import TopHeader from "../../components/sandbox/TopHeader";
import Books from "../../views/sandbox/books/Books";
import "./BooksSandBox.css";
import MyReviews from "./my-reviews/MyReviews";
const { Content } = Layout;
export default function NewsSandBox() {
  return (
    // <div>NewsSandBox</div>
    <Layout>
      <SideMenu></SideMenu>
      <Layout className="site-layout">
        <TopHeader></TopHeader>
        <Content
          className="site-layout-background"
          style={{ margin: "24px 16px 24px", overflow: "initial" }}>
          {/* <NewsRouter></NewsRouter> */}
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}>
            {/* Content */}
            <Routes>
              <Route path="/" element={<Books />} />
              <Route path="/books" element={<Books />} />
              <Route path="/my" element={<MyReviews />} />
              <Route
                path="*"
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>There's nothing here!</p>
                  </main>
                }
              />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
