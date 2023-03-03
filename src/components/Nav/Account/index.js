import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import {setDelta} from "store/actions/deltaAction";

import fetchData from "helpers/api";

import Icon from "components/Icon";

import style from './index.module.scss';

const Account = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const getData = () => {
        fetchData('client/getFeed/balance/').then((json) => {
            setData(json)
            dispatch(setDelta(json.timer))
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
