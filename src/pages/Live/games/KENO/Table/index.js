import {useState, useEffect} from "react";

import Loader from "components/Loader";
import Numbers from "../Numbers";

import style from './index.module.scss';

const Table = ({data}) => {
	const [loading, setLoading] = useState(true)
	
	useEffect(() => {
		setTimeout(() => {
			setLoading(false)
		}, 500)
	}, [data])
	
	return (
        <div className={style.block}>
			{
				loading
					?
						<Loader
							type={'block'}
							background={'transparent'}
						/>
					:
						<div className={style.grid}>
							{
								Array.from({ length: 8 }, (_, idx) =>
									<Numbers
										key={idx}
										tip={8 - idx}
										data={data}
									/>
								)
							}
						</div>
            }
        </div>
    );
}

export default Table;
