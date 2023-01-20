import {NavLink} from "react-router-dom";

import style from './index.module.scss';

const Item = ({data}) => {

    return (
        <NavLink
            to={`/${data._id}`}
            className={style.block}
            aria-label={data.name}
        >
            <span className={style.icon}>
                <img src={`./img/categories/${data._id}.svg`} alt={data.name} />
            </span>
            <span className={style.text}>{data.name}</span>
        </NavLink>
    );
}

export default Item;
