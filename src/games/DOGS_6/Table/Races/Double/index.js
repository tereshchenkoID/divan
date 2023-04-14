import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {deleteBetslip} from "store/actions/betslipAction";

import classNames from "classnames";

import {dogsType, gameType} from "constant/config";

import Number from "../../Number";

import style from './index.module.scss';

const generateBets = (numbers) => {
    const bets = [];
    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < numbers.length; j++) {
            if (i !== j) {
                bets.push(`${numbers[i]},${numbers[j]}`);
            }
        }
    }
    return bets;
}

const addStake = (id, select, setSelect) => {
    const a = select.slice(0)

    if (select.indexOf(id) === -1) {
        a.push(id)
    }
    else {
        a.splice(a.indexOf(id), 1)
    }

    a.sort((a, b) => a - b)
    setSelect(a)
}

const findBet = (data, id) => {
    return data.find(el => {
        return el.print === id
    })
}

const Double = ({data}) => {
    const dispatch = useDispatch()
    const {betslip} = useSelector((state) => state.betslip)
    const [select, setSelect] = useState([])

    const placeBets = () => {
        const r = []
        const f = generateBets(select)
        const b = betslip.slice(0)

        data.event.g.e.g.b.map(el => {
            if(f.indexOf(el.a) !== -1) {
                const m = data.event.g.e.h.a
                const p = `${dogsType[m]}: ${el.a}`
                const f = findBet(b, p)

                if (!f) {
                    r.push({
                        start: null,
                        id: null,
                        b: el.b,
                        market: m,
                        print: p,
                        m_old: m,                     // Remove after
                        o_old: el.a,                  // Remove after
                        stake: 100,
                        type: gameType.DOGS_6
                    })
                }
            }

            return true
        })

        dispatch(deleteBetslip(b.concat(r)))
        setSelect([])
    }

    return (
        <div className={style.block}>
            <div className={style.row}>
                {
                    data.event.g.e.c.b.map((el, idx) =>
                        <div
                            key={idx}
                            className={style.cell}
                        >
                            <button
                                className={
                                    classNames(
                                        style.odd,
                                        select.indexOf(idx + 1) !== -1 && style.active
                                    )
                                }
                                onClick={() => {
                                    addStake(idx + 1, select, setSelect)
                                }}
                            >
                                <Number
                                    color={idx}
                                    data={idx + 1}
                                    size={'lg'}
                                />
                            </button>
                        </div>
                    )
                }
            </div>
            <button
                className={
                    classNames(
                        style.button,
                        select.length < 2 && style.disabled
                    )
                }
                onClick={() => {
                  placeBets()
                }}
            >
                Place bets
            </button>
        </div>
    );
}

export default Double;
