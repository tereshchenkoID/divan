import classNames from "classnames";

import style from './index.module.scss';

const Number = ({data, color, size}) => {

    return (
        <span
            className={
                classNames(
                    style.block,
                    style[color],
                    size && style[size]
                )
            }
        >
            {!size && (data.id || data.a)}
        </span>
    );
}

export default Number;
