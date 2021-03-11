export const routers = [
  {
    path: '/pages/set-state',
    title: 'setState',
    component: () => import('@/pages/set-state/index')
  },
  {
    path: '/pages/child-component-render-class',
    title: 'child-component-render-class',
    component: () => import('@/pages/child-component-render-class')
  },
  {
    path: '/pages/child-component-render-hooks',
    title: 'child-component-render-hooks',
    component: () => import('@/pages/child-component-render-hooks')
  },
  // {
  //   path: '/',
  //   title: 'pureComponent',
  // }
]
