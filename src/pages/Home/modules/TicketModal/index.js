import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { status } from 'constant/config'

import useSocket from 'hooks/useSocket'

import { checkCmd } from 'helpers/checkCmd'
import { getIcon } from 'helpers/getIcon'
import { getData } from 'helpers/api'
import { getDateTime } from 'helpers/getDateTime'

import { setNotification } from 'store/HOME/actions/notificationAction'

import Loader from 'components/Loader'
import Icon from 'components/Icon'
import Button from 'components/Button'

import style from './index.module.scss'

const TicketModal = ({ id, action }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { sendMessage } = useSocket()

  const { settings } = useSelector(state => state.settings)
  const { isConnected, receivedMessage } = useSelector(state => state.socket)

  const [data, setData] = useState({})
  const [find, setFind] = useState(id || 0)
  const [step, setStep] = useState(id ? 1 : 0)
  const [loading, setLoading] = useState(true)
  const [type, setType] = useState(0)

  const sendAction = action => {
    if (isConnected) {
      sendMessage({
        cmd: `account/${sessionStorage.getItem('authToken')}/${action}/${find}`,
      })
    } else {
      getData(`/${action}/${find}`).then(json => {
        if (json.hasOwnProperty('stake')) {
          setData(json)
        } else {
          dispatch(setNotification({ text: t('notification.ticket_not_found'), type: status.error }))
        }
      })
    }
  }

  const handleSubmit = event => {
    event && event.preventDefault()

    if (isConnected) {
      sendMessage({
        cmd: `account/${sessionStorage.getItem('authToken')}/details/${find}`,
      })
    } else {
      getData(`/details/${find}`).then(json => {
        if (json.hasOwnProperty('stake')) {
          setData(json)
          setStep(1)
          setType(json.stake.group.length > 0 ? 1 : 0)
          setLoading(false)
        } else {
          dispatch(setNotification({ text: t('notification.ticket_not_found'), type: status.error }))
        }
      })
    }
  }

  useEffect(() => {
    if (step === 1) {
      handleSubmit()
    }

    return () => {
      setStep(0)
      setLoading(true)
    }
  }, [])

  useEffect(() => {
    if (receivedMessage !== '') {
      if (checkCmd('details', receivedMessage.cmd)) {
        if (receivedMessage.hasOwnProperty('stake')) {
          if (receivedMessage.stake.id === find) {
            setData(receivedMessage)
            setStep(1)
            setType(receivedMessage.stake.group.length > 0 ? 1 : 0)
            setLoading(false)
          }
        }
        // else {
        //     dispatch(setNotification(t('notification.ticket_not_found')))
        // }
      }

      if (checkCmd('payout', receivedMessage.cmd) || checkCmd('cancel', receivedMessage.cmd)) {
        if (receivedMessage.hasOwnProperty('stake')) {
          setData(receivedMessage)
        }
        // else {
        //     dispatch(setNotification(t('notification.ticket_not_found')))
        // }
      }
    }
  }, [receivedMessage])

  return (
    <div className={style.block}>
      <div className={style.overflow}>
        <div className={style.content}>
          <div className={style.header}>
            <p>{t('interface.ticket_details')}</p>
            <div className={classNames(style.button, style.sm)}>
              <Button
                type={'red'}
                size={'sm'}
                icon={'close'}
                action={() => {
                  action(false)
                }}
              />
            </div>
          </div>
          <div className={style.body}>
            {step === 0 && (
              <>
                <div className={style.title}>{t('interface.ticket_enter')}</div>
                <form className={style.form} onSubmit={handleSubmit}>
                  <input
                    type={'number'}
                    className={style.field}
                    onChange={e => {
                      setFind(e.target.value || '')
                    }}
                  />
                  <div className={classNames(style.button, style.md)}>
                    <Button type={'green'} size={'md'} icon={'search'} props={'submit'} />
                  </div>
                </form>
              </>
            )}
            {step === 1 && (
              <>
                {loading ? (
                  <Loader type={'block'} background={'transparent'} />
                ) : (
                  <>
                    <div
                      className={classNames(
                        style.state,
                        data.stake.paid === '1' && style['paid'],
                        data.stake.status === 'CANCELLED' && style['cancelled'],
                      )}
                    >
                      {data.stake.paid === '1' ? (
                        <img src={'/img/paid.png'} alt={'Paid'} />
                      ) : (
                        <img src={'/img/cancelled.png'} alt={'Paid'} />
                      )}
                    </div>
                    <div className={style.wrapper}>
                      <div className={style.title}>{t('interface.details')}</div>
                      <div className={classNames(style.table, style.left, style.sm)}>
                        <div className={style.row}>
                          <div className={style.cell}>{t('interface.ticket_number')}</div>
                          <div className={style.cell}>{data.stake.id}</div>
                          <div className={style.cell}>{t('interface.total_stake')}</div>
                          <div className={style.cell}>
                            {settings.account.symbol} {data.stake.amount}
                          </div>
                        </div>
                        <div className={style.row}>
                          <div className={style.cell}>{t('interface.book_time')}</div>
                          <div className={style.cell}>{getDateTime(data.stake.placed, 1)}</div>
                          <div className={style.cell}>{t('interface.jackpot')}</div>
                          <div className={style.cell}></div>
                        </div>
                        <div className={style.row}>
                          <div className={style.cell}>{t('interface.selections')}</div>
                          <div className={style.cell}>{data.stake.bets.length}</div>
                          <div className={style.cell}>{t('interface.total_payout')}</div>
                          <div className={style.cell}>
                            {data.stake.payout && `${settings.account.symbol} ${data.stake.payout}`}
                          </div>
                        </div>
                        <div className={style.row}>
                          <div className={style.cell}>{t('interface.ticket_type')}</div>
                          <div className={style.cell}>
                            {data.stake.group.length ? t('interface.system') : t('interface.single')}
                          </div>
                          <div className={style.cell}>{t('interface.winning_tax')}</div>
                          <div className={style.cell}>{data.stake.tax}</div>
                        </div>
                        <div className={style.row}>
                          <div className={style.cell}>{t('interface.status')}</div>
                          <div className={style.cell}>
                            <div className={classNames(style.status, style[data.stake.status.toLowerCase()])} />
                            {data.stake.status}
                          </div>
                          <div className={style.cell}>{t('interface.net_payout')}</div>
                          <div className={style.cell}>
                            {data.stake.payout && `${settings.account.symbol} ${data.stake.payout}`}
                          </div>
                        </div>
                      </div>
                    </div>
                    {type === 1 && (
                      <div className={style.wrapper}>
                        <div className={style.title}>{t('interface.system_details')}</div>
                        <div className={classNames(style.table, style.center, style.lg)}>
                          <div className={classNames(style.row, style.head)}>
                            <div className={style.cell}>{t('interface.gr')}</div>
                            <div className={style.cell}>{t('interface.combi')}</div>
                            <div className={style.cell}>{t('interface.stake')}</div>
                            <div className={style.cell}>
                              {t('interface.pot')}. {t('interface.min')} {t('interface.win')}
                            </div>
                            <div className={style.cell}>
                              {t('interface.pot')}. {t('interface.max')} {t('interface.win')}
                            </div>
                            <div className={style.cell}>{t('interface.win')}</div>
                            <div className={style.cell}>{t('interface.bonus')}</div>
                          </div>
                          {data.stake.group.map((el, idx) => (
                            <div key={idx} className={style.row}>
                              <div className={style.cell}>{el.group}</div>
                              <div className={style.cell}>{el.combi}</div>
                              <div className={style.cell}>
                                {el.combi} x {settings.account.symbol} {el.amount} = {settings.account.symbol}{' '}
                                {el.combi * el.unit}
                              </div>
                              <div className={style.cell}>
                                {settings.account.symbol} {el.minwin.toFixed(2)}
                              </div>
                              <div className={style.cell}>
                                {settings.account.symbol} {el.maxwin.toFixed(2)}
                              </div>
                              <div className={style.cell}>{el.win && `${settings.account.symbol} ${data.stake.win || 0}`}</div>
                              <div className={style.cell}></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className={style.wrapper}>
                      <div className={style.title}>{t('interface.bet_list')}</div>
                      <div className={classNames(style.table, style.center, style[type === 0 ? 'single' : 'system'])}>
                        <div className={classNames(style.row, style.head)}>
                          <div className={style.cell}>{t('interface.time')}</div>
                          <div className={style.cell}>{t('interface.selection')}</div>
                          <div className={style.cell}>{t('interface.event_result')}</div>
                          <div className={style.cell}>{t('interface.outcome')}</div>
                          <div className={style.cell}>
                            {t('interface.max')} {t('interface.odds')}
                          </div>
                          {type === 0 ? (
                            <>
                              <div className={style.cell}>{t('interface.stake')}</div>
                              <div className={style.cell}>{t('interface.win')}</div>
                            </>
                          ) : (
                            <>
                              <div className={style.cell}>
                                {t('interface.win')} {t('interface.odds')}
                              </div>
                            </>
                          )}
                        </div>
                        {data.stake.bets.map((el, idx) => (
                          <div key={idx} className={style.row}>
                            <div className={style.cell}>{getDateTime(el.details.start, 0)}</div>
                            <div className={classNames(style.cell, style.left)}>
                              <div className={style.icon}>
                                <Icon id={getIcon(el.type)} />
                              </div>
                              <div className={style.scoreboard}>
                                {el.details.pos}.{el.details.teams.home}-{el.details.teams.away}
                              </div>
                              {el.market}: {el.selection}
                            </div>
                            <div className={style.cell}>
                              <div className={style.score}>
                                {el.status !== 'MANUALLY_CANCELLED' &&
                                  el.details.results &&
                                  el.details.results.map((el, idx) => <span key={idx}>{el}</span>)}
                              </div>
                            </div>
                            <div className={classNames(style.cell, style.left)}>
                              <div className={classNames(style.status, style[el.status.toLowerCase()])} />
                              {el.status}
                            </div>
                            <div className={style.cell}>{el.odds}</div>
                            {type === 0 ? (
                              <>
                                <div className={style.cell}>
                                  {settings.account.symbol} {el.amount}
                                </div>
                                <div className={style.cell}>{el.win && `${settings.account.symbol} ${data.stake.win || 0}`}</div>
                              </>
                            ) : (
                              <>
                                <div className={style.cell}>{el.resOdds}</div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          {step === 1 && !loading && (
            <div className={style.footer}>
              {settings.business.cancel && data.stake.status === 'OPEN' && (
                <div className={classNames(style.button, style.lg)}>
                  <Button
                    type={'blue'}
                    size={'lg'}
                    icon={'cancelled'}
                    action={() => {
                      sendAction('cancel')
                    }}
                  />
                </div>
              )}
              {settings.business.payout && data.stake.status === 'WIN' && data.stake.paid === '0' && (
                <div className={classNames(style.button, style.lg)}>
                  <Button
                    type={'olive'}
                    size={'lg'}
                    icon={'dollar'}
                    action={() => {
                      sendAction('payout')
                    }}
                  />
                </div>
              )}
              <div className={classNames(style.button, style.lg)}>
                <Button
                  type={'red'}
                  size={'lg'}
                  icon={'close'}
                  action={() => {
                    action(false)
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TicketModal
