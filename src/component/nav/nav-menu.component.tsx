import React, { useState, useMemo } from "react";
import "./nav-menu.component.css";
import { Layout, Menu } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import { MenuList } from "./../../drawer-menu-list";
import { useNavigate } from "react-router-dom";

const { Sider, Content } = Layout;

export const BaseMainComponent = ({
  children,
}: {
  children: JSX.Element | React.ReactNode;
}) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(MenuList[0].label);

  function onClickChangeChildren(key: string) {
    setCurrent(key);
    navigate(key);
  }

  const renderSubMenu = (menu: any, parentPath = "") => {
    const path = parentPath + menu.path;
    if (menu.hasSubs && menu.subs && menu.subs.length > 0) {
      return {
        label: menu.label,
        key: path,
        children: menu.subs.flatMap((sub) => renderSubMenu(sub, path)),
      };
    } else {
      return {
        label: menu.label,
        key: path,
        onClick: () => onClickChangeChildren(path),
      };
    }
  };

  const items = useMemo(() => {
    return MenuList.map((menu) => {
      if (menu.hasSubs && menu.subs && menu.subs.length > 0) {
        return {
          label: menu.label,
          key: menu.path,
          children: menu.subs.flatMap((sub) => renderSubMenu(sub, menu.path)),
        };
      } else {
        return {
          label: menu.label,
          key: menu.path,
          onClick: () => onClickChangeChildren(menu.path),
        };
      }
    });
    // eslint-disable-next-line
  }, [MenuList, onClickChangeChildren, renderSubMenu]);

  return (
    <Layout className="first-layout">
      <Sider trigger={null}>
        <div className="title-app">Title APP</div>
        <Menu
          theme="dark"
          mode="vertical"
          selectedKeys={[current]}
          items={items}
        />
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