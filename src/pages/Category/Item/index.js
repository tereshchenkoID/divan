import style from './index.module.scss';

const Category = ({data}) => {
    console.log(data)

    return (
        <a
            href="#"
            className={style.block}
        >
            <span>{data.name}</span>
        </a>
    );
}

export default Category;
