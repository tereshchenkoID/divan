import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import classNames from "classnames";

import {getDifferent} from "helpers/getDifferent";

import Odd from "../Odd";

import style from './index.module.scss';

const colorCounter = ({ results }) => {
	return results.reduce((counts, {color}) => {
		counts[color] = (counts[color] || 0) + 1;
		return counts;
	}, {})
}

const findMostCommonColor = (data) => {
	let mostCommonColor = '';
	let maxCount = 0;

	Object.entries(data).forEach(([color, count]) => {
		if (count > maxCount) {
			mostCommonColor = color;
			maxCount = count;
		}
	});

	return maxCount >= 3 ? mostCommonColor : 'draw';
};

const getDuration = (start, next, delta) => {
	const c = new Date(start).getTime() + delta
	const r = new Date(next - c)
	return r.getMinutes() * 60 + r.getSeconds()
}

const Translation = ({data}) => {
	const {delta} = useSelector((state) => state.delta)
	const {progress} = useSelector((state) => state.progress)
	const {liveTimer} = useSelector((state) => state.liveTimer)
	const [current, setCurrent] = useState(0);
	const [columns, setColumn] = useState([])
	const scenes = data.round.scenes
	
	const getIndex = () => {
		const timeDuration = getDuration(data.start, data.nextUpdate, delta)
		const timeCurrent = getDifferent(data.nextUpdate, delta, 1)
		return timeDuration - timeCurrent
	}
	
	useEffect(() => {
		if(progress === 2) {
			console.log("1")
			setCurrent(0)
			setColumn([])
		}
	}, [progress])
	
	useEffect(() => {
		if (progress === 1 || progress === 3) {
			setColumn(data.history[0].results)
		}
		else {
			if (scenes && current === 0) {
				const init = scenes.filter(el => {
					return el.update <= getIndex()
				})
				
				setCurrent(init.length)
				setColumn(scenes.slice(0, init.length))
			}
		}
	}, [data])
	
	useEffect(() => {
		if (scenes && current < scenes.length && getIndex() === scenes[current].update) {
			const active = scenes[Number(current)]
			setCurrent((prevIndex) => prevIndex + 1)
			setColumn((prevIndex) => [...prevIndex, {
				color: active.color,
				num: active.num
			}])
		}
	}, [liveTimer])
	
	return (
        <div className={style.block}>
			<div className={style.row}>
				<div
					className={
						classNames(
							style.row,
							(progress === 2 && columns.length > 0) && style.active,
						)
					}
				>
					{
						columns.map((el, idx) =>
							<div
								key={idx}
								className={style.odd}
							>
								<Odd
									key={idx}
									size={'xxl'}
									color={el.color}
									data={el.num}
								/>
							</div>
						)
					}
				</div>
			</div>
			{
				(progress === 1 || progress === 3) &&
				<div>
					<div className={style.grid}>
						{
							Object.entries(colorCounter(data.history[0])).map(([color, count]) =>
								<div key={color}>
									<Odd
										color={color}
										size={'md'}
										data={count}
									/>
								</div>
							)
						}
					</div>
					<div>{findMostCommonColor(colorCounter(data.history[0]))}</div>
				</div>
			}
        </div>
    );
}

export default Translation;
