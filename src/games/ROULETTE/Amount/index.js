import {useEffect, useState} from "react";

import classNames from "classnames";

import style from './index.module.scss';

const Amount = ({data, step, steps}) => {
    const [toggle, setToggle] = useState(false)

    const currentStakeColor = (value) => {
        let previous = null;

        for (let i = 0; i < steps.length; i++) {
            if (value < steps[0].amount) {
                previous = steps[0].color
            }
            if (value > steps[steps.length - 1].amount) {
                previous = steps[steps.length - 1].color
            }
            if (value < steps[i].amount) {
                return previous;
            }
            previous = steps[i].color;
        }

        return previous.color;
    }

    useEffect(() => {
        if(parseInt(data.stake, 10) > 0) {
            setToggle(true)

            setTimeout(() => {
                setToggle(false)
            }, 1000)
        }
    }, [data.stake])

    return (
        <div className={style.block}>
            {
                data.stake > 0 &&
                <div
                    className={
                        classNames(
                            style.amount,
                            toggle && style.active
                        )
                    }
                >
                    <img
                        src={`/img/ROULETTE/chips/${currentStakeColor(data.stake) || 'red'}.png`}
                        alt={'Chips'}
                    />
                    <p>{data.stake}</p>
                    <div
                        className={
                            classNames(
                                style.animation,
                                toggle && style.active
                            )
                        }
                    >
                        +{step.amount}
                    </div>
                </div>
            }
        </div>
    );
}

export default Amount;
