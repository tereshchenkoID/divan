import Odd from "../../../Odd";

import style from './index.module.scss';

const Extra = ({data}) => {

    return (
        <div className={style.block}>
            {
                data.event.g.e.e.b.map((el, idx) =>
                    <div
                        key={idx}
                        className={style.cell}
                    >
                        <Odd
                            market={data.event.g.e.e.a}
                            text={el.a}
                            data={el}
                        />
                    </div>
                )
            }
            {
                data.event.g.e.f.b.map((el, idx) =>
                    <div
                        key={idx}
                        className={style.cell}
                    >
                        <Odd
                            market={data.event.g.e.f.a}
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
