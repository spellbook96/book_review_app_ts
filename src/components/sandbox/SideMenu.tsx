import React from "react";
import { Layout, Menu } from "antd";
import './index.css'
const { Sider } = Layout;

// const menuList = [
//   key:"/books",
//   title:"All Books",
//   icon:"",
// ]


// const { SubMenu } = Menu;
export default function SideMenu(props: any) {
  const renderMenu = () => {
    const items = [{ label: "All Reviews", path: "/books", key: "all" }];
    items.push({ label: "My Reviews", path: "/my", key: "my" });
    items.push({ label: "New Review", path: "/new", key: "new" });
    return (
      <Menu theme="dark" mode="inline" className="aaaaaaa" defaultSelectedKeys={['1']} onClick={()=>{
        console.log(props)
        console.log(props.history)
      }} items={items} />
    );
  };
  return (
    <Sider trigger={null} collapsible collapsed={props.isCollapsed}>
      <div style={{ display: "flex", height: "100%", flexDirection: "column" }}>
        <div className="logo"><p style={{height :"50px",fontSize:18,color:"white"}}>Book_Reviews_App LOGO</p></div>
        <div style={{ flex: 1, overflow: "auto" }}>{renderMenu()}</div>
      </div>
    </Sider>
  );
}
