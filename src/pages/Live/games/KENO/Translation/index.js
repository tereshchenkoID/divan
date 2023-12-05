import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import classNames from "classnames";

import {getDifferent} from "helpers/getDifferent";

import Loader from "components/Loader";
import Numbers from "../Numbers";
import Odd from "../Odd";

import {odds} from "../data";

import style from './index.module.scss';

const getDuration = (start, next, delta) => {
    const c = new Date(start).getTime() + delta
    const r = new Date(next - c)
    return r.getMinutes() * 60 + r.getSeconds()
}

const Translation = ({data}) => {
    const {delta} = useSelector((state) => state.delta)
	const {liveTimer} = useSelector((state) => state.liveTimer)
    const {progress} = useSelector((state) => state.progress)
	
    const [numbers, setNumbers] = useState(odds)
    const [current, setCurrent] = useState(0);
    const [columns, setColumn] = useState([[], [], [], []])
	const [loading, setLoading] = useState(true)
	const results = data.round.results
	const scenes = data.round.scenes

    const setActive = (index) => {
        const newData = [...numbers];
        newData[index - 1] = { ...numbers[index - 1], active: true };
        setNumbers(newData);
        
        const newColumns = [...columns]
        newColumns[results.indexOf(index) % 4].push({
            value: newData[index - 1].value,
            transform: Math.floor(Math.random() * 120  - 60),
        })
        setColumn(newColumns)
    }
    
    const initActive = (init) => {
		const newData = [...numbers];
		init.forEach((el) => {
            newData[el - 1].active = true
        })
		
		setNumbers(newData)
		
        const newColumns = Array.from({ length: 4 }, (_, columnIndex) =>
			init
                .filter((_, index) => index % 4 === columnIndex)
                .map((value) => ({
                    value: value,
                    transform: Math.floor(Math.random() * 120  - 60) })
                )
        );

		setColumn(newColumns)
    }
	
	const getIndex = () => {
		const timeDuration = getDuration(data.start, data.nextUpdate, delta)
		const timeCurrent = getDifferent(data.nextUpdate, delta, 1)
		return timeDuration - timeCurrent
	}
	
	useEffect(() => {
		if (current === 0) {
			const init = scenes.filter(el => {
				return el.update <= getIndex()
			})
			
			if (init && init.length !== 0) {
				initActive(results.slice(0, init.length))
				setCurrent(init.length)
			}
		}
		
		setTimeout(() => {
			setLoading(false)
		}, 500)
		
		return () => {
			setCurrent(0)
			setNumbers(odds)
		}
	}, [data])
    
    useEffect(() => {
		if (current < scenes.length && getIndex() === scenes[current].update) {
			setCurrent((prevIndex) => prevIndex + 1)
			setActive(results[Number(current)])
		}
    }, [liveTimer])
	
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
						<>
							<div className={style.row}>
								{
									numbers.map((el, idx) =>
										<div
											key={idx}
											className={
												classNames(
													style.cell,
													el.active && style.active,
												)
											}
										>
											<Odd data={el.value} />
										</div>
									)
								}
							</div>
							{
								progress === 2 &&
								<div className={style.grid}>
									{columns.map((c_el, c_idx) => (
										<div
											key={c_idx}
											className={style.column}
										>
											{c_el.map((el, idx) => (
												<div
													key={idx}
													className={style.odd}
												>
													<Odd
														data={el.value}
														size={'xxl'}
														transform={el.transform}
													/>
												</div>
											))}
										</div>
									))}
								</div>
							}
							{
								progress === 3 &&
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
						</>
			}
        </div>
    );
}

export default Translation;
