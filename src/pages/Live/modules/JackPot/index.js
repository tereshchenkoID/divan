import {hostnames} from "constant/config";
import {useState, useEffect} from "react";

import Slider from "react-slick";

import {getData} from "helpers/api";

import Banner from "./Banner";

import style from './index.module.scss';

const init = {
    fade: true,
    dots: false,
    arrows: false,
    autoplay: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 15000,
    slidesToShow: 1,
    slidesToScroll: 1
};

const JackPotWinner = () => {
    const token = sessionStorage.getItem('authToken')
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        getData(`${hostnames.PROD}/viewer/jackpots/${token}`).then((json) => {
            if (json.jackpots) {
                setData(json)
                setLoading(false)
            }
        })
    }, [loading]);
    
    useEffect(() => {
        const a = setInterval(() => {
            getData(`${hostnames.PROD}/viewer/jackpots/${token}`).then((json) => {
                if (json.jackpots) {
                    setData(json)
                }
            })
        },30000)
        
        return () => {
            clearInterval(a);
        }
    }, [data])
    
    if (loading) {
        return false
    }

    return (
        <div className={style.block}>
            <Slider {...init}>
                {
                    data.jackpots.map((el, idx) =>
                        <Banner
                            key={idx}
                            data={el}
                        />
                    )
                }
            </Slider>
        </div>
    );
}

export default JackPotWinner;
