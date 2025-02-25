import React from 'react'

import Numbers from '../Numbers'

import style from './index.module.scss'

const Table = ({ data }) => {
  return (
    <div className={style.block}>
      <div className={style.grid}>
        {Array.from({ length: 8 }, (_, idx) => (
          <Numbers key={idx} tip={8 - idx} data={data} />
        ))}
      </div>
    </div>
  )
}

export default Table
