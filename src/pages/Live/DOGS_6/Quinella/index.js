import Odd from "../Odd";

import style from './index.module.scss';

const Quinella = ({data}) => {

    return (
        <>
            <div className={style.label}>{data.race.odds.markets[3].printname}</div>
            <div className={style.row}>
                {
                    data.race.odds.markets[3].outcomes.map((el, idx) =>
                        <div
                            key={idx}
                            className={style.cell}
                        >
                            <Odd
                                data={el}
                                view={'horizontal'}
                            />
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default Quinella;
