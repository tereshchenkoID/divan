import style from './index.module.scss'

import Button from 'components/Button'
import Market from './Market'

const Markets = ({ active, match, setToggle }) => {
  return (
    <div className={style.block}>
      <div className={style.head}>
        <div>
          {match.teams.home.name} - {match.teams.away.name}
        </div>
        <Button
          props={'button'}
          icon={'close'}
          initial={[style.close]}
          classes={['red']}
          action={() => {
            setToggle(null)
          }}
        />
      </div>
      <div className={style.wrapper}>
        {match.odds[0].groups.map((el_m, idx_m) => (
          <Market key={idx_m} id={idx_m} active={active} match={match} group={el_m} />
        ))}
      </div>
    </div>
  )
}

export default Markets
