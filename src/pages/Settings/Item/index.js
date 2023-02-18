import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "helpers/localStorage";

import style from './index.module.scss';
import {useState} from "react";
import classNames from "classnames";

const Item = ({data}) => {
    const { i18n } = useTranslation()
    const {setLocalStorage} = useLocalStorage()
    const [language, setLanguage] = useState(localStorage.getItem('i18nextLng') || 'en')
    const navigate = useNavigate()

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        setLocalStorage('i18nextLng', language)
        setLanguage(language)
        navigate(-1)
    };

    return (
        <button
            className={
                classNames(
                    style.block,
                    language === data.isocode && style.active
                )
            }
            onClick={() => {
                changeLanguage(data.isocode)
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
