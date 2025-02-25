import React from 'react'

import Button from 'components/Button'
import Odd from './Odd'

import style from './index.module.scss'

const getEvery = (startPosition, arr) => {
  let result = []
  for (let i = startPosition; i < arr.length; i += 10) {
    result.push(arr[i])
  }
  return result
}

const Numbers = ({ numbers, setNumbers, random }) => {
  return (
    <div className={style.block}>
      {Array.from({ length: 10 }).map((el, idx) => (
        <div key={idx} className={style.cell}>
          <Button
            props={'button'}
            icon={'arrow-right'}
            initial={[style.button]}
            classes={['grey']}
            action={() => {
              setNumbers(getEvery(idx + 1, [...Array(81).keys()]))
            }}
          />
        </div>
      ))}
      {Array.from({ length: 80 }).map((el, idx) => (
        <div key={idx} className={style.cell}>
          <Odd data={++idx} date={numbers} action={setNumbers} random={random} />
        </div>
      ))}
    </div>
  )
}

export default Numbers
