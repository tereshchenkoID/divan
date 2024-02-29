import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { gameType } from 'constant/config'

import JackPot from 'pages/Home/modules/JackPot'
import Timer from '../Timer'

import style from './index.module.scss'

const Header = () => {
  const { t } = useTranslation()
  const { settings } = useSelector(state => state.settings)
  const { game } = useSelector(state => state.game)
  const { tv } = useSelector(state => state.tv)
  const { progress } = useSelector(state => state.progress)

  return (
    <div className={style.block}>
      <div className={style.left}>
        <div className={style.league}>
          <img src={game.logo} alt={game.name} className={style.img} />
        </div>
        {progress !== 0 && <Timer data={tv.event} type={game.type} />}
      </div>
      <div className={style.center}>
        <JackPot size={'lg'} />
        <div className={style.weeks}>
          {game.type === gameType.FOOTBALL_LEAGUE ? (
            <>
              <div className={style.week}>
                {t('interface.league')} {tv.event.league.league_id}
              </div>
              <div className={style.week}>
                {t('interface.week')} {tv.event.league.week}
              </div>
            </>
          ) : (
            <div className={style.week}>
              {t('interface.round')} #{tv.event.round ? tv.event.round.id : tv.event.id}
            </div>
          )}
        </div>
      </div>
      <div className={style.right}>
        <img src={settings.account.logo} alt="logo" />
      </div>
    </div>
  )
}

export default Header
