import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useReactToPrint } from 'react-to-print'
import { useTranslation } from 'react-i18next'
import { getData, postData } from 'hooks/useRequest'
import useSocket from 'hooks/useSocket'
import i18n from 'i18next'

import { status, printMode, oddsType } from 'constant/config'

import classNames from 'classnames'

import { checkCmd } from 'helpers/checkCmd'
import { getToken } from 'helpers/getToken'

import { deleteBetslip } from 'store/HOME/actions/betslipAction'
import { setNotification } from 'store/HOME/actions/notificationAction'

import { TicketPrint } from 'pages/Home/modules/TicketPrint'
import Button from 'components/Button'
import Toggle from 'components/Toggle'
import Password from './Password'

import style from './index.module.scss'

const SettingsModal = ({ action }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { sendMessage } = useSocket()
  const { isConnected, receivedMessage } = useSelector(state => state.socket)

  const { settings } = useSelector(state => state.settings)
  const [response, setResponse] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const printingRef = useRef(0)
  const stakeRef = useRef(0)
  const printRef = useRef('0')
  const componentRef = useRef()
  const [sound, setSound] = useState(settings.account.mode)
  const [video, setVideo] = useState(settings.account.sound)

  const save = (ref, idx, value = null) => {
    if (ref === stakeRef) {
      dispatch(deleteBetslip([]))
    }

    if (isConnected) {
      sendMessage({ cmd: `account/${getToken()}/config`, payload: { [idx]: ref.current.value } })
    } else {
      postData(
        '/config',
        JSON.stringify({
          [idx]: ref ? ref.current.value : value,
        }),
      ).then(json => {
        if (json.code === 'OK') {
          dispatch(setNotification({ text: t('notification.saved'), type: status.success }))
        } else {
          dispatch(setNotification({ text: t('notification.something_wrong'), type: status.error }))
        }
      })
    }
  }

  const print = ref => {
    if (isConnected) {
      sendMessage({ cmd: `account/${getToken()}/details/${ref.current.value}` })
    } else {
      getData(`/details/${ref.current.value}`).then(json => {
        if (Object.prototype.hasOwnProperty.call(json, 'stake')) {
          if (settings.print.mode === printMode.WEB_PRINT && settings.print.payout) {
            setResponse(json)
          }
        } else {
          dispatch(setNotification({ text: t('notification.ticket_not_found'), type: status.error }))
        }
      })
    }
  }

  useEffect(() => {
    if (receivedMessage !== '' && checkCmd('details', receivedMessage.cmd)) {
      if (Object.prototype.hasOwnProperty.call(receivedMessage, 'stake')) {
        if (receivedMessage.stake.id === printRef.current.value) {
          if (settings.print.mode === printMode.WEB_PRINT && settings.print.payout) {
            setResponse(receivedMessage)
          }
        }
      } else {
        dispatch(setNotification({ text: t('notification.ticket_not_found'), type: status.error }))
      }
    } else if (receivedMessage !== '' && checkCmd('config', receivedMessage.cmd)) {
      if (receivedMessage.code === 'OK') {
        dispatch(setNotification({ text: t('notification.saved'), type: status.success }))
      } else {
        dispatch(setNotification({ text: t('notification.something_wrong'), type: status.error }))
      }
    }
  }, [receivedMessage])

  const a = useReactToPrint({
    content: () => componentRef.current,
  })

  useEffect(() => {
    response && a()
  }, [response])

  return (
    <div className={style.block}>
      {response && (
        <div className={style.print}>
          <TicketPrint data={response} ref={componentRef} />
        </div>
      )}
      <div className={style.wrapper}>
        <div className={style.header}>
          <p>{t('interface.general_settings')}</p>
          <Button
            icon={'close'}
            initial={[style.button]}
            classes={['red']}
            action={() => {
              action(false)
            }}
          />
        </div>
        <div className={style.body}>
          <div className={style.container}>
            <div className={classNames(style.table, style.sm)}>
              <div className={style.row}>
                <div>{t('interface.username')}</div>
                <div>{settings.username}</div>
                <div />
              </div>
              <div className={style.row}>
                <div>{t('interface.language')}</div>
                <div>{i18n.language}</div>
                <div />
              </div>
              <div className={style.row}>
                <div>{t('interface.password')}</div>
                <div>
                  <button
                    className={style.toggle}
                    onClick={() => {
                      setShowPassword(!showPassword)
                    }}
                  >
                    {t('interface.change_password')}
                  </button>
                </div>
                <div />
              </div>
              {showPassword && <Password action={setShowPassword} />}
            </div>
          </div>
          <div className={style.container}>
            <div className={style.title}>
              <span>{t('interface.settings')}</span>
            </div>
            <div className={style.table}>
              <div className={style.row}>
                <div>{t('interface.printing_mode')}</div>
                <div>
                  <select className={style.select} ref={printingRef} defaultValue={settings.print.mode}>
                    <option value={printMode.POS}>{t('interface.pos_not_installed')}</option>
                    <option value={printMode.WEB_PRINT}>{t('interface.web_print')}</option>
                    <option value={printMode.DISABLED}>{t('interface.disabled')}</option>
                  </select>
                </div>
                <div>
                  <Button
                    icon={'save'}
                    initial={[style.button]}
                    classes={['green']}
                    action={() => {
                      save(printingRef, 'printMode')
                    }}
                  />
                </div>
              </div>
              <div className={style.row}>
                <div>{t('interface.stake_mode')}</div>
                <div>
                  <select className={style.select} ref={stakeRef} defaultValue={settings.betting.type}>
                    <option value={oddsType.PER_BET}>{t('interface.per_bet')}</option>
                    <option value={oddsType.PER_GROUP}>{t('interface.per_group')}</option>
                  </select>
                </div>
                <div>
                  <Button
                    icon={'save'}
                    initial={[style.button]}
                    classes={['green']}
                    action={() => {
                      save(stakeRef, 'betMode')
                    }}
                  />
                </div>
              </div>
              <div className={style.row}>
                <div>{t('interface.reprint_ticket')}</div>
                <div>
                  <input type={'number'} className={style.input} ref={printRef} />
                </div>
                <div>
                  <Button
                    icon={'repeat-print'}
                    initial={[style.button]}
                    classes={['green']}
                    action={() => {
                      print(printRef)
                    }}
                  />
                </div>
              </div>
              <div className={style.row}>
                <div>{t('interface.video')}</div>
                <div>
                  <Toggle
                    data={video}
                    action={() => {
                      setVideo(video === '1' ? '0' : '1')
                      save(null, 'mode', video === '1' ? '0' : '1')
                    }}
                  />
                </div>
              </div>
              <div className={style.row}>
                <div>{t('interface.volume')}</div>
                <div>
                  <Toggle
                    data={sound}
                    action={() => {
                      setSound(sound === '1' ? '0' : '1')
                      save(null, 'sound', sound === '1' ? '0' : '1')
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal
