export default [
  {
    path: '/syntax/deepclone',
    title: 'deepclone',
    component: () => import('@/pages/deep-clone'),
  },
  {
    path: '/syntax/throttle',
    title: 'throttle test',
    component: () => import('@/pages/throttle'),
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
