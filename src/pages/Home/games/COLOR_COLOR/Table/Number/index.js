import React from 'react'

import classNames from 'classnames'

import style from './index.module.scss'

const Number = ({ data, color, size }) => {
  return <span className={classNames(style.block, style[color], size && style[size])}>{!size && (data.a || data.id)}</span>
}

export default Number
