import classNames from "classnames";

import {getIcon} from "helpers/getIcon";

import Icon from "components/Icon";
import Button from "components/Button";

import style from './index.module.scss';

const getData = (data) => {
    const now = new Date(data);
    const date = now.getDate().toString().padStart(2, '0')
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const year = now.getFullYear().toString();
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    const seconds = now.getSeconds().toString().padStart(2, '0')

    return `${date}/${month}/${year} ${hours}:${minutes}:${seconds}`
}

const TicketModal = ({date, action}) => {
    const data = {
        "account": {
            "balance": 998500,
            "currency": "NGN"
        },
        "stake": {
            "id": 110032232618,
            "username": "cashier131",
            "status": "OPEN",
            "currency": "NGN",
            "amount": 1200,
            "maxwin": 2091,
            "minwin": 435,
            "placed": 1679004016000,
            "oddstype": "DECIMAL",
            "bets": [
                [
                    {
                        "odds": "1.74",
                        "amoutn": "300",
                        "isbanker": false,
                        "status": "OPEN",
                        "market": "GOAL_NO_GOAL",
                        "selection": "NO_GOAL",
                        "details": {
                            "eventId": 901942029,
                            "matchId": 926427311,
                            "start": 1679004256000,
                            "state": "ANNOUNCEMENT",
                            "game": "FOOTBALL_LEAGUE",
                            "pos": 2,
                            "teams": {
                                "home": "MCI",
                                "away": "MUN"
                            }
                        }
                    },
                    {
                        "odds": "2.07",
                        "amoutn": "300",
                        "isbanker": false,
                        "status": "OPEN",
                        "market": "OVER_UNDER",
                        "selection": "OVER_2.5",
                        "details": {
                            "eventId": 901942029,
                            "matchId": 926427311,
                            "start": 1679004256000,
                            "state": "ANNOUNCEMENT",
                            "game": "FOOTBALL_LEAGUE",
                            "pos": 2,
                            "teams": {
                                "home": "MCI",
                                "away": "MUN"
                            }
                        }
                    },
                    {
                        "odds": "1.71",
                        "amoutn": "300",
                        "isbanker": false,
                        "status": "OPEN",
                        "market": "OVER_UNDER",
                        "selection": "UNDER_2.5",
                        "details": {
                            "eventId": 901942029,
                            "matchId": 926427311,
                            "start": 1679004256000,
                            "state": "ANNOUNCEMENT",
                            "game": "FOOTBALL_LEAGUE",
                            "pos": 2,
                            "teams": {
                                "home": "MCI",
                                "away": "MUN"
                            }
                        }
                    },
                    {
                        "odds": "1.45",
                        "amoutn": "300",
                        "isbanker": false,
                        "status": "OPEN",
                        "market": "OVER_UNDER",
                        "selection": "OVER_2.5",
                        "details": {
                            "eventId": 901942030,
                            "matchId": 926427311,
                            "start": 1679004256000,
                            "state": "ANNOUNCEMENT",
                            "game": "FOOTBALL_LEAGUE",
                            "pos": 3,
                            "teams": {
                                "home": "LIV",
                                "away": "HUD"
                            }
                        }
                    }
                ]
            ],
            "system": []
        }
    }

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
                                <div className={style.cell}>{data.stake.id}</div>
                                <div className={style.cell}>Total stake</div>
                                <div className={style.cell}>{data.stake.currency} {data.stake.amount}</div>
                            </div>
                            <div className={style.row}>
                                <div className={style.cell}>Book time</div>
                                <div className={style.cell}>{getData(data.stake.placed)}</div>
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
                                <div className={style.cell}>{data.stake.status}</div>
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

                            {
                                data.stake.bets[0].map((el, idx) =>
                                    <div
                                        key={idx}
                                        className={style.row}
                                    >
                                        <div className={style.cell}>Time</div>
                                        <div className={style.cell}>
                                            <div className={style.icon}>
                                                <Icon id={getIcon(el.type)} />
                                            </div>
                                            <div className={style.scoreboard}>{el.details.pos}.{el.details.teams.home}-{el.details.teams.away}</div>
                                            {el.market}: {el.selection}
                                        </div>
                                        <div className={style.cell}></div>
                                        <div className={style.cell}>{el.status}</div>
                                        <div className={style.cell}>{el.odds}</div>
                                        <div className={style.cell}>{el.amoutn}</div>
                                        <div className={style.cell}></div>
                                    </div>
                                )
                            }
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
