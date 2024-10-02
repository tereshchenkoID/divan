import { useState } from 'react'
import { useSelector } from 'react-redux'

import classNames from 'classnames'

import Button from 'components/Button'
import TicketModal from 'pages/Home/modules/TicketModal'

import style from './index.module.scss'

const Ticket = ({ data, currency }) => {
  const { settings } = useSelector(state => state.settings)
  const [active, setActive] = useState(false)
  const isShow = settings.business.hide_ticket

  return (
    <div className={classNames(style.block, isShow && style.hide)}>
      {active && <TicketModal id={data.id} action={setActive} />}
      <div className={style.cell}>
        {!isShow && (
          <Button
            props={'submit'}
            icon={'info'}
            initial={[style.button]}
            classes={['red']}
            action={() => {
              setActive(true)
            }}
          />
        )}
      </div>
      <div className={classNames(style.cell, style.left)}>{isShow && data.id ? data.id.replace(/.{4}$/, '****') : data.id}</div>
      <div className={classNames(style.cell, style.right)}>
        {currency} {data.amount}
      </div>
      <div className={classNames(style.cell, style.right)}>{data.win ? `${currency} ${data.win}` : data.status}</div>
    </div>
  )
}

export default Ticket
