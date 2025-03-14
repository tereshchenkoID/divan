import React from 'react'

import classNames from 'classnames'

import { horseColor } from 'constant/config'

import style from './index.module.scss'

const Number = ({ color, data, size = 'md' }) => {
  return <span className={classNames(style.block, style[size], style[`horse-${horseColor[color]}`])}>{data}</span>
}

export default Number
