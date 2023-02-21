import style from './index.module.scss';
import classNames from "classnames";

const Subtitle = ({data, size}) => {

    return (
        <div className={
            classNames(
                style.block,
                style[size]
            )
        }>
            {data}
        </div>
    );
}

export default Subtitle;
