import React from 'react';
import 'antd/dist/antd.css';
import './base-layout.css';
import { Layout, Menu } from 'antd';
import { MenuList } from '../drawer-menu-list';
import { useNavigate } from "react-router-dom";

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

export const BaseMainComponent = (
  props: { children: JSX.Element | React.ReactNode }
) => {

  const navigate = useNavigate();
  function onClickChangeChildren(page: any) {
    navigate(page);
  }

  return (
    <Layout className='first-layout'>
      <Sider trigger={null}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[MenuList[0].label]}>
          {
            MenuList.map((value) => {
              if (value.hasSubs && value.subs && value.subs.length > 0) {
                let submenu = value.subs.map((sub) => (
                  <Menu.Item
                    key={`${value.path}${sub.path}`}
                    onClick={() => onClickChangeChildren(`${value.path}${sub.path}`)}
                  >
                    {sub.label}
                  </Menu.Item>
                ))
                return (
                  <SubMenu key={value.label} title={value.label}>
                    {submenu}
                  </SubMenu>
                )
              }
              else {
                return (
                  <Menu.Item
                    key={value.path}
                    onClick={() => onClickChangeChildren(value.path)}
                  >
                    {value.label}
                  </Menu.Item>
                )
              }
            })
          }
        </Menu>
      </Sider>
      <Layout className="second-layout">
        <Content className="content">
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
}