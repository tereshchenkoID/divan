import {useTranslation} from "react-i18next";

import style from './index.module.scss';

const Search = ({setSearch}) => {
    const { t } = useTranslation()

    const onchangeInput = (data) => {
        setSearch(data.toLowerCase())
    }

    return (
        <div className={style.block}>
            <span className={style.icon}>
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.7 27.7l-7.4-7.5a10.3 10.3 0 1 0-8 3.8c2.5 0 4.8-.9 6.6-2.4l7.4 7.5zM5 13.7a8.3 8.3 0 1 1 8.3 8.4A8.3 8.3 0 0 1 5 13.7z"></path>
                </svg>
            </span>
            <input
                type={"text"}
                className={style.field}
                placeholder={t(`interface.search`)}
                onChange={(e) => {
                    onchangeInput(e.target.value)
                }}
            />
        </div>
    );
}

export default Search;
