import React from "react";

import Label from "../../modules/Label";

import style from './index.module.scss';

const Numbers = ({tip}) => {
    const tips = {
        8: {
            8: 3000,
            7: 200,
            4: 4,
            5: 16,
            6: 50
        },
        7: {
            7: 800,
            6: 25,
            5: 10,
            4: 4,
            3: 3
        },
        6: {
            6: 600,
            5: 50,
            4: 11,
            3: 2
        },
        5: {
            5: 150,
            4: 15,
            3: 3,
            2: 1
        },
        4: {
            4: 80,
            3: 8,
            2: 1
        },
        3: {
            3: 30,
            2: 3
        },
        2: {
            2: 8,
            1: 1
        },
        1: {
            1: 3,
        }
    }
    return (
        <div>
            <Label text={`${tip} tips`} />
            <div className={style.row}>
                <div className={style.cell}>Hits</div>
                <div className={style.cell}>Quotes</div>
                {
                    Object.keys(tips[tip]).reverse().map((el, idx) =>
                        <React.Fragment
                            key={idx}
                        >
                            <div className={style.cell}>{el}</div>
                            <div className={style.cell}>{tips[tip][el]}</div>
                        </React.Fragment>
                    )
                }
            </div>
        </div>
    );
}

export default Numbers;
