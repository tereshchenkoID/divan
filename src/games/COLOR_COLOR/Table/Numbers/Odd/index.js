import classNames from "classnames";

import style from './index.module.scss';

const check = (data, id) => {
    return data.find(i => {
        return i.id === id
    })
}

const Odd = ({data, color, date, action}) => {

    const addMatched = () => {
        const f = check(date, data.id)

        if (f) {
            const index = date.indexOf(f)
            const s = [...date.slice(0, index), ...date.slice(index + 1)]
            s.sort((a, b) => a.id - b.id)
            action(s)
        }
        else {
            const s = [...date, {
                id: data.id,
                color: data.color
            }]
            s.sort((a, b) => a.id - b.id)
            action(s)
        }
    }

    return (
        <button
            className={
                classNames(
                    style.block,
                    check(date, data.id) && style.active
                )
            }
            onClick={() => {
                addMatched()
            }}
        >
            <span
                className={
                    classNames(
                        style.color,
                        style[color]
                    )
                }
            >
                {data.id}
            </span>
        </button>
    );
}

export default Odd;
