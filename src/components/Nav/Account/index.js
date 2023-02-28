import {useEffect, useState} from "react";

import fetchData from "helpers/api";

import Icon from "components/Icon";

import style from './index.module.scss';

const Account = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const getData = () => {
        fetchData('client/getFeed/balance/').then((json) => {
            setData(json)
            setLoading(false)
        })
    }

    useEffect(() => {
        getData()

        const a = setInterval(() => {
            getData()
        },30000)

        return () => {
            clearInterval(a);
        }
    }, []);

    return (
        <div className={style.block}>
            {
                !loading &&
                <>
                    <div className={style.cell}>
                        <div className={style.icon}>
                            <Icon id={'user'} />
                        </div>
                        <div>{data.username}</div>
                    </div>
                    <div className={style.cell}>
                        <div className={style.icon}>
                            <Icon id={'dollar'} />
                        </div>
                        <div>[{data.account.currency}] - {data.account.balance}</div>
                    </div>
                </>
            }
        </div>
    );
}

export default Account;
