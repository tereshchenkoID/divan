import Icon from "components/Icon";

import style from './index.module.scss';
import classNames from "classnames";
import {setStake} from "../../store/actions/stakeAction";
import {deleteBetslip} from "../../store/actions/betslipAction";
import {setTicket} from "../../store/actions/ticketAction";

const TicketModal = ({data, action}) => {
    return (
        <div className={style.block}>
            <div className={style.content}>
                <div className={style.header}>
                    <p>Ticket details</p>
                    <button
                        className={
                            classNames(
                                style.button,
                                style.sm,
                                style.red,
                            )
                        }
                        onClick={() => {
                            action(false)
                        }}
                    >
                        <Icon id={'close'} />
                    </button>
                </div>
                <div className={style.body}>
                    <div className={style.wrapper}>
                        <div className={style.title}>Details</div>
                        <div className={
                            classNames(
                                    style.table,
                                    style.sm
                                )
                            }
                        >
                            <div className={style.row}>
                                <div className={style.cell}>Ticket Number</div>
                                <div className={style.cell}></div>
                                <div className={style.cell}>Total stake</div>
                                <div className={style.cell}></div>
                            </div>
                            <div className={style.row}>
                                <div className={style.cell}>Book time</div>
                                <div className={style.cell}></div>
                                <div className={style.cell}>Jackpot</div>
                                <div className={style.cell}></div>
                            </div>
                            <div className={style.row}>
                                <div className={style.cell}>Selections</div>
                                <div className={style.cell}></div>
                                <div className={style.cell}>Total payout</div>
                                <div className={style.cell}></div>
                            </div>
                            <div className={style.row}>
                                <div className={style.cell}>Ticket type</div>
                                <div className={style.cell}></div>
                                <div className={style.cell}>Winning tax</div>
                                <div className={style.cell}></div>
                            </div>
                            <div className={style.row}>
                                <div className={style.cell}>Status</div>
                                <div className={style.cell}></div>
                                <div className={style.cell}>Net payout</div>
                                <div className={style.cell}></div>
                            </div>
                        </div>
                    </div>

                    <div className={style.wrapper}>
                        <div className={style.title}>Bet list</div>
                        <div className={
                                classNames(
                                    style.table,
                                    style.lg
                                )
                            }
                        >
                            <div className={style.row}>
                                <div className={style.cell}>Time</div>
                                <div className={style.cell}>Selection</div>
                                <div className={style.cell}>Event result</div>
                                <div className={style.cell}>Outcome</div>
                                <div className={style.cell}>Max odds</div>
                                <div className={style.cell}>Stake</div>
                                <div className={style.cell}>Win</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.footer}>
                    <button
                        className={
                            classNames(
                                style.button,
                                style.lg,
                                style.blue
                            )
                        }
                    >
                        <Icon id={'file-times'} />
                    </button>
                    <button
                        className={
                            classNames(
                                style.button,
                                style.lg,
                                style.olive
                            )
                        }
                    >
                        <Icon id={'dollar'} />
                    </button>
                    <button
                        className={
                            classNames(
                                style.button,
                                style.lg,
                                style.red
                            )
                        }
                        aria-label={'Remove'}
                    >
                        <Icon id={'close'} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TicketModal;
