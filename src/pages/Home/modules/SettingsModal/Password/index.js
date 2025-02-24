import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { postData } from 'hooks/useRequest'
import useSocket from 'hooks/useSocket'

import { status } from 'constant/config'

import { checkCmd } from 'helpers/checkCmd'
import { getToken } from 'helpers/getToken'

import { setNotification } from 'store/HOME/actions/notificationAction'

import Button from 'components/Button'

import style from './index.module.scss'

const Password = ({ action }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { sendMessage } = useSocket()
  const { isConnected, receivedMessage } = useSelector(state => state.socket)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [type, setType] = useState('password')

  const generatePassword = () => {
    const password = Math.random().toString(36).slice(-8)
    setNewPassword(password)
    setConfirmPassword(password)
    setType('text')
  }

  const checkNewPassword = () => {
    if (newPassword === confirmPassword && oldPassword.length > 4) {
      if (isConnected) {
        sendMessage({
          cmd: `account/${getToken()}/password`,
          password: oldPassword,
          old_password: newPassword,
        })
      } else {
        postData(
          '/password',
          JSON.stringify({
            password: oldPassword,
            old_password: newPassword,
          }),
        ).then(json => {
          if (json.hasOwnProperty('data')) {
            dispatch(setNotification({ text: t('notification.old_password_invalid'), type: status.error }))
          } else {
            dispatch(setNotification({ text: t('notification.password_changed'), type: status.success }))
          }
        })
      }
    } else if (oldPassword.length < 4) {
      dispatch(setNotification({ text: t('notification.type_old_password'), type: status.error }))
    } else {
      dispatch(setNotification({ text: t('notification.password_dont_match'), type: status.error }))
    }
  }

  useEffect(() => {
    if (receivedMessage !== '' && checkCmd('password', receivedMessage.cmd)) {
      if (receivedMessage.hasOwnProperty('code')) {
        dispatch(setNotification({ text: t('notification.old_password_invalid'), type: status.error }))
      } else {
        dispatch(setNotification({ text: t('notification.password_changed'), type: status.success }))
      }
    }
  }, [receivedMessage])

  return (
    <div className={style.block}>
      <div className={style.row}>
        <div>
          <p>{t('interface.old_password')}</p>
        </div>
        <div>
          <input className={style.input} type={type} value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
        </div>
        <div />
      </div>
      <div className={style.row}>
        <div>
          <p>{t('interface.new_password')}</p>
        </div>
        <div>
          <input className={style.input} type={type} value={newPassword} onChange={e => setNewPassword(e.target.value)} />
        </div>
        <div>
          <button
            className={style.button}
            onClick={() => {
              setType(type === 'password' ? 'text' : 'password')
            }}
          >
            {type === 'password' ? t('interface.show') : t('interface.hide')} {t('interface.password')}
          </button>
        </div>
      </div>
      <div className={style.row}>
        <div>
          <p>{t('interface.confirm_password')}</p>
        </div>
        <div>
          <input className={style.input} type={type} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        </div>
        <div>
          <button
            className={style.button}
            onClick={() => {
              generatePassword()
            }}
          >
            {t('interface.generate_password')}
          </button>
        </div>
      </div>
      <div className={style.row}>
        <div />
        <div className={style.actions}>
          <Button
            props={'button'}
            icon={'save'}
            initial={[style.action]}
            classes={['green-dark']}
            action={() => {
              checkNewPassword()
            }}
          />
          <Button
            props={'button'}
            icon={'close'}
            initial={[style.action]}
            classes={['red']}
            action={() => {
              action(false)
            }}
          />
        </div>
        <div />
      </div>
    </div>
  )
}

export default Password
