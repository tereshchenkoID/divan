import { useSelector } from 'react-redux'

import Translation from './Translation'
import History from './History'
import Live from './Live'
import Table from './Table'

import style from './index.module.scss'

const Page = () => {
  const { tv } = useSelector(state => state.tv)
  const { game } = useSelector(state => state.game)
  const { progress } = useSelector(state => state.progress)
  const { liveTimer } = useSelector(state => state.liveTimer)
  const { settings } = useSelector(state => state.settings)

  return (
    <div className={style.block}>
      <div className={style.column}>
        <>
          {settings.account.mode === '1' && progress === 2 && liveTimer !== 0 && <Translation game={game} />}
          {progress === 1 ? <Table data={tv.event} /> : <Live data={tv.event} />}
        </>
      </div>
      <div className={style.column}>
        <History />
      </div>
    </div>
  )
}

export default Page
