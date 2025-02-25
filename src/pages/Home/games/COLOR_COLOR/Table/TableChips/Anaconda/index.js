import React, { useEffect, useState } from 'react'

import { colorType } from 'constant/config'

import Label from 'components/Label'
import Button from 'components/Button'

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
        <Label text={'ANACONDA'} size={'sm'} />
      </div>
      <div className={style.panel}>
        <div className={style.subtitle}>{t('games.COLOR_COLOR.anaconda_description')}</div>
        <Button
          props={'button'}
          text={'ANACONDA'}
          initial={[style.button]}
          classes={['green', disabled && 'disabled', type === colorType.ANACONDA && 'active']}
          action={() => {
            setType(type === colorType.ANACONDA ? '' : colorType.ANACONDA)
          }}
        />
      </div>
    </div>
  )
}

export default Anaconda
