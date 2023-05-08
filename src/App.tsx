import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PageAbsensiComponent } from "./absensi/absensi-list/page-absensi.component";
import { PageCreateAbsensi } from "./absensi/absensi-page/page-create-absensi.component";
import { PageUpdateAbsensi } from "./absensi/absensi-update/page-update-absensi.component";
import { BaseMainComponent } from "./base/base-main.component";
import { PageHomeComponent } from "./base/page-home.component";
import { PageCreateComponent } from "./karyawan/create-page/page-create.component";
import { PageAuditComponent } from "./karyawan/list-page/page-audit.component";
import { PageUpdateComponent } from "./karyawan/update-page/page-update.component";

import { PageNotFoundComponent } from "./not-found/page-not-found.component";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <BaseMainComponent>
              <PageHomeComponent />
            </BaseMainComponent>
          }
        />

        <Route
          path="/absensi"
          element={
            <BaseMainComponent>
              <PageCreateAbsensi />
            </BaseMainComponent>
          }
        />

        <Route
          path="/absensi/data"
          element={
            <BaseMainComponent>
              <PageAbsensiComponent />
            </BaseMainComponent>
          }
        />

        <Route
          path="/absensi/data/update/:id"
          element={
            <BaseMainComponent>
              <PageUpdateAbsensi />
            </BaseMainComponent>
          }
        />

        <Route
          path="/karyawan/data"
          element={
            <BaseMainComponent>
              <PageAuditComponent />
            </BaseMainComponent>
          }
        />

        <Route
          path="/karyawan/create"
          element={
            <BaseMainComponent>
              <PageCreateComponent />
            </BaseMainComponent>
          }
        />

        <Route
          path="/karyawan/data/update/:id"
          element={
            <BaseMainComponent>
              <PageUpdateComponent />
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
