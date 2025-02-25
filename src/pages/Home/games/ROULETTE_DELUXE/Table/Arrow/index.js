import React from 'react'

import classNames from 'classnames'

import Odd from '../Odd'

import style from './index.module.scss'

const Arrow = ({ 
  data, 
  buttonStepGet, 
  steps, 
  active,
  onMouseEnter,
  onMouseLeave
}) => {

  return (
    <div 
      className={style.block}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        type={'button'}
        aria-label={'high'}
        className={
          classNames(
            style.arrow,
            style[data.name],
            style[data.color]
          )
        }
      />
      <Odd
        data={data}
        step={buttonStepGet}
        steps={steps}
        active={active}
      />
    </div>
  )
}

export default Arrow
