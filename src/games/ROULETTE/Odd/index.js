import {useDispatch, useSelector} from "react-redux";

import Amount from "games/ROULETTE/Amount";

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
            find.stake = parseInt(find.stake, 10) + parseInt(step.amount, 10)
            dispatch(deleteBetslip(a))
        }
        else {
            dispatch(setBetslip({
                start: null,
                id: date.stake,
                b: date.odd,
                market: date.stake,
                stake: parseInt(step.amount, 10),
                type: "ROULETTE"
            }))
        }
    }

    return (
        <button
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
        </button>
    );
}

export default Odd;
