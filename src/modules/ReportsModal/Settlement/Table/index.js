import style from './index.module.scss';

const Table = ({data}) => {

    return (
        <div className={style.block}>
            <div className={style.row}>
                <div className={style.cell}>1</div>
                <div className={style.cell}>2</div>
            </div>
            <div className={style.row}>
                <div className={style.cell}>1</div>
                <div className={style.cell}>2</div>
            </div>
            <div className={style.row}>
                <div className={style.cell}>1</div>
                <div className={style.cell}>2</div>
            </div>
        </div>
    );
}

export default Table;
