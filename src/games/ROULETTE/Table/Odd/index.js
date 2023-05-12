import {useDispatch, useSelector} from "react-redux";

import {gameType} from "constant/config";

import Amount from "../Amount";

import style from './index.module.scss';

import {deleteBetslip, setBetslip} from "store/actions/betslipAction";

const findBet = (data, id) => {
    return data.find(el => {
        return el.id === id
    })
}

const Odd = ({data, step, steps}) => {
    const dispatch = useDispatch()
    const {betslip} = useSelector((state) => state.betslip)

    const addBetslip = (date) => {
        const a = betslip.slice(0);
        const f = findBet(betslip, data.stake)

        if (f) {
            f.stake = (parseFloat(f.stake) + parseFloat(step.amount)).toFixed(2)
            dispatch(deleteBetslip(a))
        }
        else {
            dispatch(setBetslip({
                id: date.stake,
                start: new Date().getTime() + 30000,
                b: date.odd,
                market: date.stake,
                print: date.print,
                m_old: date.stake.split(":")[0],
                o_old: date.stake.split(":")[1].slice(1),
                stake: step.amount.toFixed(2),
                type: gameType.ROULETTE
            }))
        }
    }

    return (
        <div
            className={style.block}
            onClick={() => {
                addBetslip(data)
            }}
        >
            {
                (betslip.length > 0 && findBet(betslip, data.stake)) &&
                <Amount
                    data={findBet(betslip, data.stake)}
                    step={step}
                    steps={steps}
                />
            }
            {
                (data.name === 'red' || data.name === 'black')
                    ?
                        <div className={style.diamond}>
                            <img
                                src={`/img/ROULETTE/decor/${data.name}.png`}
                                alt={'Chips'}
                            />
                        </div>
                    :
                        data.name
            }
        </div>
    );
}

export default Odd;
