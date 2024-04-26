import classNames from 'classnames'

import style from './index.module.scss'

const Toggle = ({ data = false, action = () => {} }) => {
  return (
    <label className={classNames(style.block)}>
      <input className={style.input} type="checkbox" onChange={action} />
      <span className={style.label} />
    </label>
  )
}

export default Toggle
