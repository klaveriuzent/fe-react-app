import React from "react";
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
  function onClickChangeChildren(page: any) {
    navigate(page);
  }

  return (
    <Layout className="first-layout">
      <Sider trigger={null}>
        <div className="title-app">Title APP</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[MenuList[0].label]}
        >
          {MenuList.map((value) => {
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
        <div className="menu-support">
          <div className="menu-info">Menu<br/>Lainnya disini</div>
          <Button style={{ color: '#1677FF' }} icon={<RightOutlined />}/>
        </div>
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
