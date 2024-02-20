import { useEffect, useState } from 'react'

import classNames from 'classnames'

import { colorType } from 'constant/config'

import style from '../index.module.scss'

const Anaconda = ({ numbers, type, setType, t }) => {
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (numbers.length > 5 && numbers.length < 11) {
      setDisabled(false)
    } else {
      setDisabled(true)
      setType('')
    }
  }, [numbers])

  return (
    <div>
      <div className={style.content}>
        <div className={style.label}>ANACONDA</div>
      </div>
      <div className={style.panel}>
        <div className={style.subtitle}>{t('games.COLOR_COLOR.anaconda_description')}</div>
        <button
          className={classNames(style.button, disabled && style.disabled, type === colorType.ANACONDA && style.active)}
          onClick={() => {
            setType(type === colorType.ANACONDA ? '' : colorType.ANACONDA)
          }}
        >
          ANACONDA
        </button>
      </div>
    </div>
  )
}

export default Anaconda
