import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import classNames from "classnames";

import {getIcon} from "helpers/getIcon";
import {getData} from "helpers/api";
import {getDateTime} from "helpers/getDateTime";

import Loader from "components/Loader";
import Icon from "components/Icon";
import Button from "components/Button";

import style from './index.module.scss';

const TicketModal = ({id, action}) => {
    const {settings} = useSelector((state) => state.settings)

    const [init, setInit] = useState(false)
    const [data, setData] = useState({})
    const [find, setFind] = useState(id || 0)
    const [step, setStep] = useState(id ? 1 : 0)

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [type, setType] = useState(0)

    const sendAction = (action) => {
        getData(`/${action}/${find}`).then((json) => {
            if (json) {
                setData(json)
            }
        })
    }

    const handleSubmit = (event) => {
        event && event.preventDefault();

        getData(`/details/${find}`).then((json) => {
            if (json) {
                setData(json)
                setStep(1)
                setLoading(false)
                setType(json.group.length > 0 ? 1 : 0)
            }
            else {
                setError(true)
            }
        })
    }

    useEffect(() => {
        if(step === 1 && !init) {
            setInit(true)

            handleSubmit()
        }

        return () => {
            setStep(0)
            setData({})
            setInit(false)
        }
    }, []);

    return (
        <div className={style.block}>
            <div className={style.overflow}>
                <div className={style.content}>
                    <div className={style.header}>
                        <p>Ticket details</p>
                        <div
                            className={
                                classNames(
                                    style.button,
                                    style.sm,
                                )
                            }
                        >
                            <Button
                                type={'red'}
                                size={'sm'}
                                icon={'close'}
                                action={() => {
                                    action(false)
                                }}
                            />
                        </div>
                    </div>
                    <div className={style.body}>
                        {
                            step === 0 &&
                            <>
                                <div className={style.title}>Enter you ticket number</div>
                                {
                                    error &&
                                    <div className={style.error}>Invalid ticket number</div>
                                }
                                <form
                                    className={style.form}
                                    onSubmit={handleSubmit}
                                >
                                    <input
                                        type={"text"}
                                        className={style.field}
                                        onChange={(e) => {
                                            setFind(e.target.value || '')
                                            setError(false)
                                        }}
                                    />
                                    <div
                                        className={
                                            classNames(
                                                style.button,
                                                style.sm,
                                            )
                                        }
                                    >
                                        <Button
                                            type={'green'}
                                            size={'sm'}
                                            icon={'search'}
                                        />
                                    </div>
                                </form>
                            </>
                        }
                        {
                            step === 1 &&
                            <>
                                {
                                    loading
                                        ?
                                            <Loader
                                                type={'block'}
                                                background={'transparent'}
                                            />
                                        :
                                            <>
                                                <div
                                                    className={
                                                        classNames(
                                                            style.state,
                                                            data.paid === '1' && style['paid'],
                                                            data.status === "CANCELLED" && style['cancelled']
                                                        )
                                                    }
                                                >
                                                    {
                                                        data.paid === '1'
                                                            ?
                                                            <img
                                                                src={'/img/paid.png'}
                                                                alt={'Paid'}
                                                            />
                                                            :
                                                            <img
                                                                src={'/img/cancelled.png'}
                                                                alt={'Paid'}
                                                            />
                                                    }

                                                </div>
                                                <div className={style.wrapper}>
                                                    <div className={style.title}>Details</div>
                                                    <div
                                                        className={
                                                            classNames(
                                                                style.table,
                                                                style.left,
                                                                style.sm
                                                            )
                                                        }
                                                    >
                                                        <div className={style.row}>
                                                            <div className={style.cell}>Ticket Number</div>
                                                            <div className={style.cell}>{data.id}</div>
                                                            <div className={style.cell}>Total stake</div>
                                                            <div className={style.cell}>{settings.account.symbol} {data.amount}</div>
                                                        </div>
                                                        <div className={style.row}>
                                                            <div className={style.cell}>Book time</div>
                                                            <div className={style.cell}>{getDateTime(data.placed, 1)}</div>
                                                            <div className={style.cell}>Jackpot</div>
                                                            <div className={style.cell}></div>
                                                        </div>
                                                        <div className={style.row}>
                                                            <div className={style.cell}>Selections</div>
                                                            <div className={style.cell}>{data.bets.length}</div>
                                                            <div className={style.cell}>Total payout</div>
                                                            <div className={style.cell}>{data.payout && `${settings.account.symbol} ${data.payout}`}</div>
                                                        </div>
                                                        <div className={style.row}>
                                                            <div className={style.cell}>Ticket type</div>
                                                            <div className={style.cell}>{data.group.length ? 'System': 'Single' }</div>
                                                            <div className={style.cell}>Winning tax</div>
                                                            <div className={style.cell}>{data.tax}</div>
                                                        </div>
                                                        <div className={style.row}>
                                                            <div className={style.cell}>Status</div>
                                                            <div className={style.cell}>
                                                                <div
                                                                    className={
                                                                        classNames(
                                                                            style.status,
                                                                            style[data.status.toLowerCase()]
                                                                        )
                                                                    }
                                                                />
                                                                {data.status}
                                                            </div>
                                                            <div className={style.cell}>Net payout</div>
                                                            <div className={style.cell}>{data.payout && `${settings.account.symbol} ${data.payout}`}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    type === 1 &&
                                                    <div className={style.wrapper}>
                                                        <div className={style.title}>System details</div>
                                                        <div
                                                            className={
                                                                classNames(
                                                                    style.table,
                                                                    style.center,
                                                                    style.lg
                                                                )
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    classNames(
                                                                        style.row,
                                                                        style.head
                                                                    )
                                                                }
                                                            >
                                                                <div className={style.cell}>GR</div>
                                                                <div className={style.cell}>Combi</div>
                                                                <div className={style.cell}>Stake</div>
                                                                <div className={style.cell}>Pot. MIN Win</div>
                                                                <div className={style.cell}>Pot. MAX Win</div>
                                                                <div className={style.cell}>Win</div>
                                                                <div className={style.cell}>Bonus</div>
                                                            </div>
                                                            {
                                                                data.group.map((el, idx) =>
                                                                    <div
                                                                        key={idx}
                                                                        className={style.row}
                                                                    >
                                                                        <div className={style.cell}>{el.group}</div>
                                                                        <div className={style.cell}>{el.combi}</div>
                                                                        <div className={style.cell}>
                                                                            {el.combi} x {settings.account.symbol} {el.amount} = {settings.account.symbol} {el.combi * el.unit}
                                                                        </div>
                                                                        <div className={style.cell}>{settings.account.symbol} {el.minwin.toFixed(2)}</div>
                                                                        <div className={style.cell}>{settings.account.symbol} {el.maxwin.toFixed(2)}</div>
                                                                        <div className={style.cell}>{el.win && `${settings.account.symbol} ${ data.win || 0}`}</div>
                                                                        <div className={style.cell}></div>
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                }
                                                <div className={style.wrapper}>
                                                    <div className={style.title}>Bet list</div>
                                                    <div
                                                        className={
                                                            classNames(
                                                                style.table,
                                                                style.center,
                                                                style[type === 0 ? 'single' : 'system']
                                                            )
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                classNames(
                                                                    style.row,
                                                                    style.head
                                                                )
                                                            }
                                                        >
                                                            <div className={style.cell}>Time</div>
                                                            <div className={style.cell}>Selection</div>
                                                            <div className={style.cell}>Event result</div>
                                                            <div className={style.cell}>Outcome</div>
                                                            <div className={style.cell}>Max odds</div>
                                                            {
                                                                type === 0
                                                                    ?
                                                                    <>
                                                                        <div className={style.cell}>Stake</div>
                                                                        <div className={style.cell}>Win</div>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <div className={style.cell}>Win odds</div>
                                                                    </>
                                                            }
                                                        </div>
                                                        {
                                                            data.bets.map((el, idx) =>
                                                                <div
                                                                    key={idx}
                                                                    className={style.row}
                                                                >
                                                                    <div className={style.cell}>{getDateTime(el.details.start, 0)}</div>
                                                                    <div
                                                                        className={
                                                                            classNames(
                                                                                style.cell,
                                                                                style.left
                                                                            )
                                                                        }
                                                                    >
                                                                        <div className={style.icon}>
                                                                            <Icon id={getIcon(el.type)} />
                                                                        </div>
                                                                        <div className={style.scoreboard}>{el.details.pos}.{el.details.teams.home}-{el.details.teams.away}</div>
                                                                        {el.market}: {el.selection}
                                                                    </div>
                                                                    <div className={style.cell}>
                                                                        <div className={style.score}>
                                                                            {
                                                                                el.status !== 'MANUALLY_CANCELLED' &&
                                                                                el.details.results &&
                                                                                el.details.results.map((el, idx) =>
                                                                                    <span key={idx}>{el}</span>
                                                                                )
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className={
                                                                            classNames(
                                                                                style.cell,
                                                                                style.left
                                                                            )
                                                                        }
                                                                    >
                                                                        <div
                                                                            className={
                                                                                classNames(
                                                                                    style.status,
                                                                                    style[el.status.toLowerCase()]
                                                                                )
                                                                            }
                                                                        />
                                                                        {el.status}
                                                                    </div>
                                                                    <div className={style.cell}>{el.odds}</div>
                                                                    {
                                                                        type === 0
                                                                            ?
                                                                            <>
                                                                                <div className={style.cell}>{settings.account.symbol} {el.amount}</div>
                                                                                <div className={style.cell}>{el.win && `${settings.account.symbol} ${ data.win || 0}`}</div>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <div className={style.cell}>{el.resOdds}</div>
                                                                            </>
                                                                    }
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </>
                                }
                            </>
                        }
                    </div>
                    {
                        step === 1 &&
                        <div className={style.footer}>
                        {
                            data.status === 'OPEN' &&
                            <div
                                className={
                                    classNames(
                                        style.button,
                                        style.lg,
                                    )
                                }
                            >
                                <Button
                                    type={'blue'}
                                    size={'lg'}
                                    icon={'cancelled'}
                                    action={() => {
                                        sendAction('cancel')
                                    }}
                                />
                            </div>
                        }
                        {
                            data.status === 'WIN' &&
                            data.paid === '0' &&
                            <div
                                className={
                                    classNames(
                                        style.button,
                                        style.lg,
                                    )
                                }
                            >
                                <Button
                                    type={'olive'}
                                    size={'lg'}
                                    icon={'dollar'}
                                    action={() => {
                                        sendAction('payout')
                                    }}
                                />
                            </div>
                        }
                        <div
                            className={
                                classNames(
                                    style.button,
                                    style.lg,
                                )
                            }
                        >
                            <Button
                                type={'red'}
                                size={'lg'}
                                icon={'close'}
                                action={() => {
                                    action(false)
                                }}
                            />
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default TicketModal;
