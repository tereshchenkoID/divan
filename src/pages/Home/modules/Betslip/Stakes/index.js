import {useTranslation} from "react-i18next";

import Stake from "./Stake";

import style from './index.module.scss';

const Stakes = ({ stake }) => {
    const { t } = useTranslation()

    return (
        <div className={style.block}>
            <div className={style.thead}>
                <div className={style.tr}>
                    <div className={style.th}>{t('interface.gr')}</div>
                    <div className={style.th}>{t('interface.combi')}</div>
                    <div className={style.th}>
                        <div className={style.th}>{t('interface.odds')}</div>
                        <div className={style.tr}>
                            <div className={style.th}>{t('interface.min')}</div>
                            <div className={style.th}>{t('interface.max')}</div>
                        </div>
                    </div>
                    <div className={style.th}>{t('interface.stake')} / {t('interface.bet')}</div>
                </div>
            </div>
            <div className={style.tbody}>
                {
                    stake.map((el, idx) =>
                        <div
                            key={idx}
                            className={style.item}
                        >
                            <Stake data={el} />
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Stakes;
