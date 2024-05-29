import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Barcode from 'react-barcode'

import { gameType } from 'constant/config'

import { getGameName } from 'helpers/getGameName'
import { getDateTime } from 'helpers/getDateTime'
import { getIcon } from 'helpers/getIcon'

import Icon from 'components/Icon'

import classNames from 'classnames'

import style from './index.module.scss'

export const TicketPrint = React.forwardRef((data, ref) => {
  const { t } = useTranslation()
  const { settings } = useSelector(state => state.settings)
  const { resize } = useSelector(state => state.resize)

  return (
    <div className={classNames(style.block, resize && style.sm)} ref={ref}>
      <div className={style.header}>
        <div>
          {settings.print.logo && (
            <div className={style.logo}>
              <img src={settings.print.logo} alt={'Logo'} loading={'lazy'} />
            </div>
          )}
        </div>
        <div>
          <ul className={style.info}>
            <li>
              <div>{t('interface.shop')}:</div>
              <div>{data.data.stake.username}</div>
            </li>
            <li>
              <div>{t('interface.bet')}:</div>
              <div>{getDateTime(data.data.stake.placed, 2)}</div>
            </li>
            <li>
              <div>{t('interface.time')}:</div>
              <div>{getDateTime(data.data.stake.placed, 0)}</div>
            </li>
          </ul>
        </div>
      </div>
      <div className={style.body}>
        {data.data.reprint && (
          <>
            <div className={style.copy}>{t('interface.copy')}</div>
            <div className={style.title}>
              {t('interface.duplicate')} ({getDateTime(new Date().getTime(), 1)})
            </div>
          </>
        )}
        <div className={style.title}>
          {t('interface.ticket')} #{data.data.stake.id}
        </div>
        <div className={style.code}>
          <Barcode value={data.data.stake.id.toString()} displayValue={false} />
        </div>
        {data.data.stake.group &&
          data.data.stake.group.map((el, idx) => (
            <div key={idx} className={style.bet}>
              <ul className={style.info}>
                <li>
                  <div>
                    {t('interface.gr')}: {el.group}
                  </div>
                  <div>
                    {el.group} x {settings.account.symbol} {parseFloat(el.unit).toFixed(2)} = {settings.account.symbol}{' '}
                    {el.combi * el.unit}
                  </div>
                </li>
                <li>
                  <div>
                    {t('interface.min')}/{t('interface.max')} {t('interface.win')}:
                  </div>
                  <div>
                    {settings.account.symbol} {el.minwin.toFixed(2)} / {settings.account.symbol} {el.maxwin.toFixed(2)}
                  </div>
                </li>
              </ul>
            </div>
          ))}
        {data.data.stake.bets.map((el, idx) => (
          <div key={idx} className={style.bet}>
            <div className={style.wrapper}>
              <div>{el.details.matchId}</div>
              <div className={style.icon}>
                <Icon id={getIcon(el.details.game)} />
              </div>
              {el.details.game.indexOf(gameType.FOOTBALL) !== -1 ? (
                <>
                  {el.details.pos}.
                  <div className={style.teams}>
                    <div>{el.details.teams.home}</div>
                    <div>-</div>
                    <div>{el.details.teams.away}</div>
                  </div>
                </>
              ) : (
                getGameName(settings.games, el.details.game)
              )}
            </div>
            <div className={style.wrapper}>
              <div>{getDateTime(el.details.start, 0)}</div>
              <div>
                {el.market.replaceAll('_', ' ')} : {el.selection.replaceAll('_', ' ')}
              </div>
              <div className={style.odd}>{el.odds}</div>
            </div>
          </div>
        ))}
      </div>
      <ul className={style.info}>
        <li>
          <div>{t('interface.total_stake')}: </div>
          <div>
            {settings.account.symbol} {data.data.stake.amount}
          </div>
        </li>
        <li>
          <div>
            {t('interface.min')}/{t('interface.max')} {t('interface.win')}:{' '}
          </div>
          <div>
            {settings.account.symbol} {data.data.stake.minwin ? data.data.stake.minwin.toFixed(2) : 0} / {settings.account.symbol}{' '}
            {data.data.stake.maxwin ? data.data.stake.maxwin.toFixed(2) : 0}
          </div>
        </li>
      </ul>
      {settings.print.text !== '' && <div className={style.text}>{settings.print.text}</div>}
    </div>
  )
})
