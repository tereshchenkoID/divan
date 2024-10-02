import { useSelector } from 'react-redux'

import Table from './Table'

const Page = () => {
  const { tv } = useSelector(state => state.tv)

  return <Table data={tv.event} />
}

export default Page
