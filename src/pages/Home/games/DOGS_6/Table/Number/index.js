import classNames from 'classnames'

import { dogsColor } from 'constant/config'

import style from './index.module.scss'

const Number = ({ color, data, size = 'md' }) => {
  return <span className={classNames(style.block, style[size], style[dogsColor[color]])}>{data}</span>
}

export default Number
