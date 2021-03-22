import React from 'react'
import './index.css'

export default function pxRpxEmRem () {
  return (
    <div className="wrap">
      px:像素
      <div className="common" style={{ width: '10px' }} />
      rpx:小程序中的长度单位，和px的换算：设备宽度/设备物理像素
      <div className="common" style={{ width: '10rpx' }} />
      em: 相对父元素的font-size
      <div style={{ fontSize: '1em' }}>em</div>
      rem: css3中新增的相对单位，相对html根元素font-size
      <div style={{ fontSize: '1rem' }}>rem</div>
    </div>
  )
}
