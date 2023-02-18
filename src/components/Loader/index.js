import classNames from "classnames";

import style from './index.module.scss';

const Loader = ({type = 'page'}) => {

    return (
        <div
            className={
                classNames(
                    style.block,
                    style[type]
                )
            }
        >
            <div className={style.wrapper} />
        </div>
    );
}

export default Loader;
