import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import classNames from 'classnames'

import Button from 'components/Button'
import Settlement from './Settlement'
import General from './General'
import Daily from './Daily'

import style from './index.module.scss'

const ReportsModal = ({ action }) => {
  const { t } = useTranslation()
  const { settings } = useSelector(state => state.settings)
  const [active, setActive] = useState(settings.business.reports ? 0 : 2)

  return (
    <div className={style.block}>
      <div className={style.wrapper}>
        <div className={style.header}>
          <p>Financial reports</p>
          <div className={classNames(style.button, style.sm)}>
            <Button
              type={'red'}
              size={'sm'}
              icon={'close'}
              action={() => {
                action(false)
              }}
            />
          </div>
        </div>
        <div className={style.body}>
          <div className={style.tab}>
            <div className={style.head}>
              {settings.business.reports && (
                <>
                  <button
                    className={classNames(style.link, active === 0 && style.active)}
                    onClick={() => {
                      setActive(0)
                    }}
                  >
                    {t('interface.general_overview')}
                  </button>
                  <button
                    className={classNames(style.link, active === 1 && style.active)}
                    onClick={() => {
                      setActive(1)
                    }}
                  >
                    {t('interface.dail_sums')}
                  </button>
                </>
              )}
              {settings.business.settlement && (
                <button
                  className={classNames(style.link, active === 2 && style.active)}
                  onClick={() => {
                    setActive(2)
                  }}
                >
                  {t('interface.settlement')}
                </button>
              )}
            </div>
            <div className={style.content}>
              {active === 0 && <General />}
              {active === 1 && <Daily />}
              {active === 2 && <Settlement />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportsModal
