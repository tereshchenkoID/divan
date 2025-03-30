import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { getData } from 'hooks/useRequest'
import useSocket from 'hooks/useSocket'

import { checkCmd } from 'helpers/checkCmd'
import { getToken } from 'helpers/getToken'
import { setTicket } from 'store/HOME/actions/ticketAction'

import Loader from 'components/Loader'
import Alert from 'components/Alert'
import Button from 'components/Button'
import Ticket from './Ticket'

import style from './index.module.scss'

const Tickets = () => {
  const { t } = useTranslation()
  const { sendMessage } = useSocket()
  const dispatch = useDispatch()
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const { settings } = useSelector(state => state.settings)
  const { isConnected, receivedMessage } = useSelector(state => state.socket)

  useEffect(() => {
    if (isConnected) {
      sendMessage({ cmd: `account/${getToken()}/history` })
    } else {
      getData(`/history`).then(json => {
        setData(json)
        setLoading(false)
      })
    }
  }, [isConnected])

  useEffect(() => {
    if (receivedMessage !== '' && checkCmd('history', receivedMessage.cmd)) {
      setData(receivedMessage)
      setLoading(false)
    }
  }, [receivedMessage])

  return (
    <div className={style.block}>
      <div className={style.content}>
        <div className={style.header}>
          <p>{t('interface.tickets')}</p>
          <Button
            icon={'close'}
            initial={[style.button]}
            classes={['red']}
            action={() => {
              dispatch(setTicket(0))
            }}
          />
        </div>
        <div className={style.body}>
          <div className={style.row}>
            <div></div>
            <div>{t('interface.ticket')} №</div>
            <div>{t('interface.stake')}</div>
            <div>{t('interface.payout')}</div>
          </div>
          {loading ? (
            <Loader type={'block'} background={'transparent'} />
          ) : data ? (
            data.tickets.map((el, idx) => (
              <div key={idx} className={style.item}>
                <Ticket data={el} currency={settings.account.symbol} />
              </div>
            ))
          ) : (
            <div className={style.empty}>
              <Alert text={t('interface.tickets_empty')} type={'default'} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Tickets
