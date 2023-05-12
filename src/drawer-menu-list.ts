import { PageDashboardComponent } from './page/dashboard/page-dashboard.component';
import { PageMenu1Component } from './page/menu1/page-menu-1.component';
import { PageMenu2Child1Component } from './page/menu2/child1/page-menu-2-child-1.component';
import { PageMenu2Child2Component } from './page/menu2/child2/page-menu-2-child-2.component';


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
    label: 'Dashboard',
    page: PageDashboardComponent
  },
  {
    path: '/menu1',
    label: 'Menu 1',
    page: PageMenu1Component
  },
  {
    path: '/menu2',
    label: 'Menu 2',
    hasSubs: true,
    subs: [
      {
        path: '/child1',
        label: 'Child 1',
        page: PageMenu2Child1Component
      },
      {
        path: '/child2',
        label: 'Child 2',
        page: PageMenu2Child2Component
      },
    ]
  },
  {
    path: '/menu3',
    label: 'Menu 3',
    page: PageMenu1Component
  },
  {
    path: '/menu4',
    label: 'Menu 4',
    page: PageMenu1Component
  },
  {
    path: '/menu5',
    label: 'Menu 5',
    page: PageMenu1Component
  },
  {
    path: '/menu6',
    label: 'Menu 6',
    page: PageMenu1Component
  },
  {
    path: '/menu7',
    label: 'Menu 7',
    page: PageMenu1Component
  },
  {
    path: '/menu8',
    label: 'Menu 8',
    page: PageMenu1Component
  },
  {
    path: '/menu9',
    label: 'Menu 9',
    hasSubs: true,
    subs: [
      {
        path: '/child1',
        label: 'Child 1',
        page: PageMenu2Child1Component
      },
      {
        path: '/child2',
        label: 'Child 2',
        page: PageMenu2Child2Component
      },
      {
        path: '/child1',
        label: 'Child 1',
        page: PageMenu2Child1Component
      },
      {
        path: '/child2',
        label: 'Child 2',
        page: PageMenu2Child2Component
      },
    ]
  },
  {
    path: '/menu10',
    label: 'Menu 10',
    page: PageMenu1Component
  },
  {
    path: '/menu11',
    label: 'Menu 11',
    page: PageMenu1Component
  },
  {
    path: '/menu12',
    label: 'Menu 12',
    page: PageMenu1Component
  },
  {
    path: '/menu13',
    label: 'Menu 13',
    page: PageMenu1Component
  },
  {
    path: '/menu14',
    label: 'Menu 14',
    page: PageMenu1Component
  },
  {
    path: '/menu15',
    label: 'Menu 15',
    page: PageMenu1Component
  },
  {
    path: '/menu16',
    label: 'Menu 16',
    page: PageMenu1Component
  },
  {
    path: '/menu17',
    label: 'Menu 17',
    page: PageMenu1Component
  },
  {
    path: '/menu18',
    label: 'Menu 18',
    page: PageMenu1Component
  },
  {
    path: '/menu19',
    label: 'Menu 19',
    page: PageMenu1Component
  },
]