import Odd from "../Odd";
import Races from "./Races";
import ForecastTrincast from "./ForecastTrincast";

import style from './index.module.scss';

const Numbers = ({data}) => {

    return (
        <div className={style.block}>
            <div className={style.panel}>
                <div className={style.label}>Winner</div>
                <div className={style.table}>
                    <div className={style.row}>
                        {
                            data.race.odds.markets[0].outcomes.map((el, idx) =>
                                <div
                                    key={idx}
                                    className={style.cell}
                                >
                                    <Odd
                                        market={data.race.odds.markets[0].printname}
                                        start={data.start}
                                        data={el}
                                        view={'horizontal'}
                                        roundId={data.race.id}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            <div className={style.panel}>
                <div className={style.label}>Place</div>
                <div className={style.table}>
                    <div className={style.row}>
                        {
                            data.race.odds.markets[1].outcomes.map((el, idx) =>
                                <div
                                    key={idx}
                                    className={style.cell}
                                >
                                    <Odd
                                        market={data.race.odds.markets[1].printname}
                                        start={data.start}
                                        data={el}
                                        view={'horizontal'}
                                        roundId={data.race.id}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            <div className={style.panel}>
                <div className={style.label}>Show</div>
                <div className={style.table}>
                    <div className={style.row}>
                        {
                            data.race.odds.markets[2].outcomes.map((el, idx) =>
                                <div
                                    key={idx}
                                    className={style.cell}
                                >
                                    <Odd
                                        market={data.race.odds.markets[2].printname}
                                        start={data.start}
                                        data={el}
                                        view={'horizontal'}
                                        roundId={data.race.id}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            <div className={style.panel}>
                <div className={style.label}>Forecast/Trincast</div>
                <ForecastTrincast data={data} />
            </div>

            <Races data={data} />
        </div>
    );
}

export default Numbers;
