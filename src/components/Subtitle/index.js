import React from 'react'

import classNames from 'classnames'

import style from './index.module.scss'

const Subtitle = ({ data, size }) => {
  return <div className={classNames(style.block, style[size])}>{data}</div>
}

export default Subtitle
