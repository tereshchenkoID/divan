import {useDispatch, useSelector} from "react-redux";

import {gameType} from "constant/config";

import Amount from "../Amount";

import style from './index.module.scss';

import {deleteBetslip, setBetslip} from "store/HOME/actions/betslipAction";

const findBet = (data, id, outcome) => {
    return data.find(el => {
        return (el.id === id && el.market === outcome)
    })
}

const Odd = ({data, step, steps, active}) => {
    const dispatch = useDispatch()
    const {betslip} = useSelector((state) => state.betslip)
    const outcome = data.stake

    const addBetslip = (date) => {
        const a = betslip.slice(0);
        const f = findBet(betslip, active.id, outcome)

        if (f) {
            f.stake = (parseFloat(f.stake) + parseFloat(step.amount)).toFixed(2)
            dispatch(deleteBetslip(a))
        }
        else {
            dispatch(setBetslip({
                roundId: active.round.id,
                start: active.start,
                id: active.id,
                b: date.odd,
                market: date.stake,
                print: date.print || date.stake,
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
                (betslip.length > 0 && findBet(betslip, active.id, outcome)) &&
                <Amount
                    data={findBet(betslip, active.id, outcome)}
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
