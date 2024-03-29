import classNames from 'classnames'

import Icon from 'components/Icon'

import style from './index.module.scss'

const Button = ({ type, size, icon, text, action, props = 'button' }) => {
  return (
    <button
      className={classNames(style.block, style[type], style[size])}
      onClick={() => {
        action && action()
      }}
      type={props}
      aria-label={icon}
    >
      {icon ? <Icon id={icon} /> : text}
    </button>
  )
}

export default Button
