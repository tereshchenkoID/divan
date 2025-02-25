import React from 'react'

import style from './index.module.scss'

const Decor = ({ type }) => {
  return (
    <div className={style.block}>
      <img src={type} alt="Decor" />
    </div>
  )
}

export default Decor
