import React, { useState, useMemo } from "react";
import "./nav-menu-horizontal.component.css";
import { Layout, Menu } from "antd";
import { MenuList } from "./../../../drawer-menu-list";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

export const NavMenuHorizontal = ({
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
      <div className="header-base">
        <div className="left-component">
          <div className="title-app">Title APP</div>
        </div>
        <div className="right-components">
          <div className="right-component-1">
            <div>Server : 123.123.123.123</div>
          </div>
          <div className="right-component-2">
            <div className="logout-base">Logout</div>
          </div>
        </div>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[current]}
        items={items}
      />
      <Layout className="second-layout">
        <Content className="content">{children}</Content>
      </Layout>
    </Layout>
  );
};
