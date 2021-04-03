import { useState } from 'react'

export default function SelfRouterPage () {
  const nowPath = window.location.pathname
  const [path, setPath] = useState(nowPath)
  const goDirect = (path) => {
    // window.location.pathname = path
    window.history.pushState(null, 'test', path)
    setPath(path)
  }

  const pageComponent = () => {
    switch (path) {
      case '/login':
        return <div>登录页</div>
      case '/home':
        return <div>home主页</div>
      default:
        return <div>默认页</div>
    }
  }

  return (
    <div>
      <div className="title">实现自写路由测试页</div>
      <div onClick={() => goDirect('/login')}>login</div>
      <div onClick={() => goDirect('/home')}>home</div>
      <div>{pageComponent()}</div>
    </div>
  )
}
