import classNames from "classnames";

import Label from "../../../modules/Label";
import Odd from "../Odd";

import style from './index.module.scss';

const History = () => {
	
	return (
        <div className={style.block}>
			<div className={style.row}>
				<Label text={'Event'} />
				<Label text={'Numbers'} />
				<Label text={'Colors'} />
				<Label text={'Winning'} />
			</div>
			<div
				className={
					classNames(
						style.row,
						style.alt
					)
				}
			>
				{
					Array.from({ length: 8 }, (_, idx) =>
						<>
							<div className={style.cell}>112312312</div>
							<div className={style.cell}>
								<Odd
									color={'red'}
									data={'1'}
								/>
								<Odd
									color={'yellow'}
									data={'1'}
								/>
								<Odd
									color={'blue'}
									data={'1'}
								/>
								<Odd
									color={'draw'}
									data={'1'}
								/>
								<Odd
									color={'red'}
									data={'1'}
								/>
								<Odd
									color={'red'}
									data={'1'}
								/>
							</div>
							<div className={style.cell}>
								<Odd
									color={'draw'}
									data={'1'}
								/>
								<Odd
									color={'red'}
									data={'1'}
								/>
								<Odd
									color={'blue'}
									data={'1'}
								/>
							</div>
							<div className={style.cell}>
								<Odd
									color={'draw'}
									data={'1'}
								/>
							</div>
						</>
					)
				}
			</div>
        </div>
    );
}

export default History;
