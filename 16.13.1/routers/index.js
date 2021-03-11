export const routers = [
  {
    path: '/pages/set-state',
    title: 'setState',
    component: () => import('@/pages/set-state/index')
  },
  {
    path: '/pages/pure-component',
    title: 'pureComponent',
    component: () => import('@/pages/pure-component/index')
  },
  // {
  //   path: '/',
  //   title: 'pureComponent',
  // }
]
