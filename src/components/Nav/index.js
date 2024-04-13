import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

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

  const { t } = useTranslation()
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
        <Button
          props={'button'}
          text={t('interface.account')}
          initial={[style.account]}
          classes={['grey']}
          action={() => {
            setInfo(!info)
          }}
        />
      </div>
      <div className={classNames(style.setting, info && style.show)}>
        <Account />
      </div>
      <div className={style.options}>
        <div className={style.button}>
          <Button
            props={'button'}
            text={t('interface.betslip')}
            initial={[]}
            classes={['grey']}
            action={() => {
              setIsBetslip(!isBetslip)
            }}
          />
          {betslip.length > 0 && <span>{betslip.length}</span>}
        </div>
        <Button
          props={'button'}
          icon={'file-check'}
          initial={[style.option]}
          classes={['grey']}
          action={() => {
            dispatch(setTicket(ticket === 0 ? 1 : 0))
          }}
        />
        <Button
          props={'button'}
          icon={'diagram'}
          initial={[style.option]}
          classes={['grey']}
          action={() => {
            setRm(true)
          }}
        />
        {settings.business.reports && settings.business.reports && (
          <Button
            props={'button'}
            icon={'settings'}
            initial={[style.option, style.hide]}
            classes={['grey']}
            action={() => {
              setSm(true)
            }}
          />
        )}
        {settings.business.web_viewer && (
          <Link className={classNames(style.option, style.hide)} to={'/viewer'} target={'_blank'} rel="noreferrer">
            <Button type={'button'} size={'md'} initial={[style.option]} classes={['grey']} icon={'tv'} />
          </Link>
        )}
        <Button
          props={'button'}
          icon={'turn-off'}
          initial={[style.option]}
          classes={['grey']}
          action={() => {
            dispatch(setAuth(null))
            localStorage.removeItem('authToken')
          }}
        />
      </div>
      {sm && <SettingsModal action={setSm} />}
      {rm && <ReportsModal action={setRm} />}
    </nav>
  )
}

export default Nav
