import Odd from "../Odd";

import style from './index.module.scss';

const Quinella = ({data}) => {

    return (
        <div className={style.block}>
            <div className={style.row}>
                {
                    data.race.odds.markets[3].outcomes.map((el, idx) =>
                        <div
                            key={idx}
                            className={style.cell}
                        >
                            <Odd
                                market={data.race.odds.markets[3].printname}
                                start={data.start}
                                data={el}
                                view={'vertical'}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Quinella;
