import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import Label from 'components/Label'
import Number from '../Number'

import style from './index.module.scss'

const Main = ({ data }) => {
  const { t } = useTranslation()

  return (
    <>
      <div className={style.row}>
        <Label text={t('interface.name')} />
        <Label text={t('interface.last_5')} />
        <Label text={data.race.odds.markets[0].printname} />
        <Label text={data.race.odds.markets[1].printname} />
        <Label text={data.race.odds.markets[2].printname} />
      </div>
      <div className={classNames(style.row, style.alt)}>
        <div className={style.column}>
          {data.race.participants.map((el, idx) => (
            <div key={idx} className={style.cell}>
              <Number data={idx + 1} color={idx} />
              {el.b}
            </div>
          ))}
        </div>
        <div className={style.column}>
          {data.race.participants.map((el, idx) => (
            <div key={idx} className={classNames(style.cell, style.center)}>
              {el.c}
            </div>
          ))}
        </div>
        <div className={style.column}>
          {data.race.odds.markets[0].outcomes.map((el, idx) => (
            <div key={idx} className={classNames(style.cell, style.center)}>
              {el.b.toFixed(1)}
            </div>
          ))}
        </div>
        <div className={style.column}>
          {data.race.odds.markets[1].outcomes.map((el, idx) => (
            <div key={idx} className={classNames(style.cell, style.center)}>
              {el.b.toFixed(1)}
            </div>
          ))}
        </div>
        <div className={style.column}>
          {data.race.odds.markets[2].outcomes.map((el, idx) => (
            <div key={idx} className={classNames(style.cell, style.center)}>
              {el.b.toFixed(1)}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Main
