import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import useSocket from "hooks/useSocket";

import {time} from 'constant/config'

import checkCmd from "helpers/checkCmd";

import {setBalance} from "store/actions/balanceAction";

import Icon from "components/Icon";

import style from './index.module.scss';

const Account = () => {
    const dispatch = useDispatch()
    const { sendMessage, checkSocket } = useSocket()

    const [loading, setLoading] = useState(true)
    const {balance} = useSelector((state) => state.balance)
    const {socket, receivedMessage} = useSelector((state) => state.socket);

    const britishNumberFormatter = new Intl.NumberFormat('en',{ minimumFractionDigits: 2 });

    useEffect(() => {
        if (checkSocket(socket)) {
            sendMessage({cmd:`account/${sessionStorage.getItem('authToken')}/balance`})

            const a = setInterval(() => {
                sendMessage({cmd:`account/${sessionStorage.getItem('authToken')}/balance`})
            }, time.UPDATE)

            return () => {
                clearInterval(a);
            }
        }
        else {
            dispatch(setBalance()).then(() => {
                setLoading(false)
            })

            const a = setInterval(() => {
                dispatch(setBalance())
            }, time.UPDATE)

            return () => {
                clearInterval(a);
            }
        }
    }, [socket]);

    useEffect(() => {
        if (receivedMessage !== '' && checkCmd('balance', receivedMessage.cmd)) {
            dispatch(setBalance(receivedMessage))
            setLoading(false)
        }
    }, [receivedMessage])


    return (
        <div className={style.block}>
            {
                !loading &&
                balance &&
                <>
                    <div className={style.cell}>
                        <div className={style.icon}>
                            <Icon id={'user'} />
                        </div>
                        <div className={style.text}>{balance.username || 'user'}</div>
                    </div>
                    <div className={style.cell}>
                        <div className={style.icon}>
                            <Icon id={'money'} />
                        </div>
                        <div className={style.text}>{balance.account.symbol || '$'} {britishNumberFormatter.format(balance.account.balance)}</div>
                    </div>
                </>
            }
        </div>
    );
}

export default Account;
