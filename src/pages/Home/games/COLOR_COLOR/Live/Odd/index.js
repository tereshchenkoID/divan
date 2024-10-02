import classNames from 'classnames'

import style from './index.module.scss'

const Odd = ({ data, color, size }) => {
  return <span className={classNames(style.block, style[color], size && style[size])}>{data}</span>
}

export default Odd
