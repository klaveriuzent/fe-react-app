import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NavMenuVertical } from "./component/nav/nav-menu-vertical/nav-menu-vertical.component";
import { PageDashboardComponent } from "./page/dashboard/page-dashboard.component";

import { PageNotFoundComponent } from "./page/not-found/page-not-found.component";
import { PageMenu1Component } from "./page/menu1/page-menu-1.component";
import { PageMenu2Child1Component } from "./page/menu2/child1/page-menu-2-child-1.component";
import { PageMenu2Child2Component } from "./page/menu2/child2/page-menu-2-child-2.component";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <NavMenuVertical>
              <PageDashboardComponent />
            </NavMenuVertical>
          }
        />

        <Route
          path="/menu1"
          element={
            <NavMenuVertical>
              <PageMenu1Component />
            </NavMenuVertical>
          }
        />

        <Route
          path="/menu2/child1"
          element={
            <NavMenuVertical>
              <PageMenu2Child1Component />
            </NavMenuVertical>
          }
        />

        <Route
          path="/menu2/child2"
          element={
            <NavMenuVertical>
              <PageMenu2Child2Component />
            </NavMenuVertical>
          }
        />

        <Route path="/404" element={<PageNotFoundComponent />} />

        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
