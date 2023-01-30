import {NavLink} from "react-router-dom";

import Icon from "components/Icon";

import style from './index.module.scss';

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
