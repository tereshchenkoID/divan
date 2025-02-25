import React from 'react'
import { useSelector } from 'react-redux'

import Translation from './Translation'
import Table from './Table'

const Page = () => {
  const { tv } = useSelector(state => state.tv)
  const { progress } = useSelector(state => state.progress)

  return (
    <>
      {(progress === 2 || progress === 3) && <Translation data={tv.event} />}
      {progress === 1 && <Table data={tv.event} />}
    </>
  )
}

export default Page
