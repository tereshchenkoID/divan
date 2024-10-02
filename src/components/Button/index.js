import classNames from 'classnames'

import Icon from 'components/Icon'

import style from './index.module.scss'

const Button = ({ icon, text, action, initial, classes, props = 'button' }) => {
  return (
    <button
      className={classNames(
        style.block,
        initial.map(el => el),
        classes.map(el => style[el]),
      )}
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
