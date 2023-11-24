import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import style from './index.module.scss';

const Jackpot = () => {
    const { t } = useTranslation()
    const {tv} =  useSelector((state) => state.tv)
    
    if (!tv.event) {
        return false
    }
    
    return (
        <div className={style.block}>
            <div className={style.decor}>
                <img
                    src={`/img/decor/LIVE/TIMER/light.png`}
                    alt="Decor"
                />
            </div>
            <div className={style.title}>jackpot winner</div>
            <div className={style.id}>#{tv.event.id}</div>
        </div>
    );
}

export default Jackpot;
