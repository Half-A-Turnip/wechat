const Wechat = (resolve) => {
  import('@/components/admin/wechat').then((module) => {
    resolve(module)
  })
}
const admin = [
  {
    path: '/admin',
    redirect: '/admin/wechat'
  },
  {
    path: '/user/wechat',
    component: Wechat,
    name: 'wechat',
    meta: { title: '制作页面' }
  }
]
export default admin
