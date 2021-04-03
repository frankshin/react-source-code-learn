/**
 * 用css实现一个长宽比固定的矩形
*/
import React from 'react'
import './index.css'

export default function Rectangle () {
  return (
    <div>
      <div>css实现一个长宽比固定的矩形：</div>
      <div className="scale">
        <div class="item">
          这里是所有子元素的容器
        </div>
      </div>
    </div>
  )
}
