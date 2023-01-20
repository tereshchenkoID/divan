import {useSelector} from "react-redux";

import style from './index.module.scss';

const Breadcrumbs = () => {
    const {sport} = useSelector((state) => state.sport);
    const {category} = useSelector((state) => state.category);
    const {url} = useSelector(state => state.url)

    const findItem = (data, search) => {
        return data.filter(el => el._id.toString() === search)[0]
    }

    const sport_el = (sport && url.id) && findItem(sport, url.id)
    const category_el = (category && url.category) && findItem(category, url.category)

    return (
        <div className={style.block}>
            {
                sport_el &&
                <div className={style.item}>{sport_el.name}</div>
            }
            {
                category_el &&
                <div className={style.item}>{category_el.name}</div>
            }
        </div>
    );
}

export default Breadcrumbs;
