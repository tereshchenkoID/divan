import Translation from '../Translation'
import Statistics from '../Statistics'
import History from '../History'
import Winning from '../Winning'
import Options from '../Options'
import Hot from '../Hot'

import style from './index.module.scss'

const Table = ({ data, progress }) => {
  return (
    <div className={style.block}>
      <div className={style.grid}>
        <div>
          <History data={data} />
        </div>
        <div>
          <Statistics data={data} />
          <Hot data={data} />
          <Options data={data} />
          <Winning data={data} />
        </div>
        <Translation data={data} />
      </div>
    </div>
  )
}

export default Table
