import classNames from "classnames";

import Button from "components/Button";

import style from './index.module.scss';

const TicketModal = ({data, action}) => {
    return (
        <div className={style.block}>
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
                            icon={'file-times'}
                        />
                    </div>
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
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TicketModal;
