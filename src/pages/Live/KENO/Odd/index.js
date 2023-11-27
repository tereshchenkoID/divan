import classNames from "classnames";

import style from './index.module.scss';

const Odd = ({data, active, size = 'md', transform = 0}) => {
    
    return (
        <button
            className={
                classNames(
                    style.block,
                    active && style.active,
                )
            }
        >
            <span
                className={
                    classNames(
                        style.color,
                        style.red,
                        style[size],
                    )
                }
                style={{
                    transform: `rotateZ(${transform}deg)`,
                }}
            >
                {data}
            </span>
        </button>
    );
}

export default Odd;
