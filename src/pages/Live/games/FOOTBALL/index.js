import React from 'react'
import { useSelector } from 'react-redux'

import Translation from './Translation'
import Table from './Table'
import Live from './Live'

const Page = () => {
  const { tv } = useSelector(state => state.tv)
  const { game } = useSelector(state => state.game)
  const { progress } = useSelector(state => state.progress)
  const { liveTimer } = useSelector(state => state.liveTimer)
  const { settings } = useSelector(state => state.settings)

  return (
    <>
      {
        settings.account.mode === '1' && progress === 2 && liveTimer !== 0 && 
        <Translation game={game} />
      }
      {
        progress === 1
          ? 
            <Table data={tv.event} /> 
          : 
            <Live data={tv.event} />
      }
    </>
  )
}

export default Page
