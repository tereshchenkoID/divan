import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import {getData} from "helpers/api";

import Loader from "components/Loader";
import Alert from "modules/Alert";
import Ticket from "./Ticket";

import style from './index.module.scss';

const Tickets = () => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const {settings} = useSelector((state) => state.settings)

    useEffect(() => {
        getData(`/history`).then((json) => {
            setData(json)
            setLoading(false)
        })
    }, []);

    return (
        <div className={style.block}>
            <div className={style.row}>
                <div></div>
                <div>Ticker №</div>
                <div>Stake</div>
                <div>Payout</div>
            </div>
            {
                loading
                ?
                    <Loader
                        type={'block'}
                        background={'transparent'}
                    />
                :
                    data
                        ?
                            data.tickets.map((el, idx) =>
                                <div
                                    key={idx}
                                    className={style.item}
                                >
                                    <Ticket
                                        data={el}
                                        currency={settings.account.symbol}
                                    />
                                </div>
                            )
                        :
                            <div className={style.empty}>
                                <Alert
                                    text={'Tickets empty'}
                                    type={'default'}
                                />
                            </div>
            }
        </div>
    );
}

export default Tickets;
