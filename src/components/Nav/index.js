import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { setAuth } from 'store/actions/authAction'
import { setTicket } from 'store/HOME/actions/ticketAction'

import SettingsModal from 'pages/Home/modules/SettingsModal'
import ReportsModal from 'pages/Home/modules/ReportsModal'
import Button from 'components/Button'
import Clock from './Clock'
import Games from './Games'
import Account from './Account'

import style from './index.module.scss'

const Nav = () => {
  const dispatch = useDispatch()
  const { ticket } = useSelector(state => state.ticket)
  const { settings } = useSelector(state => state.settings)
  const [sm, setSm] = useState(false) // Settings Modal
  const [rm, setRm] = useState(false) // Reports Modal

  return (
    <nav className={style.block}>
      <Games />
      <div className={style.setting}>
        <Account />
        <Clock />
      </div>
      <div className={style.options}>
        <div className={style.option}>
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
          <div className={style.option}>
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
          <div className={style.option}>
            <Link to={`/viewer?authToken=${sessionStorage.getItem('authToken')}`} target={'_blank'} rel="noreferrer">
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
              sessionStorage.clear()
              dispatch(setAuth(false))
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
