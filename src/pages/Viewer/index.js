import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import i18n from 'i18next'

import classNames from 'classnames'

import { gameType } from 'constant/config'

import { getIcon } from 'helpers/getIcon'
import { setGame } from 'store/actions/gameAction'
import { setSettings } from 'store/actions/settingsAction'
import { setAuth } from 'store/actions/authAction'

import Loader from 'components/Loader'
import Icon from 'components/Icon'

import style from './index.module.scss'

const Viewer = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { settings } = useSelector(state => state.settings)
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(false)
  const [theme, setTheme] = useState(false)

  useEffect(() => {
    dispatch(setSettings()).then(json => {
      if (json === -1) {
        localStorage.removeItem('authToken')
        dispatch(setAuth(null))
      } else {
        setTheme(json.theme)
        i18n.changeLanguage(json.account.language || 'en')
        setLoading(false)
      }
    })
  }, [])

  return (
    <div className={style.block}>
      {
        loading 
        ?
          <Loader />
        :
          <div 
            className={style.content}
            style={theme}
          >
            <button
              className={classNames(style.checkbox, active && style.active)}
              onClick={() => {
                setActive(!active)
              }}
            >
              <span></span>
              {t('notification.open_in_new_window')}
            </button>
            <div className={style.wrapper}>
              {settings.games.map((el, idx) => (
                <div key={idx}>
                  <Link
                    to={'/live'}
                    className={classNames(style.button, el.type === gameType.SPORT_PR && style.disabled)}
                    aria-label={el.name}
                    target={active ? '_blank' : '_self'}
                    onClick={() => {
                      dispatch(setGame(el))
                      localStorage.setItem('game', JSON.stringify(el))
                    }}
                  >
                    <div className={style.icon}>
                      <Icon id={getIcon(el.type)} />
                    </div>
                    <div className={style.text}>{el.name}</div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
      }
    </div>
  )
}

export default Viewer
