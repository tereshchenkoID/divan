import classNames from "classnames";

import Number from "../Number";

import style from './index.module.scss';

const Main = ({data}) => {

    return (
        <>
            <div className={style.row}>
                <div className={style.label}>Name</div>
                <div className={style.label}>Last 5</div>
                <div className={style.label}>{data.race.odds.markets[0].printname}</div>
                <div className={style.label}>{data.race.odds.markets[1].printname}</div>
                <div className={style.label}>{data.race.odds.markets[2].printname}</div>
            </div>
            <div
                className={
                    classNames(
                        style.row,
                        style.alt
                    )
                }
            >
                <div>
                    {
                        data.race.participants.map((el, idx) =>
                            <div
                                key={idx}
                                className={style.cell}
                            >
                                <Number
                                    data={idx + 1}
                                    color={idx}
                                />
                                {el.b}
                            </div>
                        )
                    }
                </div>
                <div>
                    {
                        data.race.participants.map((el, idx) =>
                            <div
                                key={idx}
                                className={
                                    classNames(
                                        style.cell,
                                        style.center,
                                    )
                                }
                            >
                                {el.c}
                            </div>
                        )
                    }
                </div>
                <div>
                    {
                        data.race.odds.markets[0].outcomes.map((el, idx) =>
                            <div
                                key={idx}
                                className={
                                    classNames(
                                        style.cell,
                                        style.center,
                                    )
                                }
                            >
                                {el.b.toFixed(1)}
                            </div>
                        )
                    }
                </div>
                <div>
                    {
                        data.race.odds.markets[1].outcomes.map((el, idx) =>
                            <div
                                key={idx}
                                className={
                                    classNames(
                                        style.cell,
                                        style.center,
                                    )
                                }
                            >
                                {el.b.toFixed(1)}
                            </div>
                        )
                    }
                </div>
                <div>
                    {
                        data.race.odds.markets[0].outcomes.map((el, idx) =>
                            <div
                                key={idx}
                                className={
                                    classNames(
                                        style.cell,
                                        style.center,
                                    )
                                }
                            >
                                {el.b.toFixed(1)}
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default Main;
