import {NavLink} from "react-router-dom";

import style from './index.module.scss';

import Icon from "components/Icon";

const Item = ({data}) => {

    return (
        <NavLink
            to={`/${data._id}`}
            className={style.block}
            aria-label={data.name}
        >
            <span className={style.icon}>
                <Icon id={`sport-${data._id}`} />
            </span>
            <span className={style.text}>{data.name}</span>
        </NavLink>
    );
}

export default Item;
