import { useSelector } from 'react-redux'

import Item from './Item'

import style from './index.module.scss'

const Live = ({ data }) => {
  const { liveTimer } = useSelector(state => state.liveTimer)

  return (
    <div className={style.block}>
      {data.league.matches.map((el, idx) => (
        <Item key={idx} data={el} timer={liveTimer} />
      ))}
    </div>
  )
}

export default Live
