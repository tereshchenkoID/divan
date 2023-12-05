import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {generateCircles} from "helpers/generateCircles";
import {deleteBetslip} from "store/HOME/actions/betslipAction";

import classNames from "classnames";

import {gameType} from "constant/config";

import Number from "../../../Number";

import style from './index.module.scss';

const generateBets = (numbers) => {
    const bets = [];
    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < numbers.length; j++) {
            for (let k = 0; k < numbers.length; k++) {
                if (i !== j && i !== k && j !== k) {
                    bets.push(`${numbers[i]},${numbers[j]},${numbers[k]}`);
                }
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
        return el.id === id
    })
}

const Triple = ({data}) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const {betslip} = useSelector((state) => state.betslip)
    const [select, setSelect] = useState([])

    const placeBets = () => {
        const r = []
        const f = generateBets(select)
        const b = betslip.slice(0)

        data.race.odds.markets[7].outcomes.map(el => {
            if(f.indexOf(el.a) !== -1) {
                const m = data.race.odds.markets[7].printname
                const p = `${m}: ${el.a}`
                const f = findBet(b, el.id)

                if (!f) {
                    r.push({
                        id: el.id,
                        roundId: data.race.id,
                        start: data.start,
                        b: el.b,
                        market: m,
                        print: p,
                        m_old: m,
                        o_old: el.a,
                        stake: 100,
                        circles: generateCircles(el.a),
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
                    data.race.odds.markets[0].outcomes.map((el, idx) =>
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
                        select.length < 3 && style.disabled
                    )
                }
                onClick={() => {
                  placeBets()
                }}
            >
                {t('games.DOGS_6.place_bets')}
            </button>
        </div>
    );
}

export default Triple;
