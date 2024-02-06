import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {setGame} from "store/actions/gameAction";

import {getIcon} from "helpers/getIcon";

import Icon from "components/Icon";

import style from './index.module.scss';

const Games = ({action}) => {
  const dispatch = useDispatch()
  const {settings} = useSelector((state) => state.settings)

  if (!settings) {
    return false
  }

  return (
    <div className={style.block}>
      <div
        className={style.shadow}
        onClick={() => {
          action(false)
        }}
      />
      <div className={style.content}>
        {
          settings.games.map((el, idx) =>
            <Link
              key={idx}
              to={'/live'}
              className={style.button}
              aria-label={el.name}
              onClick={() => {
                dispatch(setGame(el))
                localStorage.setItem('game', JSON.stringify(el))
                window.location.reload()
              }}
            >
              <div className={style.icon}>
                <Icon id={getIcon(el.type)} />
              </div>
              <div className={style.text}>{el.name}</div>
            </Link>
          )
        }
      </div>
    </div>
  );
}

export default Games;
