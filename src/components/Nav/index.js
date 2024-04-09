import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import { setAuth } from 'store/actions/authAction'
import { setTicket } from 'store/HOME/actions/ticketAction'

import SettingsModal from 'pages/Home/modules/SettingsModal'
import ReportsModal from 'pages/Home/modules/ReportsModal'
import Button from 'components/Button'
import Games from './Games'
import Account from './Account'

import style from './index.module.scss'

const Nav = ({ isBetslip, setIsBetslip }) => {
  const dispatch = useDispatch()
  const { ticket } = useSelector(state => state.ticket)
  const { betslip } = useSelector(state => state.betslip)
  const { settings } = useSelector(state => state.settings)
  const [sm, setSm] = useState(false) // Settings Modal
  const [rm, setRm] = useState(false) // Reports Modal
  const [info, setInfo] = useState(false)

  return (
    <nav className={style.block}>
      <Games />
      <div className={style.meta}>
        <div className={style.logo}>{settings.account.logo && <img src={settings.account.logo} alt="logo" loading="lazy" />}</div>
        <button
          className={classNames(style.button, style.alt)}
          type="button"
          onClick={() => {
            setInfo(!info)
          }}
        >
          Account
        </button>
      </div>
      <div className={classNames(style.setting, info && style.show)}>
        <Account />
      </div>
      <div className={style.options}>
        <button
          className={style.button}
          onClick={() => {
            setIsBetslip(!isBetslip)
          }}
          type="button"
        >
          Bet Slip
          {betslip.length > 0 && <span>{betslip.length}</span>}
        </button>
        <div className={classNames(style.option, !isBetslip && style.disabled)}>
          <Button
            type={'grey'}
            size={'md'}
            icon={'file-check'}
            action={() => {
              dispatch(setTicket(ticket === 0 ? 1 : 0))
            }}
          />
        </div>
        <div className={style.option}>
          <Button
            type={'grey'}
            size={'md'}
            icon={'diagram'}
            action={() => {
              setRm(true)
            }}
          />
        </div>
        {settings.business.reports && settings.business.reports && (
          <div className={classNames(style.option, style.hide)}>
            <Button
              type={'grey'}
              size={'md'}
              icon={'settings'}
              action={() => {
                setSm(true)
              }}
            />
          </div>
        )}
        {settings.business.web_viewer && (
          <div className={classNames(style.option, style.hide)}>
            <Link to={'/viewer'} target={'_blank'} rel="noreferrer">
              <Button type={'grey'} size={'md'} icon={'tv'} />
            </Link>
          </div>
        )}
        <div className={style.option}>
          <Button
            type={'grey'}
            size={'md'}
            icon={'turn-off'}
            action={() => {
              dispatch(setAuth(null))
              localStorage.removeItem('authToken')
            }}
          />
        </div>
      </div>
      {sm && <SettingsModal action={setSm} />}
      {rm && <ReportsModal action={setRm} />}
    </nav>
  )
}

export default Nav
