import classNames from 'classnames'

import style from './index.module.scss'

const Loader = ({ type = 'page', background = 'default' }) => {
  return (
    <div className={classNames(style.block, style[type], style[background])}>
      <div className={style.wrapper} />
    </div>
  )
}

export default Loader
