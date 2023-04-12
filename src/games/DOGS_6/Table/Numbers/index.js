import Odd from "../Odd";
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
                        data.event.g.e.a.b.map((el, idx) =>
                            <div
                                key={idx}
                                className={style.cell}
                            >
                                <Odd
                                    market={data.event.g.e.a.a}
                                    data={el}
                                    view={'horizontal'}
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
                        data.event.g.e.b.b.map((el, idx) =>
                            <div
                                key={idx}
                                className={style.cell}
                            >
                                <Odd
                                    market={data.event.g.e.b.a}
                                    data={el}
                                    view={'horizontal'}
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
                            data.event.g.e.c.b.map((el, idx) =>
                                <div
                                    key={idx}
                                    className={style.cell}
                                >
                                    <Odd
                                        market={data.event.g.e.c.a}
                                        data={el}
                                        view={'horizontal'}
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
        </div>
    );
}

export default Numbers;
