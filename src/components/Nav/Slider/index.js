import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Navigation } from "swiper";
import 'swiper/css';

import classNames from "classnames";

import {getIcon} from "helpers/getIcon";
import {setGame} from "store/actions/gameAction";

import Icon from "components/Icon";

import style from './index.module.scss';

const Slider = () => {
    const dispatch = useDispatch()
    const {settings} = useSelector((state) => state.settings)
    const {game} = useSelector((state) => state.game)

    useEffect(() => {
        dispatch(setGame(settings.games[0].id))
    }, []);

    return (
        <div className={style.block}>
            <Swiper
                slidesPerView={7}
                spaceBetween={10}
                modules={[FreeMode, Pagination, Navigation]}
            >
                {
                    settings.games.map((el, idx) =>
                        <SwiperSlide
                            key={idx}
                        >
                            <button
                                className={
                                    classNames(
                                        style.button,
                                        game === el.id && style.active
                                    )
                                }
                                aria-label={el.name}
                                onClick={() => {
                                    dispatch(setGame(el.id))
                                }}
                            >
                                <div className={style.icon}>
                                    <Icon id={getIcon(el.type)} />
                                </div>
                                <div className={style.text}>
                                    {el.name}
                                </div>
                            </button>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </div>
    );
}

export default Slider;
