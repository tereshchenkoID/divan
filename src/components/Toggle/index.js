import React from 'react'

import classNames from 'classnames'

import style from './index.module.scss'

const Toggle = ({ data, action }) => {
  return (
    <label className={classNames(style.block)}>
      <input 
        type="checkbox"
        className={style.input} 
        onChange={action} 
        checked={data === '1'} 
      />
      <span className={style.label} />
    </label>
  )
}

export default Toggle
