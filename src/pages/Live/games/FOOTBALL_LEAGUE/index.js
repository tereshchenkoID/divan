import { useDispatch, useSelector } from 'react-redux'

import Translation from './Translation'
import History from './History'
import Live from './Live'
import Table from './Table'

import style from './index.module.scss'

const Page = () => {
  const dispatch = useDispatch()
  const { tv } = useSelector(state => state.tv)
  const { game } = useSelector(state => state.game)
  const { progress } = useSelector(state => state.progress)
  const { settings } = useSelector(state => state.settings)

  return (
    <div className={style.block}>
      <div className={style.column}>{progress === 1 ? <Table data={tv.event} /> : <Live data={tv.event} />}</div>
      <div className={style.column}>
        <History />
      </div>

      {settings.account.mode === '1' && <Translation game={game} />}
    </div>
  )
}

export default Page
