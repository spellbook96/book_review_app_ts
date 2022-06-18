import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,

} from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Layout, Menu } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
const { Header, Sider, Content } = Layout;
export default function TopHeader() {
  const [collapsed, setCollapsed] =useState(false)
  const menu = (
    <Menu items={[{label:'11111',key:'1'},{label:'Logout',key:'2',danger:true}]}></Menu>
  )
  return (
    <Header className="site-layout-background" style={{ padding: '0 20px'}}>
    {
      collapsed ? <MenuUnfoldOutlined className="trigger" onClick={() => setCollapsed(!collapsed)} /> : <MenuFoldOutlined className="trigger" onClick={() => setCollapsed(!collapsed)} />
    }
    <div style={{float:"right"}}>
      <span>userID</span>
      <Dropdown overlay={menu}>
      <Avatar size={48} icon={<UserOutlined />} />
      </Dropdown>
    </div>
  </Header>
  )
}
