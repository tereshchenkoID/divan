import Odd from "../../../Odd";

import style from './index.module.scss';

const Extra = ({data}) => {

    return (
        <div className={style.block}>
            {
                data.race.odds.markets[4].outcomes.map((el, idx) =>
                    <div
                        key={idx}
                        className={style.cell}
                    >
                        <Odd
                            start={data.start}
                            market={data.race.odds.markets[4].printname}
                            text={el.a}
                            data={el}
                        />
                    </div>
                )
            }
            {
                data.race.odds.markets[5].outcomes.map((el, idx) =>
                    <div
                        key={idx}
                        className={style.cell}
                    >
                        <Odd
                            start={data.start}
                            market={data.race.odds.markets[5].printname}
                            text={el.a}
                            data={el}
                        />
                    </div>
                )
            }
        </div>
    );
}

export default Extra;
