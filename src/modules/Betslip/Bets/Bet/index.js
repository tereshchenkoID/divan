import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import classNames from "classnames";

import {gameType} from "constant/config"

import {getIcon} from "helpers/getIcon";
import {useOutsideClick} from "hooks/useOutsideClick";

import {deleteBetslip} from "store/actions/betslipAction";
import {setStake} from "store/actions/stakeAction";

import Icon from "components/Icon";
import Button from "components/Button";

import style from './index.module.scss';

const Bet = ({id, data, betslip, type, setInit, setDisabled}) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const {settings} = useSelector((state) => state.settings)
    const [edit, setEdit] = useState(false)

    const buttonRef = useRef(null)
    const blockRef = useRef(null)

    const removeBet = () => {
        const a = betslip.slice(0);
        a.splice(id, 1)

        if (betslip.length === 1) {
            setInit(false)
            setDisabled(true)
            dispatch(setStake([]))
        }
        dispatch(deleteBetslip(a))
    }

    const updateBet = (val) => {
        let r
        const regex = /[^0-9.]|(?<=\..*)\./g
        const a = betslip.slice(0);

        if (!regex.test(val)) {
            r = val

            if (val.length > 1) {
                if (val[0] === '0' && val[1] !== '.') {
                    r = val.substr(1)
                }
            }

            if (val === '') {
                r = 0
            }

            a[id].stake = r

            dispatch(deleteBetslip(a))
            setInit(true)
        }
    }

    const changeBet = (val) => {
        const a = betslip.slice(0)
        const f = (data.type === 0) ? a[0] : a[id]
        let v

        if (val) {
            if (f.stake.toString().indexOf('.') !== -1) {
                const a = f.stake.split('.')
                a[0] = parseInt(a[0]) + val
                a[1] = a[1] === '' ? 0 : a[1]
                v = a.join('.')
            }
            else {
                v = parseInt(f.stake, 10) + parseInt(val, 10)
            }
        }
        else {
            v = 0
        }

        f.stake = v
        dispatch(deleteBetslip(a))
        setInit(true)
    }

    useOutsideClick(blockRef, buttonRef, setEdit, data)

    return (
        <div
            className={
                classNames(
                    style.block,
                    type === 0 ? style.lg : style.sm,
                    style[data.type]
                )
            }
            ref={blockRef}
        >
            <div className={style.bet}>
                <div>
                    <div className={style.icon}>
                        <Icon id={getIcon(data.type)} />
                    </div>
                </div>
                {
                    data.type === gameType.FOOTBALL_LEAGUE &&
                    <div>
                        <div className={style.meta}>
                            {data.pos}
                            .
                            {data.teams.home.name}
                            -
                            {data.teams.away.name}
                        </div>
                    </div>
                }
                <div className={style.market}>
                    <span>
                        {
                            data.type === gameType.FOOTBALL_LEAGUE && `${data.market.replaceAll('_', ' ')}:${data.c || data.a}`
                        }
                        {
                            data.type === gameType.ROULETTE && (data.print || data.market).replace('_', ' ')
                        }
                        {
                            data.type === gameType.COLOR_COLOR && data.print.replace('_', '/')
                        }
                        {
                            (data.type === gameType.KENO || data.type === gameType.DOGS_6 || data.type === gameType.HORSES_8_VR) && data.print
                        }
                    </span>
                    {
                        data.circles &&
                        <div className={style.circles}>
                            {
                                data.circles.map((el, idx) =>
                                    <div
                                        key={idx}
                                        className={
                                            classNames(
                                                style[(data.type === gameType.DOGS_6 || data.type === gameType.HORSES_8_VR) ? 'number' : 'circle'],
                                                style.sm,
                                                style[el.color ? el.color.toLowerCase() : 'draw']
                                            )
                                        }
                                    >
                                        {data.type === gameType.COLOR_COLOR && el.id.toString().length < 3 && el.id}
                                        {data.type === gameType.KENO && el}
                                        {data.type === gameType.DOGS_6 && el.id}
                                        {data.type === gameType.HORSES_8_VR && el.id}
                                    </div>
                                )
                            }
                        </div>
                    }
                </div>
                <div className={style.odd}>{data.b}</div>
                {
                    type === 0 &&
                    <div>
                        <input
                            ref={buttonRef}
                            type={"text"}
                            className={style.field}
                            placeholder={'100'}
                            value={data.stake}
                            onChange={(e) => {
                                updateBet(e.target.value || 0)
                            }}
                            onFocus={() => {
                                setEdit(true)
                            }}
                        />
                    </div>
                }
                <div>
                    <div className={style.close}>
                        <Button
                            type={'red'}
                            size={'sm'}
                            icon={'close'}
                            action={() => {
                                removeBet()
                            }}
                        />
                    </div>
                </div>
            </div>
            {
                edit &&
                <div className={style.keyboard}>
                    {
                        Object.values(settings.betslip.steps).map((el, idx) =>
                            <div
                                className={style.key}
                                key={idx}
                            >
                                <Button
                                    type={'green'}
                                    size={'sm'}
                                    text={el}
                                    action={() => {
                                        changeBet(el)
                                    }}
                                />
                            </div>
                        )
                    }
                    <div className={style.key}>
                        <Button
                            type={'green'}
                            size={'sm'}
                            text={t('interface.clear')}
                            action={() => {
                                changeBet(null)
                            }}
                        />
                    </div>
                </div>
            }
        </div>
    );
}

export default Bet;
