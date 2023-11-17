import style from './index.module.scss';
import classNames from "classnames";

const Extra = ({data}) => {

    return (
        <>
            <div className={style.row}>
                <div className={style.label}>{data.race.odds.markets[4].printname}</div>
                <div className={style.label}>{data.race.odds.markets[5].printname}</div>
            </div>
            <div
                className={
                    classNames(
                        style.row,
                        style.alt
                    )
                }
            >
                {
                    data.race.odds.markets[4].outcomes.map((el, idx) =>
                        <div
                            key={idx}
                            className={style.cell}
                        >
                            {el.a} {el.b.toFixed(1)}
                        </div>
                    )
                }
                {
                    data.race.odds.markets[5].outcomes.map((el, idx) =>
                        <div
                            key={idx}
                            className={style.cell}
                        >
                            {el.a} {el.b.toFixed(1)}
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default Extra;
