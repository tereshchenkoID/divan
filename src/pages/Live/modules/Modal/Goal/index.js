import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import style from './index.module.scss'

const Goal = ({team}) => {
  const { t } = useTranslation()

  return (
    <div 
      className={
        classNames(
          style.block,
          team && style.active
        )
      }
    >
      <div className={style.title}>{t('goal')}!</div>
      <div className={style.team}>{team}</div>
    </div>
  )
}

export default Goal
