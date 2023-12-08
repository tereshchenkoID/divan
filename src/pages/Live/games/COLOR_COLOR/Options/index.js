import React from "react";
import {useTranslation} from "react-i18next";

import style from './index.module.scss';

const Options = ({data}) => {
	const { t } = useTranslation()
	
	return (
        <>
			<div className={style.row}>
				<div className={style.cell}>{t('interface.max_delay')}</div>
				<div className={style.cell}>{data.statistics.delay[0].num}</div>
				<div className={style.cell}>{t('interface.most_frequent')}</div>
				<div className={style.cell}>{data.statistics.frequent[0].num}</div>
			</div>
        </>
    );
}

export default Options;
