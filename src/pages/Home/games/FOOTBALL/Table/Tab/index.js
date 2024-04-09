import { useState } from 'react'

import classNames from 'classnames'

import style from './index.module.scss'

import Subtitle from '../Subtitle'
import Match from './Match'
import Markets from './Markets'

const Tab = ({ active }) => {
  const [group, setGroup] = useState(0)
  const [toggle, setToggle] = useState(null)

  return (
    <div className={style.block}>
      <div className={style.sort}>
        {active.league.matches[0].odds[0].groups[0].markets.map((el, idx) => (
          <button
            key={idx}
            className={classNames(style.market, group === idx && style.active)}
            onClick={() => {
              setGroup(idx)
            }}
          >
            {el.name.replaceAll('_', ' ')}
          </button>
        ))}
      </div>
      <div className={style.head}>
        <div className={style.legend}>
          <Subtitle data={active.league.matches[0].odds[0].groups[group].markets[0].name.replaceAll('_', ' ')} size={'sm'} />
        </div>
        <div className={style.columns}>
          {active.league.matches[0].odds[0].groups[group].markets[0].headers.map((el, idx) => (
            <div key={idx} className={style.label}>
              {el}
            </div>
          ))}
        </div>
      </div>
      <div className={style.wrapper}>
        {active.league.matches.map((el, idx) => (
          <div key={idx} className={style.row}>
            <Match id={idx} active={active} match={el} group={group} toggle={toggle} setToggle={setToggle} />
          </div>
        ))}
      </div>
      {toggle !== null && <Markets active={active} match={active.league.matches[toggle]} setToggle={setToggle} />}
    </div>
  )
}

export default Tab
