import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { hostnames } from 'constant/config'

import classNames from 'classnames'

import Icon from 'components/Icon'
import Live from '../Live'
import Odd from './Odd'
import Subtitle from './Subtitle'

import style from './index.module.scss'

const filterColumn = data => {
  const result = [
    {
      data: [],
    },
  ]
  let count = 0

  data.map(el => {
    const a = el.a.split('-')
    const sum = parseInt(a[0], 10) + parseInt(a[1], 10)

    if (sum >= count) {
      result[result.length - 1].data.push(el)
      count = sum
    } else {
      result.push({
        data: [el],
      })
      count = 0
    }

    return true
  })

  return result
}

const Table = ({ active }) => {
  const { live } = useSelector(state => state.live)
  const [group, setGroup] = useState(0)
  const [toggle, setToggle] = useState({
    id: null,
    toggle: false,
  })

  const handleToggle = id => {
    if (id >= 0) {
      setToggle({
        id: id,
        toggle: id === toggle.id ? !toggle.toggle : true,
      })
    } else {
      setToggle({
        id: null,
        toggle: false,
      })
    }
  }

  useEffect(() => {
    if (live === 4) {
      setGroup(0)
      handleToggle(-1)
    }
  }, [live])

  useEffect(() => {
    return () => {
      setGroup(0)
      handleToggle(-1)
    }
  }, [active])

  return (
    <>
      {live === 1 ? (
        <>
          <div className={style.sort}>
            {active.league.matches[0].odds[0].groups.map(
              (el, idx) =>
                el.name !== 'Score' &&
                el.name !== 'Total Goals' && (
                  <button
                    key={idx}
                    className={classNames(style.market, group === idx && style.active)}
                    onClick={() => {
                      setGroup(idx)
                    }}
                  >
                    {el.name}
                  </button>
                ),
            )}
          </div>
          <div className={classNames(style.head, style.row)}>
            <div className={style.cell} />
            <div className={style.cell}>
              <div className={style.odds}>
                {Object.values(active.league.matches[0].odds[0].groups[group].markets).map((el, idx) => (
                  <div key={idx} className={style.column}>
                    {el.name && (
                      <div className={style.legend}>
                        <Subtitle data={el.name.replaceAll('_', ' ')} size={'sm'} />
                      </div>
                    )}
                    {el.headers.map((el, idx) => (
                      <div key={idx} className={style.label}>
                        {el}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={style.wrapper}>
            {active.league.matches.map((el_m, idx_m) => (
              <div key={idx_m} className={style.row}>
                <div className={style.cell}>
                  <div
                    className={classNames(
                      style.meta,
                      toggle.toggle && style.disabled,
                      toggle.id === idx_m && toggle.toggle && style.active,
                    )}
                    onClick={() => {
                      handleToggle(idx_m)
                    }}
                  >
                    <div>
                      <div className={style.logo}>
                        <img src={`${hostnames.ASSETS}/${el_m.teams.home.img}`} alt={el_m.teams.home.name} />
                      </div>
                    </div>
                    <div>{el_m.teams.home.name}</div>
                    <div>vs</div>
                    <div>{el_m.teams.away.name}</div>
                    <div>
                      <div className={style.logo}>
                        <img src={`${hostnames.ASSETS}/${el_m.teams.away.img}`} alt={el_m.teams.away.name} />
                      </div>
                    </div>
                    <div>
                      <button className={style.toggle} aria-label={'Toggle'}>
                        <Icon id={'arrow-right'} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className={style.cell}>
                  <div className={style.odds}>
                    {Object.values(el_m.odds[0].groups[group].markets).map((el_o, idx_o) => (
                      <div key={idx_o} className={style.column}>
                        {el_o.outcomes.map((el, idx) => (
                          <div key={idx} className={style.odd}>
                            <Odd
                              data={{
                                ...el,
                                ...el_m.teams,
                                pos: el_m.pos,
                                market: el_o.printname,
                                c: el.c,
                                sid: active.id,
                                mid: el_m.id,
                                start: active.start,
                                type: active.type,
                                m_old: el_o.name,
                                o_old: el.a,
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {toggle.id !== null && toggle.toggle && (
              <div className={classNames(style.dropdown, toggle.toggle && style.active)}>
                <div className={style.subtitle}>{active.league.matches[toggle.id].odds[0].groups[6].name}</div>
                <div className={style.goals}>
                  {active.league.matches[toggle.id].odds[0].groups[6].markets[0].outcomes.map((el, idx) => (
                    <div key={idx} className={style.outcome}>
                      <div className={style.button}>
                        <Odd
                          data={{
                            ...el,
                            ...active.league.matches[toggle.id].teams,
                            pos: active.league.matches[toggle.id].pos,
                            market: active.league.matches[toggle.id].odds[0].groups[6].markets[0].printname,
                            c: el.a,
                            sid: active.id,
                            mid: active.league.matches[toggle.id].id,
                            start: active.start,
                            type: active.type,
                            m_old: active.league.matches[toggle.id].odds[0].groups[6].markets[0].name,
                            o_old: el.a,
                          }}
                          label={el.a}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className={style.goals}>
                  {active.league.matches[toggle.id].odds[0].groups[7].markets.map((el, idx) => (
                    <div key={idx} className={style.outcomes}>
                      <div className={style.subtitle}>{el.headers[0]}</div>
                      <div className={style.list}>
                        {filterColumn(el.outcomes).map((el, idx) => (
                          <div key={idx} className={style.outcomes}>
                            {el.data.map((el, idx) => (
                              <div key={idx} className={style.outcome}>
                                <div className={style.button}>
                                  <Odd
                                    data={{
                                      ...el,
                                      ...active.league.matches[toggle.id].teams,
                                      pos: active.league.matches[toggle.id].pos,
                                      market: active.league.matches[toggle.id].odds[0].groups[7].markets[0].printname,
                                      c: el.a,
                                      sid: active.id,
                                      mid: active.league.matches[toggle.id].id,
                                      start: active.start,
                                      type: active.type,
                                      m_old: active.league.matches[toggle.id].odds[0].groups[7].markets[0].name,
                                      o_old: el.a,
                                    }}
                                    label={el.a}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <Live />
      )}
    </>
  )
}

export default Table
