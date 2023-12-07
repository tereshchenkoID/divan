import Label from "../../../modules/Label";
import Odd from "../Odd";

import style from './index.module.scss';

const Hot = ({data}) => {
	return (
        <>
			<Label text={'Hot numbers in the last 20 draws'} />
			<div className={style.row}>
				{
					data.statistics.hot.map((el, idx) =>
						<div
							key={idx}
							className={style.cell}
						>
							<Odd
								color={el.color}
								data={el.num}
								size={'md'}
							/>
							<div>{el.count}</div>
						</div>
					)
				}
			</div>
        </>
    );
}

export default Hot;
