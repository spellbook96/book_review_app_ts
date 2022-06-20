import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu } from "antd";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import store from "../../redux/store";
const { Header, Sider, Content } = Layout;
export default function TopHeader() {
  const  navigate = useNavigate();
  // console.log("init TopHeader");
  const [collapsed, setCollapsed] = useState(false);
  const [isLogin, setIsLogin] = useState(localStorage.getItem("token") ? true : false);
  const [userName, setUserName] = useState(localStorage.getItem("token") ? localStorage.getItem("userName") : "");
  const menu = (
    <Menu
      items={[
        { label: "Profile", key: "1", onClick: () => navigate("/profile") },
        {
          label: "Logout",
          key: "2",
          danger: true,
          onClick: () => {
            console.log("logout");
            localStorage.clear();
            store.dispatch({type:'SET_LOGIN',isLogin:false});
          },
        },
      ]}></Menu>
  );
  // useEffect(() => {
  //   if (localStorage.getItem("token") === null) {
  //     navigate("/");
  //     setIsLogin(false);
  //   }else{
  //     setIsLogin(true);
  //   }
  // }, [localStorage.getItem("token")]);
  store.subscribe(() => {
    console.log("通知中");
    if (store.getState().LoginReducer.isLogin) {
      setIsLogin(true);
    } else{
      setIsLogin(false);
    }
    setUserName(store.getState().LoginReducer.userName);
  });
  return (
    // console.log("render TopHeader"),
    <Header className="site-layout-background" style={{ padding: "0 20px" }}>
      {collapsed ? (
        <MenuUnfoldOutlined
          className="trigger"
          onClick={() => setCollapsed(!collapsed)}
        />
      ) : (
        <MenuFoldOutlined
          className="trigger"
          onClick={() => setCollapsed(!collapsed)}
        />
      )}
      <div style={{ float: "right" }}>
        {isLogin || localStorage.getItem('token') ? (
          <div>
            <span>{userName} </span>
            <Dropdown overlay={menu}>
              <Avatar size={48} icon={<UserOutlined />} />
            </Dropdown>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <span> | </span>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </div>
    </Header>
  );
}
