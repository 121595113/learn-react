import React from 'react'
import './font-awesome-4.7.0/css/font-awesome.min.css'

export default function Icon(props) {
  const { name, className, ...others } = props
  return <i className={`fa fa-${name} ${className || ''}`} {...others} aria-hidden="true"></i>
}
