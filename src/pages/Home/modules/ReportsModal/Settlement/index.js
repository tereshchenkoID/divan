import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useReactToPrint } from 'react-to-print'
import { getData } from 'hooks/useRequest'
import useSocket from 'hooks/useSocket'

import { MD5 } from 'crypto-js'

import { status, printMode } from 'constant/config'

import classNames from 'classnames'

import { setNotification } from 'store/HOME/actions/notificationAction'

import { checkCmd } from 'helpers/checkCmd'
import { getToken } from 'helpers/getToken'

import { StatsPrint } from './StatsPrint'
import Button from 'components/Button'
import Table from './Table'

import style from './index.module.scss'

const Settlement = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { sendMessage } = useSocket()
  const { isConnected, receivedMessage } = useSelector(state => state.socket)
  const { settings } = useSelector(state => state.settings)

  const [data, setData] = useState(null)
  const [preview, setPreview] = useState(false)
  const [active, setActive] = useState('staff')
  const [password, setPassword] = useState('')
  const componentRef = useRef()

  const a = useReactToPrint({
    content: () => componentRef.current,
  })

  const handleSubmit = () => {
    if (active === 'master' && password.length === 0) {
      dispatch(setNotification({ text: t('notification.password_is_blank'), type: status.error }))
      return
    }

    const type = active === 'master' ? `${active}/${MD5(password).toString()}` : active

    if (isConnected) {
      sendMessage({ cmd: `account/${getToken()}/settlement/${type}` })
    } else {
      getData(`/settlement/${type}`).then(json => {
        setData(null)

        if (active === 'master') {
          if (json.code) {
            dispatch(setNotification({ text: t('notification.password_dont_match'), type: status.error }))
          } else {
            setData(json)
          }
        } else {
          if (json) {
            setData(json)
          }
        }
      })
    }
  }

  useEffect(() => {
    if (receivedMessage !== '' && checkCmd('settlement', receivedMessage.cmd)) {
      setData(null)

      if (active === 'master') {
        if (receivedMessage.code) {
          dispatch(setNotification({ text: t('notification.password_dont_match'), type: status.error }))
        } else {
          setData(receivedMessage)
        }
      } else {
        if (receivedMessage) {
          setData(receivedMessage)
        }
      }
    }
  }, [receivedMessage])

  const handleForm = e => {
    e.preventDefault()
    handleSubmit()
  }

  const handlePrint = () => {
    const type = active === 'master' ? `${active}/${MD5(password).toString()}` : active

    getData(`/settlement/${type}/print`).then(json => {
      if (json) {
        setData(json)

        if (settings.print.mode === printMode.POS) {
          window.printAction(JSON.stringify(json), 1)
        }
        if (settings.print.mode === printMode.WEB_PRINT) {
          a()
        }
      }
    })
  }

  const toggle = id => {
    setData(null)
    setPreview(false)
    setActive(id)
  }

  return (
    <div className={style.block}>
      <div className={style.header}>
        <button
          className={classNames(style.link, active === 'staff' && style.active)}
          onClick={() => {
            toggle('staff')
          }}
        >
          {t('interface.staff')}
        </button>
        <button
          className={classNames(style.link, active === 'master' && style.active)}
          onClick={() => {
            toggle('master')
          }}
        >
          {t('interface.master')}
        </button>
      </div>
      <div className={style.body}>
        {data && (
          <div className={style.stats}>
            <div className={style.print}>
              <StatsPrint data={data} ref={componentRef} />
            </div>
            <Table data={data} />
          </div>
        )}
        <div className={style.options}>
          {active === 'staff' && (
            <Button
              props={'button'}
              text={preview ? t('interface.settlement') : t('interface.preview')}
              initial={[style.button]}
              classes={['green']}
              action={() => {
                preview ? handlePrint() : handleSubmit()
                setPreview(true)
              }}
            />
          )}
          {active === 'master' && (
            <>
              {
                !data ?
                  <form className={style.form} onSubmit={handleForm}>
                    <input
                      type={'password'}
                      className={style.field}
                      placeholder={t('interface.password')}
                      onChange={e => {
                        setPassword(e.target.value || '')
                      }}
                      defaultValue={password}
                    />
                    <Button props={'submit'} text={t('interface.login')} initial={[style.button]} classes={['green']} />
                  </form>
                :
                  <Button
                    props={'button'}
                    text={t('interface.settlement')}
                    initial={[style.button]}
                    classes={['green']}
                    action={() => {
                      handlePrint()
                      setPreview(true)
                    }}
                  />
              }
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settlement
