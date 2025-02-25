import React from 'react'

import classNames from 'classnames'

import style from './index.module.scss'

const Odd = ({ type, number }) => {
  return <div className={classNames(style.block, style[type])}>{number}</div>
}

export default Odd
