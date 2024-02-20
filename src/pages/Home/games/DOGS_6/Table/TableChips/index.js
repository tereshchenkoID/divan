import Main from '../Main'
import Forecast from '../Forecast'
import Quinella from '../Quinella'
import Trincast from '../Trincast'

import style from './index.module.scss'

const getType = (type, data) => {
  switch (type) {
    case 0:
      return <Main data={data} />
    case 1:
      return <Forecast data={data} />
    case 2:
      return <Quinella data={data} />
    case 3:
      return <Trincast data={data} />
    default:
      return <Main data={data} />
  }
}

const TableChips = ({ type, events, data }) => {
  return <div className={style.block}>{getType(type, data)}</div>
}

export default TableChips
