import Odd from "./Odd";

import style from './index.module.scss';

const Colors = ({data, colors, setColors}) => {

    return (
        <div className={style.block}>
            <div>
                {
                    data.event.d.b.map((el, idx) =>
                        <div
                            key={idx}
                            className={style.cell}
                        >
                            <Odd
                                data={el}
                                color={el.a.toLowerCase()}
                                size={'lg'}
                                date={colors}
                                action={setColors}
                            />
                        </div>
                    )
                }
            </div>
            <div>
                <div>
                    {
                        data.event.e.b.map((el, idx) =>
                            <div
                                key={idx}
                                className={style.cell}
                            >
                                <Odd
                                    data={el}
                                    color={'blue'}
                                    date={colors}
                                    action={setColors}
                                />
                            </div>
                        )
                    }
                </div>
                <div>
                    {
                        data.event.f.b.map((el, idx) =>
                            <div
                                key={idx}
                                className={style.cell}
                            >
                                <Odd
                                    data={el}
                                    color={'red'}
                                    date={colors}
                                    action={setColors}
                                />
                            </div>
                        )
                    }
                </div>
                <div>
                    {
                        data.event.g.b.map((el, idx) =>
                            <div
                                key={idx}
                                className={style.cell}
                            >
                                <Odd
                                    data={el}
                                    color={'yellow'}
                                    date={colors}
                                    action={setColors}
                                />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Colors;
