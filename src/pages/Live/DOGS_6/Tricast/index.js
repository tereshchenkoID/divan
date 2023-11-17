import Odd from "../Odd";

import style from './index.module.scss';

const groupByFirstValue = (arr) => {
    let result = [];
    let temp = {};
    
    for (let i = 0; i < arr.length; i++) {
        let key = arr[i]["a"].split(",")[0];
        if (!temp[key]) {
            temp[key] = [];
        }
        temp[key].push(arr[i]);
    }
    
    for (let key in temp) {
        result.push(temp[key])
    }
    
    return result
}

const Tricast = ({data}) => {
    
    return (
        <>
            <div className={style.label}>{data.race.odds.markets[7].printname}</div>
            <div className={style.row}>
                {
                    groupByFirstValue(data.race.odds.markets[7].outcomes).map((el_c, idx_c) =>
                        <div
                            key={idx_c}
                            className={style.column}
                        >
                            {
                                el_c.map((el_i, idx_i) =>
                                    <div
                                        key={idx_i}
                                        className={style.cell}
                                    >
                                        <Odd
                                            data={el_i}
                                            view={'horizontal'}
                                            size={'sm'}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default Tricast;
