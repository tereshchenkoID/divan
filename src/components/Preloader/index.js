import style from './index.module.scss';

const Preloader = () => {

    return (
        <div className={style.block}>
            <div className={style.row}>
                <div className={style.cell} />
            </div>
            <div className={style.row}>
                <div className={style.cell} />
                <div className={style.cell} />
                <div className={style.cell} />
                <div className={style.cell} />
                <div className={style.cell} />
            </div>
            <div className={style.row}>
                <div className={style.cell} />
                <div className={style.cell} />
            </div>
            <div className={style.row}>
                <div className={style.cell} />
                <div className={style.cell} />
                <div className={style.cell} />
            </div>
        </div>
    );
}

export default Preloader;
