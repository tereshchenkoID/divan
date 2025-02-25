import React from 'react'

import classNames from 'classnames'

import style from './index.module.scss'

const Alert = ({ text, type }) => {
  return <div className={classNames(style.block, style[type])}>{text}</div>
}

export default Alert
