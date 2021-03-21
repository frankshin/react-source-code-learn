export const routers = [
  {
    path: '/syntax/deepclone',
    title: 'deepclone',
    component: () => import('@/pages/deep-clone'),
  },
  {
    path: '/syntax/flex',
    title: 'flex test',
    component: () => import('@/pages/flex'),
  },
]
