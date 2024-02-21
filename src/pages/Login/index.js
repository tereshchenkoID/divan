import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import { hostnames, status } from 'constant/config'

import Keyboard from 'react-simple-keyboard'

import 'simple-keyboard/build/css/index.css'

import { postData } from 'helpers/api'
import { setNotification } from 'store/HOME/actions/notificationAction'
import { setSettings } from 'store/actions/settingsAction'
import { setAuth } from 'store/actions/authAction'

import Button from 'components/Button'
import Notification from 'pages/Home/modules/Notification'

import style from './index.module.scss'

const Login = () => {
  const dispatch = useDispatch()
  const { notification } = useSelector(state => state.notification)
  const [type, setType] = useState('password')
  const [show, setShow] = useState(false)
  const [inputs, setInputs] = useState({
    login: 'cashier131',
    password: '1qaz2wsx',
  })
  const [layoutName, setLayoutName] = useState('default')
  const [inputName, setInputName] = useState('default')
  const keyboard = useRef()

  const onChangeAll = inputs => {
    setInputs({ ...inputs })
  }

  const handleShift = () => {
    const newLayoutName = layoutName === 'default' ? 'shift' : 'default'
    setLayoutName(newLayoutName)
  }

  const onKeyPress = button => {
    if (button === '{shift}' || button === '{lock}') handleShift()
    if (button === '{enter}') handleSubmit()
  }

  const onChangeInput = event => {
    const inputVal = event.target.value

    setInputs({
      ...inputs,
      [inputName]: inputVal,
    })

    keyboard.current.setInput(inputVal)
  }

  const getInputValue = inputName => {
    return inputs[inputName] || ''
  }

  const handleSubmit = async event => {
    event && event.preventDefault()

    postData(
      `${hostnames.PROD}/account/login`,
      JSON.stringify({
        login: inputs.login,
        password: inputs.password,
      }),
    ).then(json => {
      if (json) {
        sessionStorage.setItem('authToken', json.authToken)
        dispatch(setAuth(json.authToken))

        dispatch(setSettings()).then(json => {
          dispatch(setNotification({ text: json.account.notification, type: status.info }))
        })
      } else {
        dispatch(setNotification({ text: 'Invalid password or login', type: status.error }))
      }
    })
  }

  return (
    <div className={style.block}>
      {notification && <Notification text={notification} />}
      <form className={style.wrapper} onSubmit={handleSubmit}>
        <div className={style.row}>
          <p className={style.title}>AUTHENTICATION</p>
        </div>
        <div className={style.row}>
          <input
            id={'login'}
            value={getInputValue('login')}
            onChange={onChangeInput}
            onFocus={() => {
              !show && setShow(true)
              setInputName('login')
            }}
            type={'text'}
            className={style.field}
            placeholder={'Username'}
          />
        </div>
        <div className={style.row}>
          <input
            id={'password'}
            value={getInputValue('password')}
            onChange={onChangeInput}
            onFocus={() => {
              !show && setShow(true)
              setInputName('password')
            }}
            type={type}
            className={style.field}
            placeholder={'Password'}
          />
        </div>
        <div className={style.row}>
          <button
            className={style.toggle}
            onClick={() => {
              setType(type === 'password' ? 'text' : 'password')
            }}
            type={'button'}
          >
            {type === 'password' ? 'Show' : 'Hide'} password
          </button>
        </div>
        <div className={style.row}>
          {show && (
            <div className={style.button}>
              <Button
                type={'green'}
                size={'md'}
                text={'Keyboard hide'}
                props={'button'}
                action={() => {
                  setShow(false)
                }}
              />
            </div>
          )}
          <div className={style.button}>
            <Button type={'green'} size={'md'} text={'Login'} props={'submit'} />
          </div>
        </div>
      </form>
      <div className={classNames(style.keyboard, show && style.show)}>
        <Keyboard
          keyboardRef={r => (keyboard.current = r)}
          theme={'hg-theme-default custom'}
          inputName={inputName}
          layoutName={layoutName}
          onChangeAll={onChangeAll}
          onKeyPress={onKeyPress}
        />
      </div>
    </div>
  )
}

export default Login
