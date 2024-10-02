import { Fragment, useState } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'

import Icon from 'components/Icon'
import Subtitle from 'components/Subtitle'
import Odd from 'pages/Home/games/FOOTBALL_LEAGUE/Table/Odd'

const Market = ({ id, active, match, group }) => {
  const [toggle, setToggle] = useState(false)

  return (
    <div className={classNames(style.block, toggle && style.active)}>
      <button type={'button'} className={style.header} onClick={() => setToggle(!toggle)}>
        <span>{group.name}</span>
        <span className={style.close}>
          <Icon id={'plus'} />
        </span>
      </button>
      {toggle && (
        <div className={style.wrapper}>
          {id !== 7 ? (
            group.markets.map((el, idx) => (
              <div key={idx}>
                <Subtitle data={el.name.replaceAll('_', ' ')} size={'sm'} />
                <div className={style.body}>
                  {el.outcomes.map((el_o, idx_o) => (
                    <div key={idx_o} className={style.outcome}>
                      <div className={style.label}>{el.headers[idx_o]}</div>
                      <div className={style.odd}>
                        <Odd
                          data={{
                            ...el_o,
                            ...match.teams,
                            pos: match.pos,
                            market: el.name,
                            // c: el_o.a,
                            // o_old: el.a,
                            sid: active.id,
                            mid: active.id,
                            start: active.start,
                            type: active.type,
                            m_old: group.markets[0].name,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div>
              <Subtitle data={group.markets[0].name.replaceAll('_', ' ')} size={'sm'} />
              {group.markets.map((el, idx) => (
                <Fragment key={idx}>
                  <div className={style.label}>{el.headers[0]}</div>
                  <div className={style.body}>
                    {el.outcomes.map((el_o, idx_o) => (
                      <div key={idx_o} className={style.outcome}>
                        <div className={style.label}>{el_o.a}</div>
                        <div className={style.odd}>
                          <Odd
                            data={{
                              ...el_o,
                              ...match.teams,
                              pos: match.pos,
                              market: el.name,
                              c: el_o.a,
                              sid: active.id,
                              mid: active.id,
                              start: active.start,
                              type: active.type,
                              m_old: group.markets[0].name,
                              o_old: el.a,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Fragment>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Market
