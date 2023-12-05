import Odd from "../Odd";

import style from './index.module.scss';

const Translation = () => {
	return (
        <div className={style.block}>
			<div className={style.row}>
				<Odd
					color={'red'}
					size={'xxl'}
					data={41}
				/>
				<Odd
					color={'blue'}
					size={'xxl'}
					data={41}
				/>
				<Odd
					color={'yellow'}
					size={'xxl'}
					data={41}
				/>
				<Odd
					color={'yellow'}
					size={'xxl'}
					data={41}
				/>
				<Odd
					color={'yellow'}
					size={'xxl'}
					data={41}
				/>
				<Odd
					color={'yellow'}
					size={'xxl'}
					data={41}
				/>
			</div>
			<div className={style.grid}>
				<div>
					<Odd
						color={'red'}
						size={'md'}
						data={0}
					/>
				</div>
				<div>
					<Odd
						color={'yellow'}
						size={'md'}
						data={0}
					/>
				</div>
				<div>
					<Odd
						color={'blue'}
						size={'md'}
						data={0}
					/>
				</div>
				<div className={style.color}>Draw</div>
			</div>
        </div>
    );
}

export default Translation;
