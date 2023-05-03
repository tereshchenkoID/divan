import {useTranslation} from "react-i18next";

import style from './index.module.scss';

const SkipModal = ({action}) => {
    const { t } = useTranslation()

    return (
        <div className={style.block}>
            <button
                className={style.button}
                onClick={() => {
                    action()
                }}
            >
                {t('interface.skip_next_game')}
            </button>
        </div>
    );
}

export default SkipModal;
