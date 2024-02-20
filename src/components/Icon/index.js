import style from './index.module.scss'

import icon from './icon.svg'

const Icon = ({ id }) => {
  return (
    <svg className={style.block}>
      <use xlinkHref={`${icon}#${id}`} />
    </svg>
  )
}

export default Icon
