import {useDispatch, useSelector} from "react-redux";

import Amount from "games/ROULETTE/Table/Amount";

import style from './index.module.scss';

import {deleteBetslip, setBetslip} from "store/actions/betslipAction";

const Odd = ({data, step, steps}) => {
    const dispatch = useDispatch()
    const {betslip} = useSelector((state) => state.betslip)

    const findBet = (id) => {
        return betslip.find(el => {
            return el.id === id
        })
    }

    const addBetslip = (date) => {
        const a = betslip.slice(0);

        const find = a.find(el => {
            return el.id === data.stake
        })

        if (find) {
            find.stake = (parseFloat(find.stake) + parseFloat(step.amount)).toFixed(2)
            dispatch(deleteBetslip(a))
        }
        else {
            dispatch(setBetslip({
                start: null,
                id: date.stake,
                b: date.odd,
                market: date.stake,
                print: date.print,
                m_old: date.stake.split(":")[0],            // Remove after
                o_old: date.stake.split(":")[1].slice(1),    // Remove after
                stake: step.amount.toFixed(2),
                type: "ROULETTE"
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
                (betslip.length > 0 && findBet(data.stake)) &&
                <Amount
                    data={findBet(data.stake)}
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
