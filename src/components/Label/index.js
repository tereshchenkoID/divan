import React from 'react'

import classNames from 'classnames'

import style from './index.module.scss'

const Label = ({ text, size = 'md' }) => {
  return <div className={classNames(style.block, style[size])}>{text}</div>
}

export default Label
