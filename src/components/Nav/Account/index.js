import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {setBalance} from "store/actions/balanceAction";

import Icon from "components/Icon";

import style from './index.module.scss';

const Account = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const {balance} = useSelector((state) => state.balance)
    const britishNumberFormatter = new Intl.NumberFormat('en',{ minimumFractionDigits: 2 });

    useEffect(() => {
        dispatch(setBalance()).then(() => {
            setLoading(false)
        })

        const a = setInterval(() => {
            dispatch(setBalance())
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
                        <div>{balance.username}</div>
                    </div>
                    <div className={style.cell}>
                        <div className={style.icon}>
                            <Icon id={'money'} />
                        </div>
                        <div>{balance.account.symbol} {britishNumberFormatter.format(balance.account.balance)}</div>
                    </div>
                </>
            }
        </div>
    );
}

export default Account;
