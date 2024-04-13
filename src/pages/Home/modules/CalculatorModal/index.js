import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Button from 'components/Button'

import style from './index.module.scss'

const CalculatorModal = ({ data, action, toggle }) => {
  const [date, setDate] = useState(data)
  const { t } = useTranslation()
  const { settings } = useSelector(state => state.settings)

  const set = n => {
    setDate(n)
  }

  const handleClickSymbol = n => {
    if (n === '0') {
      if (date === 0) {
        setDate(0)
      } else {
        set(`${date}${n}`)
      }
    }

    if (n === '.') {
      if (date === 0) {
        set(`0${n}`)
      } else {
        if (date.toString().indexOf(n) === -1) {
          set(`${date}${n}`)
        }
      }
    }
  }

  const handleClickNumber = n => {
    set(`${date}${n}`)
  }

  const handleClickStake = n => {
    if (date.toString().indexOf('.') !== -1) {
      const a = date.toString().split('.')
      a[0] = parseInt(a[0]) + n
      a[1] = a[1] === '' ? 0 : a[1]
      const r = a.join('.')

      set(r)
    } else {
      set(parseInt(date, 10) + n)
    }
  }

  const handleClickDelete = () => {
    const n = date.toString()
    const r = n.slice(0, n.length - 1) || 0

    set(r)
  }

  const handleTextChange = val => {
    const regex = /[^0-9.]|(?<=\..*)\./g
    if (!regex.test(val)) {
      set(val)
    }
  }

  useEffect(() => {
    if (date.length > 1) {
      if (date[0] === '0' && date[1] !== '.') {
        set(date.substr(1))
      }
    }

    if (date === '') {
      set(0)
    }
  }, [date])

  return (
    <div className={style.block}>
      <div className={style.content}>
        <div className={style.header}>
          <input
            type={'text'}
            className={style.field}
            value={date}
            onChange={e => {
              handleTextChange(e.target.value)
            }}
          />
          <Button
            props={'button'}
            text={'CA'}
            initial={[style.key]}
            classes={['grey']}
            action={() => {
              handleClickDelete()
            }}
          />
        </div>
        <div className={style.body}>
          <div className={style.keyboard}>
            <Button
              props={'button'}
              text={7}
              initial={[style.key]}
              classes={['green']}
              action={() => {
                handleClickNumber('7')
              }}
            />
            <Button
              props={'button'}
              text={8}
              initial={[style.key]}
              classes={['green']}
              action={() => {
                handleClickNumber('8')
              }}
            />
            <Button
              props={'button'}
              text={9}
              initial={[style.key]}
              classes={['green']}
              action={() => {
                handleClickNumber('9')
              }}
            />
            <Button
              props={'button'}
              text={4}
              initial={[style.key]}
              classes={['green']}
              action={() => {
                handleClickNumber('4')
              }}
            />
            <Button
              props={'button'}
              text={5}
              initial={[style.key]}
              classes={['green']}
              action={() => {
                handleClickNumber('5')
              }}
            />
            <Button
              props={'button'}
              text={6}
              initial={[style.key]}
              classes={['green']}
              action={() => {
                handleClickNumber('6')
              }}
            />
            <Button
              props={'button'}
              text={1}
              initial={[style.key]}
              classes={['green']}
              action={() => {
                handleClickNumber('1')
              }}
            />
            <Button
              props={'button'}
              text={2}
              initial={[style.key]}
              classes={['green']}
              action={() => {
                handleClickNumber('2')
              }}
            />
            <Button
              props={'button'}
              text={3}
              initial={[style.key]}
              classes={['green']}
              action={() => {
                handleClickNumber('3')
              }}
            />
            <Button
              props={'button'}
              text={'c'}
              initial={[style.key]}
              classes={['green']}
              action={() => {
                setDate(0)
              }}
            />
            <Button
              props={'button'}
              text={0}
              initial={[style.key]}
              classes={['green']}
              action={() => {
                handleClickSymbol('0')
              }}
            />
            <Button
              props={'button'}
              text={'.'}
              initial={[style.key]}
              classes={['green']}
              action={() => {
                handleClickSymbol('.')
              }}
            />
          </div>

          <div className={style.keys}>
            {Object.values(settings.betslip.steps).map((el, idx) => (
              <Button
                props={'button'}
                text={el}
                initial={[style.key]}
                classes={['green']}
                action={() => {
                  handleClickStake(el)
                }}
              />
            ))}
          </div>
        </div>
        <div className={style.footer}>
          <div className={style.keys}>
            <Button
              props={'button'}
              text={t('interface.close')}
              initial={[style.key]}
              classes={['red']}
              action={() => {
                toggle(false)
              }}
            />
            <Button
              props={'button'}
              text={t('interface.accept')}
              initial={[style.key]}
              classes={['green']}
              action={() => {
                action(parseFloat(date))
                toggle(false)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalculatorModal
