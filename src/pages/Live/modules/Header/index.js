import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { gameType } from 'constant/config'

import JackPot from 'pages/Home/modules/JackPot'
import Button from 'components/Button'
import Timer from '../Timer'

import style from './index.module.scss'

const Header = ({ timer, initTime }) => {
  const { t } = useTranslation()
  const { settings } = useSelector(state => state.settings)
  const { game } = useSelector(state => state.game)
  const { tv } = useSelector(state => state.tv)
  const { progress } = useSelector(state => state.progress)

  return (
    <div className={style.block}>
      <div className={style.left}>
        <div className={style.league}>
          <div className={style.img}>
            <img src={game.logo} alt={game.name} loading={'lazy'} />
          </div>
          {game.logo2 && (
            <div className={style.img}>
              <img src={game.logo2} alt={game.name} loading={'lazy'} />
            </div>
          )}
        </div>
        {progress !== 0 && <Timer timer={timer} initTime={initTime} />}
      </div>
      <div className={style.center}>
        <JackPot size={'lg'} />
        <div className={style.weeks}>
          {game.type === gameType.FOOTBALL_LEAGUE ? (
            <>
              <Button
                text={`${t('interface.league')} ${tv.event.league.league_id}`}
                initial={[style.week]}
                classes={['green']}
              />
              <Button
                text={`${t('interface.week')} ${tv.event.league.week}`}
                initial={[style.week]}
                classes={['green']}
              />
            </>
          ) : (
            <Button
              text={`${t('interface.round')} #${tv.event.round ? tv.event.round.id : tv.event.id}`}
              initial={[style.week]}
              classes={['green']}
            />
          )}
        </div>
      </div>
      <div className={style.right}>
        {settings.account.logo && <img src={settings.account.logo} alt="logo" loading={'lazy'} />}
      </div>
    </div>
  )
}

export default Header
