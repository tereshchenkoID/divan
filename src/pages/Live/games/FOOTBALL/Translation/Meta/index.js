import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import style from './index.module.scss'

const Meta = ({ data }) => {
  const { t } = useTranslation()
  const { game } = useSelector(state => state.game)

  return (
    <div className={style.block}>
      <div className={style.top}>
        <img src={game.logo2} alt={game.name} className={style.img} loading={'lazy'} />
      </div>
      <div className={style.bottom}>
        <div>
          {t('interface.round')} #<span>{data.event.league.matches[0].id}</span>
        </div>
      </div>
    </div>
  )
}

export default Meta
