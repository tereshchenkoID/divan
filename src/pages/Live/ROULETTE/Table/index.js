import {useState, useEffect} from "react";

import Loader from "components/Loader";
import Pay from "../Pay";
import Numbers from "../Numbers";
import Colors from "../Colors";
import History from "../History";
import Dozens from "../Dozens";
import Hot from "../Hot";

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
						<div className={style.wrapper}>
							<div className={style.column}>
								<div className={style.wheel}>
									<iframe title={'Wheel'} src="https://api.qool90.bet/iframe/wheel/" frameBorder="0" />
								</div>
							</div>
							<div className={style.column}>
								<div className={style.grid}>
									<div>
										<Hot data={data} />
									</div>
									<div>
										<Dozens data={data} />
									</div>
									<div>
										<Colors data={data} />
									</div>
									<div>
										<History data={data} />
									</div>
									<div>
										<Pay />
									</div>
									<div>
										<Numbers data={data} />
									</div>
								</div>
							</div>
					</div>
			}
        </div>
    );
}

export default Table;
