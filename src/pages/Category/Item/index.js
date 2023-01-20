import {NavLink} from "react-router-dom";

import style from './index.module.scss';

const Item = ({data}) => {

    return (
        <NavLink
            to={`/${data._sid}/${data._rcid}/${data.currentseason}/overview`}
            className={style.block}
            aria-label={data.na}
        >
            <span>{data.name}</span>
        </NavLink>
    );
}

export default Item;
