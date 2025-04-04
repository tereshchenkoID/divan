import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postData } from 'hooks/useRequest'

import classNames from 'classnames'

import { status } from 'constant/config'

import Keyboard from 'react-simple-keyboard'

import 'simple-keyboard/build/css/index.css'

import { getHostName } from 'helpers/getHostName'
import { setNotification } from 'store/HOME/actions/notificationAction'
import { setAuth } from 'store/actions/authAction'

import Button from 'components/Button'

import style from './index.module.scss'

const Login = () => {
  const dispatch = useDispatch()
  const { resize } = useSelector(state => state.resize)
  const [type, setType] = useState('password')
  const [show, setShow] = useState(false)
  // const [inputs, setInputs] = useState({
  //   login: 'cashier131',
  //   password: '1qaz2wsx',
  // })

  const [inputs, setInputs] = useState({
    login: '',
    password: '',
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
      `${getHostName()}/account/login`,
      JSON.stringify({
        login: inputs.login,
        password: inputs.password,
      }),
    ).then(json => {
      if (!json || json.code) {
        dispatch(setNotification({ text: 'Invalid password or login', type: status.error }))
      } else {
        localStorage.setItem('authToken', json.authToken)
        dispatch(setAuth(json.authToken))
      }
    })
  }

  return (
    <div className={style.block}>
      <form className={style.wrapper} onSubmit={handleSubmit} autoComplete="off">
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
            autoComplete="new-password"
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
            autoComplete="new-password"
          />
        </div>
        <div className={style.row}>
          <button
            className={style.toggle}
            type={'button'}
            onClick={() => {
              setType(type === 'password' ? 'text' : 'password')
            }}
          >
            {type === 'password' ? 'Show' : 'Hide'} password
          </button>
        </div>
        <div className={style.row}>
          {!resize && show && (
            <Button
              props={'submit'}
              text={'Keyboard hide'}
              initial={[style.button]}
              classes={['green']}
              action={() => {
                setShow(false)
              }}
            />
          )}
          <Button props={'submit'} text={'Login'} initial={[style.button]} classes={['green']} />
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
