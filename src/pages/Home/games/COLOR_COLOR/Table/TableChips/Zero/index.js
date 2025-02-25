import React, { useEffect, useState } from 'react'

import { colorType } from 'constant/config'

import Label from 'components/Label'
import Button from 'components/Button'

import style from '../index.module.scss'

const Zero = ({ numbers, type, setType, t }) => {
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (numbers.length > 0 && numbers.length < 11) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [numbers])

  return (
    <div>
      <div className={style.content}>
        <Label text={'BET ZERO'} size={'sm'} />
      </div>
      <div className={style.panel}>
        <div className={style.subtitle}>{t('games.COLOR_COLOR.bet_zero_description')}</div>
        <Button
          props={'button'}
          text={'BET ZERO'}
          initial={[style.button]}
          classes={['green', disabled && 'disabled', type === colorType.BET_ZERO && 'active']}
          action={() => {
            setType(type === colorType.BET_ZERO ? '' : colorType.BET_ZERO)
          }}
        />
      </div>
    </div>
  )
}

export default Zero
