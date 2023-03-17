import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import classNames from "classnames";

import {getIcon} from "helpers/getIcon";
import {getData} from "helpers/api";
import checkData from "helpers/checkData";

import Loader from "components/Loader";
import Icon from "components/Icon";
import Button from "components/Button";

import style from './index.module.scss';

const getDate = (data, type) => {
    const now = new Date(data);
    const date = now.getDate().toString().padStart(2, '0')
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const year = now.getFullYear().toString();
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    const seconds = now.getSeconds().toString().padStart(2, '0')

    return type === 0 ? `${hours}:${minutes}:${seconds}`: `${date}/${month}/${year} ${hours}:${minutes}:${seconds}`
}

const TicketModal = ({id, action}) => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const {settings} = useSelector((state) => state.settings)
    const [type, setType] = useState(0)

    useEffect(() => {
        getData(`/details/${id}`).then((json) => {
            if (!checkData(json)) {
                setData(json)
                setLoading(false)
                setType(json.group.length > 0 ? 1 : 0)
                console.log(json)
            }
        })
    }, []);

    return (
        <div className={style.block}>
            <div className={style.content}>
                {
                    loading
                        ?
                            <Loader
                                type={'block'}
                                background={'transparent'}
                            />
                        :
                            <>
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
                                    <div
                                        className={
                                            classNames(
                                                style.state,
                                                data.paid === '1' && style['paid'],
                                                data.status === "CANCELLED" && style['cancelled']
                                            )
                                        }
                                    />
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
                                                <div className={style.cell}>{getDate(data.placed, 1)}</div>
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
                                                        <div className={style.cell}>{getDate(el.details.start, 0)}</div>
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
                                </div>
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
                                            />
                                        </div>
                                    }
                                    {
                                        data.status === 'WIN' &&
                                        data.paid === '1' &&
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
                                            icon={'trash'}
                                        />
                                    </div>
                                </div>
                            </>
                }
            </div>
        </div>
    );
}

export default TicketModal;
