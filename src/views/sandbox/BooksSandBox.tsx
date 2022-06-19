import { Layout } from "antd";
import React from "react";
import { Routes, Route, useParams, Outlet } from "react-router-dom";
import SideMenu from "../../components/sandbox/SideMenu";
import TopHeader from "../../components/sandbox/TopHeader";
import "./BooksSandBox.css";

const { Content } = Layout;
export default function NewsSandBox() {
  return (
    console.log("render BooksSandBox"),
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
            <Outlet></Outlet>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}