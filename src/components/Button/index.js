import React from 'react'

import classNames from 'classnames'

import Icon from 'components/Icon'

import style from './index.module.scss'

const Button = ({ icon, text, action, initial, classes, loading = false, props = 'button' }) => {
  return (
    <button
      className={
        classNames(
          style.block,
          loading && style.loading,
          initial.map(el => el),
          classes.map(el => style[el]),
        )
      }
      onClick={() => {
        action && action()
      }}
      type={props}
      aria-label={icon}
    >
      {
        icon 
        ? 
          <Icon id={icon} /> 
        : 
          text
      }
      {
        loading && 
        <span className={style.loader}>
          <Icon id={'spinner'} />
        </span>
      }
    </button>
  )
}

export default Button
