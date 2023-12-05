import classNames from "classnames";

import style from './index.module.scss';

const Sort = ({date, data, action, id}) => {
    const val = `${id}-${date}`

    const addSort = () => {
        const f = data.indexOf(val) !== -1

        if (f) {
            const index = data.indexOf(val)
            action([...data.slice(0, index), ...data.slice(index + 1)])
        }
        else {
            action([...data, val])
        }
    }

    return <button
                className={
                    classNames(
                        style.block,
                        data.indexOf(val) !== -1 && style.active
                    )
                }
                onClick={() => {
                    addSort()
                }}
           >
                {date === 1 && '1st'}
                {date === 2 && '2nd'}
                {date === 3 && '3rd'}
           </button>
}

export default Sort;
