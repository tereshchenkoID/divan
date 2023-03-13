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
        dispatch(setGame(settings.u[0].c))
    }, []);

    return (
        <div className={style.block}>
            <Swiper
                slidesPerView={7}
                spaceBetween={10}
                modules={[FreeMode, Pagination, Navigation]}
            >
                {
                    settings.u.map((el, idx) =>
                        <SwiperSlide
                            key={idx}
                        >
                            <button
                                className={
                                    classNames(
                                        style.button,
                                        game === el.c && style.active
                                    )
                                }
                                aria-label={el.e}
                                onClick={() => {
                                    dispatch(setGame(el.c))
                                }}
                            >
                                <div className={style.icon}>
                                    <Icon id={getIcon(el.a)} />
                                </div>
                                <div className={style.text}>
                                    {el.e}
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
