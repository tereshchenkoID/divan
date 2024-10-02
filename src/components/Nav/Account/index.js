import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useSocket from 'hooks/useSocket'

import { time } from 'constant/config'

import { checkCmd } from 'helpers/checkCmd'
import { getToken } from 'helpers/getToken'
import { convertTime } from 'helpers/convertTime'

import { setBalance } from 'store/HOME/actions/balanceAction'

import Icon from 'components/Icon'
import ClearResults from './ClearResults'

import style from './index.module.scss'

const Account = () => {
  const dispatch = useDispatch()
  const { sendMessage } = useSocket()

  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState(new Date().getTime())
  const { delta } = useSelector(state => state.delta)
  const { balance } = useSelector(state => state.balance)
  const { isConnected, receivedMessage } = useSelector(state => state.socket)
  const britishNumberFormatter = new Intl.NumberFormat('en', { minimumFractionDigits: 2 })

  useEffect(() => {
    if (isConnected) {
      sendMessage({ cmd: `account/${getToken()}/balance` })

      const a = setInterval(() => {
        sendMessage({ cmd: `account/${getToken()}/balance` })
      }, time.UPDATE)

      return () => {
        clearInterval(a)
      }
    } else {
      dispatch(setBalance()).then(() => {
        setLoading(false)
      })

      const a = setInterval(() => {
        dispatch(setBalance())
      }, time.UPDATE)

      return () => {
        clearInterval(a)
      }
    }
  }, [isConnected])

  useEffect(() => {
    if (receivedMessage !== '' && checkCmd('balance', receivedMessage.cmd)) {
      dispatch(setBalance(receivedMessage))
      setLoading(false)
    }
  }, [receivedMessage])

  useEffect(() => {
    setInterval(() => {
      setDate(new Date().getTime())
    }, 1000)
  }, [])

  return (
    <div className={style.block}>
      {!loading && balance && (
        <>
          <div className={style.cell}>
            <div className={style.icon}>
              <Icon id={'user'} />
            </div>
            <div className={style.text}>{balance.username || 'user'}</div>
          </div>
          <div className={style.cell}>
            <div className={style.icon}>
              <Icon id={'money'} />
            </div>
            <div className={style.text}>
              {balance.account.symbol || '$'} {britishNumberFormatter.format(balance.account.balance)}
            </div>
          </div>
          <div className={style.cell}>
            <div className={style.icon}>
              <Icon id={'clock'} />
            </div>
            <div className={style.text}>{convertTime(date, delta)}</div>
            <ClearResults date={date + 6000} />
          </div>
        </>
      )}
    </div>
  )
}

export default Account
