export default [
  {
    path: '/pages/css/flex',
    title: 'flex test',
    component: () => import('@/pages/css/flex'),
  },
  {
    path: '/pages/css/px-rpx-em-rem',
    title: 'px-rpx-em-rem test',
    component: () => import('@/pages/css/px-rpx-em-rem'),
  },
  {
    path: '/pages/css/half-px',
    title: 'half px test',
    component: () => import('@/pages/css/half-px'),
  },
  {
    path: '/pages/css/rectangle',
    title: 'css绘制矩形',
    component: () => import('@/pages/css/rectangle'),
  },
]
