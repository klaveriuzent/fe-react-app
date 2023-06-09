import React, { useState, useMemo } from "react";
import "./nav-menu-vertical.component.css";
import { Layout, Menu } from "antd";
import { PoweroffOutlined, CaretLeftOutlined } from "@ant-design/icons";
import { MenuList } from "../../../drawer-menu-list";
import { useNavigate } from "react-router-dom";

const { Sider, Content } = Layout;

export const NavMenuVertical = ({
  children,
}: {
  children: JSX.Element | React.ReactNode;
}) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(MenuList[0].label);
  const [collapsed, setCollapsed] = useState(false);

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

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="first-layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="title-app">Title APP</div>
        <Menu
          theme="dark"
          mode="vertical"
          selectedKeys={[current]}
          items={items}
        />
      </Sider>
      <div className="toggle-collapsed" onClick={toggleCollapsed}>
          <CaretLeftOutlined />
        </div>
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
