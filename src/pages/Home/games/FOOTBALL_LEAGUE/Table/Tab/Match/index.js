import Icon from 'components/Icon'
import Odd from 'pages/Home/games/FOOTBALL_LEAGUE/Table/Odd'

import style from './index.module.scss'

const Match = ({ id, active, match, group, toggle, setToggle }) => {
  return (
    <div className={style.block}>
      <div>{match.pos}</div>
      <div
        className={style.meta}
        onClick={() => {
          setToggle(toggle === id ? null : id)
        }}
      >
        <div>{match.teams.home.name}</div>
        <div>vs</div>
        <div>{match.teams.away.name}</div>
        <div className={style.toggle}>
          <Icon id={'arrow-right'} />
        </div>
      </div>
      <div className={style.columns}>
        {Object.values(match.odds[0].groups[group].markets[0].outcomes).map((el, idx) => (
          <div key={idx} className={style.odd}>
            <Odd
              data={{
                ...el,
                ...match.teams,
                pos: match.pos,
                market: match.odds[0].groups[group].markets[0].printname,
                c: el.c,
                sid: active.id,
                mid: match.id,
                start: active.start,
                type: active.type,
                m_old: match.odds[0].groups[group].markets[0].name,
                o_old: el.a,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Match
