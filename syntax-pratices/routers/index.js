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
  {
    path: '/syntax/px-rpx-em-rem',
    title: 'px-rpx-em-rem test',
    component: () => import('@/pages/px-rpx-em-rem'),
  },
]
