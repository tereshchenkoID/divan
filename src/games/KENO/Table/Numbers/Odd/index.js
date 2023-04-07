import classNames from "classnames";

import style from './index.module.scss';

const Odd = ({data, date, action}) => {

    const addMatched = () => {
        const f = date.indexOf(data) !== -1
        const a = date.slice(0)

        f ? a.splice(date.indexOf(data), 1) : a.push(data)
        a.sort((a, b) => a - b)
        action(a)
    }

    return (
        <button
            className={
                classNames(
                    style.block,
                    date.indexOf(data) !== -1 && style.active
                )
            }
            onClick={() => {
                addMatched()
            }}
        >
            <span
                className={
                    classNames(
                        style.color
                    )
                }
            >
                {data}
            </span>
        </button>
    );
}

export default Odd;
