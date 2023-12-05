import Label from "../../../modules/Label";
import Odd from "../Odd";

import style from './index.module.scss';

const Winning = () => {
	return (
        <>
			<Label text={'Winning colors in the last 20 draws'} />
			<div className={style.row}>
				<div className={style.cell}>
					<Odd
						color={'red'}
						size={'md'}
					/>
					<div>32 draw</div>
				</div>
				<div className={style.cell}>
					<Odd
						color={'yellow'}
						size={'md'}
					/>
					<div>32 draw</div>
				</div>
				<div className={style.cell}>
					<Odd
						color={'blue'}
						size={'md'}
					/>
					<div>32 draw</div>
				</div>
				<div className={style.cell}>
					<Odd
						color={'draw'}
						size={'md'}
					/>
					<div>32 draw</div>
				</div>
			</div>
        </>
    );
}

export default Winning;
