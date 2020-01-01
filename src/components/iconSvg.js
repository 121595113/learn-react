import React from 'react'
export default function IconSvg(props) {
  const { name, className, ...others } = props
  return (
    <svg aria-hidden="true" className={`icon-svg ${className || ''}`} {...others}>
      <use xlinkHref={`#sprite-${name}`}></use>
    </svg>
  )
}
