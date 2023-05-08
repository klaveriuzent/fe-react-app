import React from 'react';
import { PageAbsensiComponent } from './absensi/absensi-list/page-absensi.component';
import { PageCreateAbsensi } from './absensi/absensi-page/page-create-absensi.component';
import { PageHomeComponent } from './base/page-home.component';
import { PageCreateComponent } from './karyawan/create-page/page-create.component';
import { PageAuditComponent } from './karyawan/list-page/page-audit.component';


interface Menu {
  path: string,
  label: string,
  page?: () => JSX.Element,
  hasSubs?: boolean,
  subs?: Array<Menu>,
}

export const MenuList: Array<Menu> = [
  {
    path: '/',
    label: 'Home',
    page: PageHomeComponent
  },
  {
    path: '/absensi',
    label: 'Absensi',
    hasSubs: true,
    subs: [
      {
        path: '/',
        label: 'Absensi',
        page: PageCreateAbsensi
      },
      {
        path: '/data',
        label: 'Data Absensi',
        page: PageAbsensiComponent
      }
    ]
    // page: PageAbsensiComponent

  },
  {
    path: '/karyawan',
    label: 'Karyawan',
    hasSubs: true,
    subs: [
      {
        path: '/data',
        label: 'Audit Data',
        page: PageAuditComponent
      },
      {
        path: '/create',
        label: 'Tambah Data',
        page: PageCreateComponent
      },
    ]
  },
]