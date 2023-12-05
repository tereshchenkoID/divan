import Label from "../../../modules/Label";
import Odd from "../Odd";

import style from './index.module.scss';

const Colors = ({data}) => {
    return (
        <div className={style.block}>
            <Label text={'Colors'} />
            <div className={style.row}>
                {
                    data.statistics.colors.map((el, idx) =>
                        <div
                            key={idx}
                            className={style.cell}
                        >
                            <Odd
                                type={el.num}
                                number={el.count}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Colors;
