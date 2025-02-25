import React from 'react'

import Label from 'components/Label'
import Odd from '../Odd'

import style from './index.module.scss'

const groupByFirstValue = (arr, from, to) => {
  let result = []
  let temp = {}

  for (let i = 0; i < arr.length; i++) {
    let key = arr[i]['a'].split(',')[0]
    if (!temp[key]) {
      temp[key] = []
    }
    temp[key].push(arr[i])
  }

  for (let key in temp) {
    result.push(temp[key].slice(from, to))
  }

  return result
}

const Tricast = ({ data, from, to, index }) => {
  return (
    <>
      <Label text={`${data.race.odds.markets[7].printname} ${index}`} />
      <div className={style.row}>
        {groupByFirstValue(data.race.odds.markets[7].outcomes, from, to).map((el_c, idx_c) => (
          <div key={idx_c} className={style.column}>
            {el_c.map((el_i, idx_i) => (
              <div key={idx_i} className={style.cell}>
                <Odd data={el_i} view={'horizontal'} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default Tricast
