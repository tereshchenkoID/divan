import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

import style from './index.module.scss';

const Item = ({data}) => {
    const { i18n } = useTranslation();
    const navigate = useNavigate();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        localStorage.setItem('language', language)
    };

    return (
        <button
            className={style.block}
            onClick={() => {
                changeLanguage(data.cc.a2)
                navigate('/')
            }}
        >
            <span className={style.icon}>
                <img src={`https://img.sportradar.com/ls/crest/big/${data.cc.a2}.png`} alt={data.name} />
            </span>
            <span>{data.nativename}</span>
        </button>
    );
}

export default Item;
