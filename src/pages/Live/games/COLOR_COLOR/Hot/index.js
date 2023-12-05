import Label from "../../../modules/Label";
import Odd from "../Odd";

import style from './index.module.scss';

const Hot = () => {
	return (
        <>
			<Label text={'Hot numbers in the last 20 draws'} />
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

export default Hot;
