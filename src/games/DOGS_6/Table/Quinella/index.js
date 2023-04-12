import Odd from "../Odd";

import style from './index.module.scss';

const Quinella = ({data}) => {

    return (
        <div className={style.block}>
            <div className={style.row}>
                {
                    data.event.g.e.d.b.map((el, idx) =>
                        <div
                            key={idx}
                            className={style.cell}
                        >
                            <Odd
                                market={data.event.g.e.d.a}
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
