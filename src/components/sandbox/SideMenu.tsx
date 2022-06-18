import React from "react";
import { Layout, Menu } from "antd";
import './index.css'
import { useNavigate } from "react-router-dom";
const { Sider } = Layout;

// const menuList = [
//   key:"/books",
//   title:"All Books",
//   icon:"",
// ]


// const { SubMenu } = Menu;
export default function SideMenu(props: any) {
  let navigate = useNavigate();
  const renderMenu = () => {
    const items = [{ label: "All Reviews",  key: "/books" }];
    items.push({ label: "My Reviews", key: "/my" });
    items.push({ label: "New Review", key: "/new" });
    return (
      <Menu theme="dark" mode="inline" className='123' defaultSelectedKeys={['1']} onClick={(menuinfo)=>{
        navigate(menuinfo.key);
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
