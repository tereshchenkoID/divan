import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { gameType, oddsType } from 'constant/config'

import { getIcon } from 'helpers/getIcon'
import { useOutsideClick } from 'hooks/useOutsideClick'
import { deleteBetslip } from 'store/HOME/actions/betslipAction'
import { setStake } from 'store/HOME/actions/stakeAction'

import Icon from 'components/Icon'
import Button from 'components/Button'

import style from './index.module.scss'

const getColor = (type, color) => {
  if (type === gameType.DOGS_6) {
    return `dog-${color.toLowerCase()}`
  } else if (type === gameType.HORSES_8_VR) {
    return `horse-${color.toLowerCase()}`
  }
  return color.toLowerCase()
}

const Bet = ({ id, data, betslip, type, setInit, setDisabled }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { settings } = useSelector(state => state.settings)
  const { stake } = useSelector(state => state.stake)
  const [edit, setEdit] = useState(false)
  const STAKE_TYPE = settings.betting.type

  const buttonRef = useRef(null)
  const blockRef = useRef(null)

  const getSingleStake = (stakes, c) => {
    const count = stakes.filter(item => item.type === gameType.FOOTBALL_LEAGUE).length;
    const s = (stake?.[0]?.stake || settings.betslip.single.min) / (count + c)
    return s.toFixed(2)
  }

  const updateStakes = (stakes) => {
    const isOnlyFootball = betslip.every(item => item.type === gameType.FOOTBALL_LEAGUE)
    const a = (STAKE_TYPE === oddsType.PER_GROUP && isOnlyFootball) ? stakes.map(item => ({ ...item, stake: getSingleStake(stakes, 0) })) : stakes;
    dispatch(deleteBetslip(a))
  }

  const removeBet = () => {
    const a = betslip.slice(0)
    a.splice(id, 1)

    if (betslip.length === 1) {
      setInit(false)
      setDisabled(true)
      dispatch(setStake([]))
    }

    updateStakes(a)
    // dispatch(deleteBetslip(a))
  }

  const updateBet = val => {
    let r
    const regex = /[^0-9.]|(?<=\..*)\./g
    const a = betslip.slice(0)

    if (!regex.test(val)) {
      r = val

      if (val.length > 1) {
        if (val[0] === '0' && val[1] !== '.') {
          r = val.substr(1)
        }
      }

      if (val === '') {
        r = 0
      }

      a[id].stake = r

      dispatch(deleteBetslip(a))
      setInit(true)
    }
  }

  const changeBet = val => {
    const a = betslip.slice(0)
    const f = data.type === 0 ? a[0] : a[id]
    let v

    if (val) {
      if (f.stake.toString().indexOf('.') !== -1) {
        const a = f.stake.split('.')
        a[0] = parseInt(a[0]) + parseInt(val)
        a[1] = a[1] === '' ? 0 : a[1]
        v = a.join('.')
      } else {
        v = parseInt(f.stake, 10) + parseInt(val, 10)
      }
    } else {
      v = 0
    }

    f.stake = v
    dispatch(deleteBetslip(a))
    setInit(true)
  }

  useOutsideClick(blockRef, buttonRef, setEdit, data)

  return (
    <div className={classNames(style.block, type === 0 ? style.lg : style.sm, style[data.type])} ref={blockRef}>
      <div className={style.bet}>
        <div>
          <div className={style.icon}>
            <Icon id={getIcon(data.type)} />
          </div>
        </div>
        {(data.type === gameType.FOOTBALL || data.type === gameType.FOOTBALL_LEAGUE) && (
          <div>
            <div className={style.meta}>
              {data.pos}.{data.teams.home.name}-{data.teams.away.name}
            </div>
          </div>
        )}
        <div className={style.market}>
          <span>
            {(data.type === gameType.FOOTBALL || data.type === gameType.FOOTBALL_LEAGUE) && `${data.market.replaceAll('_', ' ')}:${data.c || data.a}`}
            {(data.type === gameType.ROULETTE || data.type === gameType.ROULETTE_DELUXE) && (data.print || data.market).replaceAll('_', ' ').toLowerCase()}
            {data.type === gameType.COLOR_COLOR && data.print.replaceAll('_', '/')}
            {(data.type === gameType.KENO || data.type === gameType.DOGS_6 || data.type === gameType.HORSES_8_VR) && data.print}
          </span>
          {data.circles && (
            <div className={style.circles}>
              {data.circles.map((el, idx) => (
                <div
                  key={idx}
                  className={classNames(
                    style[data.type === gameType.DOGS_6 || data.type === gameType.HORSES_8_VR ? 'number' : 'circle'],
                    style.sm,
                    style[el.color ? getColor(data.type, el.color) : 'draw'],
                  )}
                >
                  {data.type === gameType.COLOR_COLOR && el.id.toString().length < 3 && el.id}
                  {data.type === gameType.KENO && el}
                  {data.type === gameType.DOGS_6 && el.id}
                  {data.type === gameType.HORSES_8_VR && el.id}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={style.odd}>{data.b}</div>
        {type === 0 && (
          <div>
            <input
              ref={buttonRef}
              type={'text'}
              className={style.field}
              placeholder={'100'}
              value={data.stake}
              onChange={e => {
                updateBet(e.target.value || 0)
              }}
              onFocus={() => {
                setEdit(true)
              }}
            />
          </div>
        )}
        <div>
          <Button
            icon={'close'}
            initial={[style.close]}
            classes={['red']}
            action={() => {
              removeBet()
            }}
          />
        </div>
      </div>
      {edit && (
        <div className={style.keyboard}>
          {Object.values(settings.betslip.steps).map((el, idx) => (
            <Button
              key={idx}
              text={el}
              initial={[style.key]}
              classes={['green']}
              action={() => {
                changeBet(el)
              }}
            />
          ))}
          <Button
            text={t('interface.clear')}
            initial={[style.key]}
            classes={['green']}
            action={() => {
              changeBet(null)
            }}
          />
        </div>
      )}
    </div>
  )
}

export default Bet
