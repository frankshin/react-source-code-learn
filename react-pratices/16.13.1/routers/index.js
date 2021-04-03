export const routers = [
  {
    path: '/pages/child-component-render-class',
    title: 'child-component-render-class',
    component: () => import('@/pages/child-component-render-class'),
  },
  {
    path: '/pages/child-component-render-hooks',
    title: 'child-component-render-hooks',
    component: () => import('@/pages/child-component-render-hooks'),
  },
  {
    path: '/pages/setState',
    title: 'setState',
    component: () => import('@/pages/setState/index'),
  },
  {
    path: '/pages/useState',
    title: 'useState test',
    component: () => import('@/pages/useState/'),
  },
  {
    path: '/',
    title: 'dashboard',
    component: () => import('@/pages/dashboard/'),
  },
]
