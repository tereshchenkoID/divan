import {useTranslation} from "react-i18next";

import classNames from "classnames";

import Slider from "react-slick";

import {getDateTime} from "helpers/getDateTime";

import style from './index.module.scss';

const init = {
    fade: true,
    dots: false,
    arrows: false,
    autoplay: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1
};

const Banner = ({data}) => {
    const { t } = useTranslation()
    const britishNumberFormatter = new Intl.NumberFormat("en", { minimumFractionDigits: 1 })

    return (
        <div
            className={
                classNames(
                    style.block,
                    style[data.type.toLowerCase()]
                )
            }
        >
            <div className={style.left}>
                <div>{data.type} {t('interface.jackpot')}</div>
                <div className={style.amount}>
                    <div className={style.price}>{britishNumberFormatter.format(data.amount)}</div>
                    <div className={style.symbol}>{data.currency}</div>
                </div>
            </div>
            <div className={style.right}>
                <div className={style.slider}>
                    <Slider {...init}>
                        {
                            data.date && <div>{getDateTime(Number(data.date), 1)}</div>
                        }
                        {
                            data.location && <div>{data.location}</div>
                        }
                    </Slider>
                </div>
                <div className={style.ticket}>#{data.ticket}</div>
            </div>
        </div>
    );
}

export default Banner;
