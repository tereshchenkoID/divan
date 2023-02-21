import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {deleteBetslip} from "store/actions/betslipAction";

import Icon from "components/Icon";

import style from './index.module.scss';

const getMarketName = (data) => {
    let result = ''

    // eslint-disable-next-line array-callback-return
    data.split('_').map((el, idx) => {
        result += el[0]
    })

    return result
}

const findBet = (data, id) => {
    return data.find(el => {
        return el.id === id
    })
}

const Bet = ({data, betslip}) => {
    const dispatch = useDispatch()
    const {settings} = useSelector((state) => state.settings)
    const [edit, setEdit] = useState(false)

    const removeBet = () => {
        const a = [...betslip]

        a.splice(a.indexOf(findBet(a, data.id)), 1)
        dispatch(deleteBetslip(a))
    }

    const updateBet = (stake) => {
        const a = [...betslip]

        if (stake)
            findBet(a, data.id).stake += stake
        else
            findBet(a, data.id).stake = 0

        dispatch(deleteBetslip(a))
    }

    const changeBet = (stake) => {
        const a = [...betslip]
        findBet(a, data.id).stake = stake

        dispatch(deleteBetslip(a))
    }

    return (
        <div className={style.block}>
            <div className={style.bet}>
                <div>
                    <div className={style.meta}>
                        {data.pos}
                        .
                        {data.teams.home.name}
                        -
                        {data.teams.away.name}
                    </div>
                </div>
                <div className={style.market}>
                    {getMarketName(data.market)}
                    :
                    {data.a}
                </div>
                <div className={style.odd}>{data.b}</div>
                <div>
                    <input
                        type={"number"}
                        className={style.field}
                        placeholder={'100'}
                        defaultValue={data.stake}
                        value={data.stake}
                        onChange={(e) => {
                            changeBet(parseInt(e.target.value, 10))
                        }}
                        onFocus={() => {
                            setEdit(true)
                        }}
                        // onBlur={() => {
                        //     setEdit(false)
                        // }}
                    />
                </div>
                <div>
                    <button
                        aria-label={'Close'}
                        className={style.close}
                        onClick={() => {
                            removeBet()
                        }}
                    >
                        <Icon id={'close'} />
                    </button>
                </div>
            </div>
            {
                edit &&
                <div className={style.keyboard}>
                    {
                        Object.values(settings.f.h).map((el, idx) =>
                            <button
                                key={idx}
                                className={style.key}
                                aria-label={'Key'}
                                onClick={() => {
                                    updateBet(el)
                                }}
                            >
                                {el}
                            </button>
                        )
                    }
                    <button
                        aria-label={'Clear'}
                        className={style.key}
                        onClick={() => {
                            updateBet(null)
                        }}
                    >
                        Clear
                    </button>
                </div>
            }
        </div>
    );
}

export default Bet;
