import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BaseMainComponent } from "./component/nav/nav-menu.component";
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
            <BaseMainComponent>
              <PageDashboardComponent />
            </BaseMainComponent>
          }
        />

        <Route
          path="/menu1"
          element={
            <BaseMainComponent>
              <PageMenu1Component />
            </BaseMainComponent>
          }
        />

        <Route
          path="/menu2/child1"
          element={
            <BaseMainComponent>
              <PageMenu2Child1Component />
            </BaseMainComponent>
          }
        />

        <Route
          path="/menu2/child2"
          element={
            <BaseMainComponent>
              <PageMenu2Child2Component />
            </BaseMainComponent>
          }
        />

        <Route path="/404" element={<PageNotFoundComponent />} />

        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
