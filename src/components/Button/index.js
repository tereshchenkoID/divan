import classNames from "classnames";

import Icon from "components/Icon";

import style from './index.module.scss';

const Loader = ({
    type,
    size,
    icon,
    text,
    action
}) => {

    return (
        <button
            className={
                classNames(
                    style.block,
                    style[type],
                    style[size]
                )
            }
            onClick={() => {
                action && action()
            }}
            aria-label={icon}
        >
            {
                icon
                ?
                    <Icon id={icon} />
                :
                    text
            }
        </button>
    );
}

export default Loader;
