import classNames from "classnames";

import style from './index.module.scss';

const Checkbox = ({data = false, action = () => {}}) => {

    return (
        <label
            className={
                classNames(
                    style.block,
                )
            }
        >
            <input
                className={style.input}
                type="checkbox"
                defaultChecked={data === '1'}
                onChange={() => {
                    action()
                }}
            />
            <span className={style.label} />
        </label>
    );
}

export default Checkbox;
