import {useState, useEffect} from "react";

import Loader from "components/Loader";
import History from "../History";
import Statistics from "../Statistics";
import Hot from "../Hot";
import Winning from "../Winning";
import Translation from "../Translation";
import Options from "../Options";

import style from './index.module.scss';

const Table = ({data, progress}) => {
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
							<div>
								<History data={data} />
							</div>
							<div>
								<Statistics data={data} />
								<Hot data={data} />
								<Options data={data} />
								<Winning data={data} />
							</div>
							<Translation data={data} />
						</div>
			}
		</div>
	);
}

export default Table;
