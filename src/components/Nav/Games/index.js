import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Slider from 'react-slick'

import classNames from 'classnames'

import { getIcon } from 'helpers/getIcon'
import { setGame } from 'store/actions/gameAction'

import Icon from 'components/Icon'

import style from './index.module.scss'
import { setLive } from '../../../store/HOME/actions/liveAction'

const Games = () => {
  const dispatch = useDispatch()
  const { settings } = useSelector(state => state.settings)
  const { game } = useSelector(state => state.game)

  const init = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  }

  useEffect(() => {
    dispatch(setGame(settings.games[0]))
  }, [])

  return (
    <div className={style.block}>
      {game && (
        <Slider {...init}>
          {settings.games.map((el, idx) => (
            <div key={idx}>
              <button
                className={classNames(style.button, game.id === el.id && style.active)}
                aria-label={el.name}
                onClick={() => {
                  dispatch(setLive(0))
                  dispatch(setGame(el))
                }}
              >
                <div className={style.icon}>
                  <Icon id={getIcon(el.type)} />
                </div>
                <div className={style.text}>{el.name}</div>
              </button>
            </div>
          ))}
        </Slider>
      )}
    </div>
  )
}

export default Games
