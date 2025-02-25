import React from 'react'

import classNames from 'classnames'

import Number from '../Number'

import style from './index.module.scss'

const Odd = ({ data, view, text }) => {
  return (
    <div className={classNames(style.block, style[view], (!data.b || data.b === 1.0) && style.disabled)}>
      {view && (
        <span className={style.numbers}>
          {data.a.split(',').map((el, idx) => (
            <Number key={idx} color={el - 1} data={el} />
          ))}
        </span>
      )}
      {text && <span className={style.market}>{text}</span>}
      <span>{data.b.toFixed(2)}</span>
    </div>
  )
}

export default Odd
