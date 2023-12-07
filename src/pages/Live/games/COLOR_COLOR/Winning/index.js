import Label from "../../../modules/Label";
import Odd from "../Odd";

import style from './index.module.scss';

const Winning = ({data}) => {
	return (
        <>
			<Label text={'Winning colors in the last 20 draws'} />
			<div className={style.row}>
				{
					data.statistics.winning.map((el, idx) =>
						<div
							key={idx}
							className={style.cell}
						>
							<Odd
								color={el.num}
								size={'md'}
								data={el.count}
							/>
						</div>
					)
				}
			</div>
        </>
    );
}

export default Winning;
