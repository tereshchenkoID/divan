import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { convertFixed } from 'helpers/convertFixed'

import Label from 'components/Label'
import Number from '../Number'

import style from './index.module.scss'

const findOutcomes = (data, outcomes) => {
  const r = data.join(',').toString()
  const f = outcomes.find(a => {
    return a.a === r
  })

  return f ? convertFixed(f.b) : '1.00'
}

const overUnder = (value, outcome) => {
  return outcome[value > 3.5 ? 0 : 1]
}

const oddEven = (value, outcome) => {
  return outcome[value % 2 === 0 ? 0 : 1]
}

const Results = ({ data }) => {
  const { t } = useTranslation()

  if (!data.race.results) return false

  return (
    <div className={style.block}>
      <div>
        <Label text={t('interface.results')} />
        <div className={style.table}>
          {data.race.results.map((el, idx) => (
            <div key={idx} className={style.row}>
              <div className={style.cell}>{idx + 1}</div>
              <div className={classNames(style.cell, style.left)}>
                <Number key={idx} color={el - 1} data={el} />
                {data.race.participants[el - 1].b}
              </div>
              <div className={style.cell}>
                {idx === 0
                  ? data.race.odds.markets[0].outcomes[el - 1]
                    ? data.race.odds.markets[0].outcomes[el - 1].b
                    : '1.00'
                  : 'x'}
              </div>
              <div className={style.cell}>
                {idx === 0 || idx === 1
                  ? data.race.odds.markets[1].outcomes[el - 1]
                    ? convertFixed(data.race.odds.markets[1].outcomes[el - 1].b)
                    : '1.00'
                  : 'x'}
              </div>
              <div className={style.cell}>
                {idx === 0 || idx === 1 || idx === 2
                  ? data.race.odds.markets[2].outcomes[el - 1]
                    ? convertFixed(data.race.odds.markets[2].outcomes[el - 1].b)
                    : '1.00'
                  : 'x'}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label text={data.race.odds.markets[6].printname} />
        <div className={style.table}>
          <div className={classNames(style.row, style.alt)}>
            <div className={style.cell}>
              {data.race.results.slice(0, 2).map((el, idx) => (
                <Number key={idx} color={el - 1} data={el} />
              ))}
            </div>
            <div className={style.cell}>{findOutcomes(data.race.results.slice(0, 2), data.race.odds.markets[6].outcomes)}</div>
          </div>
        </div>

        <Label text={data.race.odds.markets[3].printname} />
        <div className={style.table}>
          <div className={classNames(style.row, style.alt)}>
            <div className={style.cell}>
              {data.race.results.slice(0, 2).map((el, idx) => (
                <Number key={idx} color={el - 1} data={el} />
              ))}
            </div>
            <div className={style.cell}>{findOutcomes(data.race.results.slice(0, 2), data.race.odds.markets[3].outcomes)}</div>
          </div>
        </div>

        <Label text={data.race.odds.markets[7].printname} />
        <div className={style.table}>
          <div className={classNames(style.row, style.alt)}>
            <div className={style.cell}>
              {data.race.results.map((el, idx) => (
                <Number key={idx} color={el - 1} data={el} />
              ))}
            </div>
            <div className={style.cell}>{findOutcomes(data.race.results, data.race.odds.markets[7].outcomes)}</div>
          </div>
        </div>

        <Label text={data.race.odds.markets[4].printname} />
        <div className={style.table}>
          <div className={classNames(style.row, style.alt)}>
            <div className={style.cell}>{overUnder(data.race.results[0], data.race.odds.markets[4].outcomes).a}</div>
            <div className={style.cell}>
              {convertFixed(overUnder(data.race.results[0], data.race.odds.markets[4].outcomes).b)}
            </div>
          </div>
        </div>

        <Label text={data.race.odds.markets[5].printname} />
        <div className={style.table}>
          <div className={classNames(style.row, style.alt)}>
            <div className={style.cell}>{oddEven(data.race.results[0], data.race.odds.markets[5].outcomes).a}</div>
            <div className={style.cell}>{convertFixed(oddEven(data.race.results[0], data.race.odds.markets[5].outcomes).b)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Results
