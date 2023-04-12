import Odd from "../../Odd";

import style from './index.module.scss';

const ForecastTrincast = ({data}) => {

    return (
        <div className={style.block}>
            <div className={style.table}>
                <div className={style.row}>
                    <div className={style.cell}>1</div>
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
                <div className={style.row}>
                    <div className={style.cell}>2</div>
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
                <div className={style.row}>
                    <div className={style.cell}>3</div>
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
    );
}

export default ForecastTrincast;
