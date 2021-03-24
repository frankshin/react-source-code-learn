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
  {
    path: '/syntax/throttle',
    title: 'throttle test',
    component: () => import('@/pages/throttle'),
  },
  {
    path: '/syntax/half-px',
    title: 'half px test',
    component: () => import('@/pages/half-px'),
  },
  {
    path: '/syntax/async',
    title: '异步执行先后测试',
    component: () => import('@/pages/async'),
  },
  {
    path: '/syntax/algorithm',
    title: '算法测试',
    component: () => import('@/pages/algorithm'),
  },
]
