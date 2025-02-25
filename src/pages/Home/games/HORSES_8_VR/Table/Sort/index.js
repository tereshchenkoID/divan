import React from 'react'

import Button from 'components/Button'

import style from './index.module.scss'

const Sort = ({ date, data, action, id }) => {
  const val = `${id}-${date}`

  const addSort = () => {
    const f = data.indexOf(val) !== -1

    if (f) {
      const index = data.indexOf(val)
      action([...data.slice(0, index), ...data.slice(index + 1)])
    } else {
      action([...data, val])
    }
  }

  return (
    <Button
      props={'button'}
      text={(date === 1 && '1st') || (date === 2 && '2nd') || (date === 3 && '3rd')}
      initial={[style.block]}
      classes={['grey', data.indexOf(val) !== -1 && 'active']}
      action={() => {
        addSort()
      }}
    />
  )
}

export default Sort
