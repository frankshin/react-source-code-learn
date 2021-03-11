export const routers = [
  {
    path: '/pages/set-state',
    title: 'setState',
    component: () => import('@/pages/set-state/index')
  },
  {
    path: '/pages/child-component-render',
    title: 'pureComponent',
    component: () => import('@/pages/child-component-render/index')
  },
  // {
  //   path: '/',
  //   title: 'pureComponent',
  // }
]
