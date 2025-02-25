import React from 'react'

import classNames from 'classnames'

import Icon from 'components/Icon'

import style from './index.module.scss'

const Forecast = ({ data }) => {
  return (
    <div className={style.block}>
      <div className={style.table}>
        <div className={style.row}>
          <div className={style.cell}>#</div>
          <div className={style.cell}>1</div>
          <div className={style.cell}>X</div>
          <div className={style.cell}>2</div>
          <div className={style.cell}>B 1</div>
          <div className={style.cell}>B 2</div>
        </div>
        {data.data.map((el, idx) => (
          <div key={idx} className={style.row}>
            <div className={style.cell}>{el.pos}</div>
            {el.outcomes.map((el_o, idx_o) => (
              <div key={idx_o} className={style.cell}>
                {el_o.s && el_o.c}
              </div>
            ))}
            <div className={style.cell}>
              {el.b_1 && (
                <div className={style.icon}>
                  <Icon id={'check'} />
                </div>
              )}
            </div>
            <div className={style.cell}>
              {el.b_2 && (
                <div className={style.icon}>
                  <Icon id={'check'} />
                </div>
              )}
            </div>
          </div>
        ))}
        <div className={classNames(style.row, style.alt)}>
          <div className={style.cell}>#{data.id}</div>
          <div className={style.cell}>{data.stake}</div>
        </div>
      </div>
    </div>
  )
}

export default Forecast
