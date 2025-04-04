import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useReactToPrint } from 'react-to-print'
import { useTranslation } from 'react-i18next'
import { getData, postData } from 'hooks/useRequest'
import { getBetMaxSingle, getMinMaxOdd, getSystemBetMinMaxSystem, getSystemCombination, getTotalStakeSingle, calculateStakeSum } from 'hooks/useStake'
import useSocket from 'hooks/useSocket'

import { status, gameType, oddsType, printMode } from 'constant/config'

import { deleteBetslip } from 'store/HOME/actions/betslipAction'
import { setStake } from 'store/HOME/actions/stakeAction'
import { setTicket } from 'store/HOME/actions/ticketAction'
import { setBalance } from 'store/HOME/actions/balanceAction'
import { setNotification } from 'store/HOME/actions/notificationAction'
import { setForecast } from 'store/HOME/actions/forecatsAction'

import { checkCmd } from 'helpers/checkCmd'
import { getToken } from 'helpers/getToken'

import { TicketPrint } from 'pages/Home/modules/TicketPrint'
import TicketModal from 'pages/Home/modules/TicketModal'
import Icon from 'components/Icon'
import Button from 'components/Button'

import Stakes from './Stakes'
import Bets from './Bets'
import Types from './Types'
import Forecast from './Forecast'

import style from './index.module.scss'

const Betslip = () => {
  const { t } = useTranslation()
  const { sendMessage } = useSocket()
  const dispatch = useDispatch()
  const { isConnected, receivedMessage } = useSelector(state => state.socket)
  const { betslip } = useSelector(state => state.betslip)
  const { forecast } = useSelector(state => state.forecast)
  const { stake } = useSelector(state => state.stake)
  const { settings } = useSelector(state => state.settings)
  const { balance } = useSelector(state => state.balance)
  const STAKE_TYPE = settings.betting.type

  const componentRef = useRef()

  const [init, setInit] = useState(false)
  const [change, setChange] = useState(true)
  const [disabled, setDisabled] = useState(true)
  const [type, setType] = useState(0)
  const [checkTicket, setCheckTicket] = useState(false)
  const [response, setResponse] = useState(null)
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(0)
  const [loading, setLoading] = useState(false)
  const isEmpty = Object.prototype.hasOwnProperty.call(forecast, 'id') || betslip.length > 0

  // System PER_BET
  const isSystemPerBetMinMax = (a, minValue, maxValue) => {
    const isValid = a.d.some(item => parseFloat(item.a) < parseFloat(minValue) || parseFloat(item.a) > parseFloat(maxValue))
    return isValid
  }

  // Single PER_BET
  const isSinglePerBetMinMax = (a, minValue, maxValue) => {
    const isValid = a.some(item => parseFloat(item.stake) < parseFloat(minValue) || parseFloat(item.stake) > parseFloat(maxValue))
    return isValid
  }

  // Single PER_GROUP
  const isSinglePerGroupMinMax = (a, minValue, maxValue) => {
    const isValid = a.e.some(item => parseFloat(item.g) < parseFloat(minValue) || parseFloat(item.g) > parseFloat(maxValue))
    return isValid
  }

  // System PER_GROUP
  const isSystemPerGroupMinMax = (a, minValue, maxValue) => {
    const s = a.filter(item => item.stake !== 0)
    const isValid = s.some(item => (parseFloat(item.stake) / item.combi) < parseFloat(minValue) || (parseFloat(item.stake) / item.combi) > parseFloat(maxValue))
    return isValid
  }

  const sendStake = () => {
    if (stake.length || Object.prototype.hasOwnProperty.call(forecast, 'id')) {
      const a = {
        a: balance.account.currency,
        b: STAKE_TYPE,
        c: settings.betting.odds,
        d: [],
        e: [],
      }

      if (Object.prototype.hasOwnProperty.call(forecast, 'id')) {
        a.f = forecast.market.name
        a.d.push({
          b: 2,
          a: forecast.stake,
          g: forecast.stake
        })
        for (let i = 0; i < forecast.data.length; i++) {
          a.e.push({
            a: gameType.SPORT_PR,
            b: forecast.data[i].id,
            b_1: forecast.data[i].b_1 ? 1 : 0,
            b_2: forecast.data[i].b_2 ? 1 : 0,
            outcomes: forecast.data[i].outcomes,
          })
        }
      } 
      else {
        let type = 0

        for (let i = 0; i < stake.length; i++) {
          if (stake[i].stake !== 0) {
            let s = {}
            s.b = stake[i].gr
            type = stake[i].type

            if (type === 1) {
              s.a = stake[i].stake
            }

            a.d.push(s)
          }
        }

        for (let i = 0; i < betslip.length; i++) {
          if (betslip[i].stake !== 0) {
            let s = {
              a: betslip[i].type,
              b: betslip[i].mid || betslip[i].roundId,
              c: betslip[i].b,
              e: betslip[i].m_old, // Change after
              f: betslip[i].o_old, // Change after
            }

            if (type === 0) {
              s.g = betslip[i].stake.toString()
            }

            a.e.push(s)
          }
        }
      }

      const minValue = stake[0]?.type === 1 ? settings.betslip.system.min : settings.betslip.single.min
      const maxValue = stake[0]?.type === 1 ? settings.betslip.system.max : settings.betslip.single.max
      const isStakeExceeded = getTotalStakeSingle(stake) > balance.account.balance;
      let isError = true

      if(type === 0) {
        if(STAKE_TYPE === oddsType.PER_BET) {
          isError = isSinglePerBetMinMax(betslip, minValue, maxValue)
        }
        else {
          isError = isSinglePerGroupMinMax(a, minValue, maxValue)
        }
      }
      else {
        if(STAKE_TYPE === oddsType.PER_BET) {
          isError = isSystemPerBetMinMax(a, minValue, maxValue)
        }
        else {
          isError = isSystemPerGroupMinMax(stake, minValue, maxValue)
        }
      }

      setMin(minValue)
      setMax(maxValue)

      if(isStakeExceeded) {
        dispatch(
          setNotification({
            text: t('notification.no_money'),
            type: status.error,
          }),
        )
      }
      else {
        if(isError) {
          dispatch(
            setNotification({
              text: t('notification.stake_lower_upper')
                .replaceAll('${symbol}', settings.account.symbol)
                .replace('${min}', minValue)
                .replace('${max}', maxValue),
              type: status.error,
            }),
          )
        }
        else {
          setLoading(true)

          if (isConnected) {
            sendMessage({
              cmd: `account/${getToken()}/placebet`,
              payload: a,
            })
            sendMessage({
              cmd: `account/${getToken()}/balance`,
            })
          } else {
            postData('/placebet', JSON.stringify(a)).then(json => {
              if (Object.prototype.hasOwnProperty.call(json, 'account')) {
                if (settings.print.mode === printMode.WEB_PRINT && settings.print.payout) {
                  setResponse(json)
                }
                if (settings.print.mode === printMode.POS) {
                  window.printTicket(JSON.stringify(json), 1)
                }

                dispatch(setBalance())
                dispatch(deleteBetslip([]))
                dispatch(setStake([]))
                setLoading(false)
              } else {
                dispatch(
                  setNotification({
                    text: json.error_message,
                    type: status.error,
                  }),
                )
              }
            })
          }
        }
      }
    } else {
      dispatch(setNotification({ text: t('notification.please_pick_up_bet'), type: status.error }))
    }
  }

  const repeatPrint = () => {
    if(settings.print.mode !== printMode.DISABLED) {
      if (isConnected) {
        sendMessage({
          cmd: `account/${getToken()}/reprint`,
        })
      } else {
        getData(`/reprint`).then(json => {
          if (Object.prototype.hasOwnProperty.call(json, 'stake')) {
            if (settings.print.mode === printMode.WEB_PRINT && settings.print.payout) {
              setResponse({
                ...json,
                reprint: true,
              })
            }
            else {
              window.printTicket(JSON.stringify(json), 2)
            }
          } else {
            dispatch(setNotification({ text: t('notification.ticket_not_found'), type: status.error }))
          }
        })
      }
    }
  }

  const checkGames = () => {
    if (betslip.length) {
      const t = betslip[0].type
      return betslip.find(el => {
        return el.type !== t
      })
    } else {
      return null
    }
  }

  const systemHandler = () => {
    const r = []
    const b = getSystemCombination(betslip)

    b.countList.map(el => {
      const s = []

      for (let i = 0; i < b.r.length; i++) {
        if (b.r[i].length === el.gr) {
          s.push(b.r[i])
        }
      }

      const min = getSystemBetMinMaxSystem(s, 0)
      const max = getSystemBetMinMaxSystem(s, 1)
      const maxWin = getSystemBetMinMaxSystem(s, 2)
      const st = settings.betslip.system.default

      r.push({
        type: 1,
        id: el.combi,
        gr: el.gr,
        combi: el.combi,
        min: min,
        max: max,
        minWin: min * st,
        maxWin: maxWin * st,
        stake: 0,
      })

      return true
    })

    return r
  }

  const singleHandler = () => {
    const minOdd = getMinMaxOdd(betslip, 0)
    const maxOdd = getMinMaxOdd(betslip, 1)
    const maxWin = getBetMaxSingle(betslip)
    let s

    const f = checkGames()

    if (f) {
      s = getTotalStakeSingle(betslip)
    } else {
      if (!init) {
        if (betslip[0].type === gameType.FOOTBALL_LEAGUE) {
          s = STAKE_TYPE === oddsType.PER_BET
              ? settings.betslip.single.default
              : getTotalStakeSingle(betslip)

          // s = settings.betslip.single.default

          // s = STAKE_TYPE === oddsType.PER_BET
          //     ? settings.betslip.single.default
          //     : settings.betslip.single.default * betslip.length
        } else {
          s = getTotalStakeSingle(betslip)
        }
      } else {
        s = getTotalStakeSingle(betslip)
      }
    }

    return [
      {
        type: 0,
        id: 0,
        gr: 1,
        combi: betslip.length,
        min: minOdd,
        max: maxOdd,
        minWin: minOdd * s,
        maxWin: maxWin * s,
        stake: parseInt(s),
      },
    ]
  }

  const checkType = () => {
    if (betslip.length > 1) {
      const f = betslip.find(el => {
        return el.type !== gameType.FOOTBALL_LEAGUE
      })
      if (f) {
        setDisabled(true)
        setType(0)
      } else {
        let e = betslip[0].mid
        const c = betslip.find(el => {
          return el.mid !== e
        })

        if (!c) {
          setDisabled(true)
          setType(0)
        } else {
          if(change) {
            setType(1)
            setChange(false)
          }
          setDisabled(false)
        }
      }
    } else {
      setType(0)
      setDisabled(true)
    }
  }

  const a = useReactToPrint({
    content: () => componentRef.current,
  })

  useEffect(() => {
    if (receivedMessage !== '' && checkCmd('reprint', receivedMessage.cmd)) {
      if (Object.prototype.hasOwnProperty.call(receivedMessage, 'stake')) {
        if (settings.print.mode === printMode.WEB_PRINT && settings.print.payout) {
          setResponse(receivedMessage)
        }
        if (settings.print.mode === printMode.POS) {
          window.printTicket(JSON.stringify(receivedMessage), 2)
        }
      } else {
        dispatch(setNotification({ text: t('notification.ticket_not_found'), type: status.error }))
      }
    } 
    else if (receivedMessage !== '' && checkCmd('placebet', receivedMessage.cmd)) {
      if (!receivedMessage.data) {
        if (settings.print.mode === printMode.WEB_PRINT && settings.print.payout) {
          setResponse(receivedMessage)
        }
        if (settings.print.mode === printMode.POS) {
          window.printTicket(JSON.stringify(receivedMessage), 1)
        }

        dispatch(deleteBetslip([]))
        dispatch(setStake([]))
      } else {
        dispatch(
          setNotification({
            text: t('notification.stake_lower_upper')
              .replaceAll('${symbol}', settings.account.symbol)
              .replace('${min}', min)
              .replace('${max}', max),
            type: status.error,
          }),
        )
      }
    }
  }, [receivedMessage])

  useEffect(() => {
    response && a()
  }, [response])

  // useEffect(() => {
  //   update()
  // }, [betslip])

  // useEffect(() => {
  //   checkType()

  //   if (betslip.length) {
  //     dispatch(setForecast({}))
  //     if (type === 0) {
  //       dispatch(setStake(singleHandler()))
  //     } else {
  //       dispatch(setStake(systemHandler()))
  //     }
  //   }
  // }, [betslip, type])

  useEffect(() => {
    checkType()

    if (betslip.length === 0 && stake.length === 0) {
      setDisabled(true)
      setInit(false)
      setChange(true)
    }

    if (betslip.length > 0) {
      // dispatch(setForecast({}))
      if (type === 0) {
        dispatch(setStake(singleHandler()))
      } else {
        dispatch(setStake(systemHandler()))
      }

      // dispatch(setTicket(0))
    }
    else {
      dispatch(setStake([]))
    }
  }, [betslip, type])

  return (
    <div className={style.block}>
      {response && 
        <div className={style.print}>
          <TicketPrint data={response} ref={componentRef} />
        </div>
      }
      {checkTicket && 
        <TicketModal id={false} action={setCheckTicket} />
      }
      <div className={style.body}>
        {
          isEmpty 
            ?
              <>
                {Object.prototype.hasOwnProperty.call(forecast, 'id') && <Forecast data={forecast} />}
                {betslip.length > 0 &&
                  <>
                    <Bets betslip={betslip} stake={stake} type={type} setInit={setInit} setDisabled={setDisabled} />
                    <Types type={type} setType={setType} disabled={disabled} />
                    <Stakes stake={stake} />
                  </>
                }
              </>
            :
              <div className={style.empty}>
                {settings.account.logo && <img src={settings.account.logo} width={200} height={80} alt="logo" loading="lazy" />}
                <div className={style.icon}>
                  <Icon id={'add'} />
                </div>
                <p>{t('notification.please_pick_up_bet')}</p>
              </div>
        }
      </div>
      {
        betslip.length > 0 &&
        <div className={style.total}>    
          <span>{t('interface.total_stake')}:</span>
          <strong>{settings.account.symbol} {calculateStakeSum(type === 0 ? betslip : stake, type, STAKE_TYPE)}</strong>
        </div>
      }
      <div className={style.footer}>
        <Button
          icon={'trash'}
          initial={[style.button]}
          classes={['red']}
          action={() => {
            dispatch(setStake([]))
            dispatch(deleteBetslip([]))
            dispatch(setForecast({}))
            dispatch(setTicket(0))
            setDisabled(true)
            setInit(false)
            setChange(true)
          }}
        />
        <Button
          icon={'search'}
          initial={[style.button]}
          classes={['green-dark']}
          action={() => {
            setCheckTicket(true)
          }}
        />
        {settings.business.reprint && (
          <Button
            icon={'repeat-print'}
            initial={[style.button]}
            classes={['blue']}
            action={() => {
              repeatPrint()
            }}
          />
        )}
        <Button
          icon={'print'}
          initial={[style.button]}
          loading={loading}
          classes={['olive']}
          action={() => {
            sendStake()
          }}
        />
      </div>
    </div>
  )
}

export default Betslip
