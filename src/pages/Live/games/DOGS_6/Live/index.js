import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import Loader from "components/Loader";

import style from './index.module.scss';

const Live = () => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])
    
    return (
        <>
            {
                loading
                    ?
                        <Loader
                            type={'block'}
                            background={'transparent'}
                        />
                    :
                        <div className={style.block}>
                            <div>{t('interface.live')}</div>
                        </div>
            }
        </>
        
    );
}

export default Live;
