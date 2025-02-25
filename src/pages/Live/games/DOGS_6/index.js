import React from 'react'
import { useSelector } from 'react-redux'

import Translation from './Translation'
import Results from './Results'
import Markets from './Markets'
import Live from './Live'

const Table = () => {
  const { tv } = useSelector(state => state.tv)
  const { progress } = useSelector(state => state.progress)
  const { settings } = useSelector(state => state.settings)

  return (
    <>
      {settings.account.mode === '1' && progress === 2 && <Translation data={tv} />}
      {progress === 1 && <Markets data={tv.event} />}
      {progress === 2 && <Live />}
      {progress === 3 && <Results data={tv.event} />}
    </>
  )
}

export default Table
