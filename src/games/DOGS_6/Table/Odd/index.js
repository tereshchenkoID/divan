import {useDispatch, useSelector} from "react-redux";

import classNames from "classnames";

import {dogsColor, dogsType, gameType} from "constant/config";

import {deleteBetslip, setBetslip} from "store/actions/betslipAction";

import style from './index.module.scss';

const findBet = (data, id) => {
    return data.find(el => {
        return el.print === id
    })
}

const Odd = ({market, data, view}) => {
    const dispatch = useDispatch()
    const {betslip} = useSelector((state) => state.betslip)
    const p = `${dogsType[market]}: ${data.a}`

    const addStake = () => {
        const a = betslip.slice(0);

        if (findBet(a, p)) {
            a.splice(a.indexOf(findBet(a, p)), 1)
            dispatch(deleteBetslip(a))
        }
        else {
            dispatch(setBetslip({
                start: null,
                id: null,
                b: data.b,
                market: market,
                print: `${dogsType[market]}: ${data.a}`,
                m_old: market,    // Remove after
                o_old: data.a,    // Remove after
                stake: 100,
                type: gameType.DOGS_6
            }))
        }
    }

    return <button
                className={
                    classNames(
                        style.block,
                        style[view],
                        findBet(betslip, p) && style.active
                    )
                }
                onClick={() => {
                    addStake()
                }}
           >
                <div className={style.numbers}>
                    {
                        data.a.split(',').map((el, idx) =>
                            <div
                                key={idx}
                                className={
                                    classNames(
                                        style.number,
                                        style[dogsColor[el - 1]]
                                    )
                                }
                            >
                                {el}
                            </div>
                        )
                    }
                </div>
                <div>{data.b}</div>
           </button>
}

export default Odd;
