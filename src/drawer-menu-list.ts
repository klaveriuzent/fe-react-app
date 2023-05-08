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
]