import React from 'react'

import classNames from 'classnames'

import Icon from 'components/Icon'

import style from './index.module.scss'

const Checkbox = ({ data = false, action = () => {} }) => {
  return (
    <label className={classNames(style.block)}>
      <input className={style.input} type="checkbox" onChange={action} checked={data} />
      <span className={style.label}>
        <Icon id={'check'} />
      </span>
    </label>
  )
}

export default Checkbox
