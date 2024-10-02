import { useEffect, useState } from 'react'

import style from './index.module.scss'

import Button from 'components/Button'
import Double from './Double'
import Triple from './Triple'
import Extra from './Extra'

const getType = (type, data) => {
  switch (type) {
    case 0:
      return <Double data={data} />
    case 1:
      return <Triple data={data} />
    case 2:
      return <Extra data={data} />
    default:
      return <Double data={data} />
  }
}
const Races = ({ data }) => {
  const [active, setActive] = useState(0)
  const TYPES = ['System double', 'System Triple', 'Extra Bets']

  useEffect(() => {
    setActive(0)
  }, [data])

  return (
    <div>
      <div className={style.header}>
        {TYPES.map((el, idx) => (
          <Button
            key={idx}
            props={'button'}
            text={el}
            initial={[style.button]}
            classes={['green', active === idx && 'active']}
            action={() => {
              setActive(idx)
            }}
          />
        ))}
      </div>
      <div className={style.body}>{getType(active, data)}</div>
    </div>
  )
}

export default Races
