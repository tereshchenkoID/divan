import Label from "../../../modules/Label";
import Odd from "../Odd";

import style from './index.module.scss';

const Statistics = () => {
	return (
        <>
			<Label text={'Late numbers'} />
			<div className={style.row}>
				<div className={style.cell}>
					<Odd
						color={'red'}
						data={'1'}
						size={'md'}
					/>
					<div>32</div>
				</div>
				<div className={style.cell}>
					<Odd
						color={'red'}
						data={'1'}
						size={'md'}
					/>
					<div>32</div>
				</div>
				<div className={style.cell}>
					<Odd
						color={'red'}
						data={'1'}
						size={'md'}
					/>
					<div>32</div>
				</div>
				<div className={style.cell}>
					<Odd
						color={'red'}
						data={'1'}
						size={'md'}
					/>
					<div>32</div>
				</div>
				<div className={style.cell}>
					<Odd
						color={'red'}
						data={'1'}
						size={'md'}
					/>
					<div>32</div>
				</div>
			</div>
        </>
    );
}

export default Statistics;
