import style from './index.module.scss';

const Options = ({data}) => {
	return (
        <>
			<div className={style.row}>
				<div className={style.cell}>Max delay</div>
				<div className={style.cell}>{data.statistics.delay[0].num}</div>
				<div className={style.cell}>The most frequent</div>
				<div className={style.cell}>{data.statistics.frequent[0].num}</div>
			</div>
        </>
    );
}

export default Options;
