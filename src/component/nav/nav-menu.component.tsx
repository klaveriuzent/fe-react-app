import React, { useState } from "react";
import "./nav-menu.component.css";
import { Layout, Menu, Button } from "antd";
import { PoweroffOutlined, RightOutlined } from "@ant-design/icons";
import { MenuList } from "../../drawer-menu-list";
import { useNavigate } from "react-router-dom";

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

export const BaseMainComponent = ({
  children,
}: {
  children: JSX.Element | React.ReactNode;
}) => {
  const navigate = useNavigate();
  const [showAllMenu, setShowAllMenu] = useState(false);

  function onClickChangeChildren(page: any) {
    navigate(page);
  }

  function toggleShowAllMenu() {
    setShowAllMenu(!showAllMenu);
  }

  const menuLength = MenuList.length;

  return (
    <Layout className="first-layout">
      <Sider trigger={null}>
        <div className="title-app">Title APP</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[MenuList[0].label]}
        >
          {showAllMenu &&
            MenuList.slice(10).map((value) => {
              if (value.hasSubs && value.subs && value.subs.length > 0) {
                return (
                  <SubMenu key={value.label} title={value.label}>
                    {value.subs.map((sub) => (
                      <Menu.Item
                        key={`${value.path}${sub.path}`}
                        onClick={() =>
                          onClickChangeChildren(`${value.path}${sub.path}`)
                        }
                      >
                        {sub.label}
                      </Menu.Item>
                    ))}
                  </SubMenu>
                );
              } else {
                return (
                  <Menu.Item
                    key={value.path}
                    onClick={() => onClickChangeChildren(value.path)}
                  >
                    {value.label}
                  </Menu.Item>
                );
              }
            })}
          {!showAllMenu &&
            MenuList.slice(0, 10).map((value) => {
              if (value.hasSubs && value.subs && value.subs.length > 0) {
                return (
                  <SubMenu key={value.label} title={value.label}>
                    {value.subs.map((sub) => (
                      <Menu.Item
                        key={`${value.path}${sub.path}`}
                        onClick={() =>
                          onClickChangeChildren(`${value.path}${sub.path}`)
                        }
                      >
                        {sub.label}
                      </Menu.Item>
                    ))}
                  </SubMenu>
                );
              } else {
                return (
                  <Menu.Item
                    key={value.path}
                    onClick={() => onClickChangeChildren(value.path)}
                  >
                    {value.label}
                  </Menu.Item>
                );
              }
            })}
        </Menu>
        {menuLength > 10 && (
          <div className="menu-support">
            <div className="menu-info">
              Menu
              <br />
              Lainnya disini
            </div>
            <Button
              style={{ color: "#1677FF" }}
              icon={<RightOutlined />}
              onClick={toggleShowAllMenu}
            />
          </div>
        )}
      </Sider>
      <Layout className="second-layout">
        <div className="second-header">
          <div className="server-title">Server : 123.123.123.123</div>
          <div className="logout">
            <PoweroffOutlined className="logout-icon" /> Logout
          </div>
        </div>
        <Content className="content">{children}</Content>
      </Layout>
    </Layout>
  );
};