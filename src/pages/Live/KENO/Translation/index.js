import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import classNames from "classnames";

import {getDifferent} from "helpers/getDifferent";

import Numbers from "../Numbers";
import Odd from "../Odd";

import style from './index.module.scss';
import Loader from "../../../../components/Loader";


const getDuration = (start, next, delta) => {
    const c = new Date(start).getTime() + delta
    const r = new Date(next - c)
    return r.getMinutes() * 60 + r.getSeconds()
}

const Translation = ({data}) => {
    const {delta} = useSelector((state) => state.delta)
    const {progress} = useSelector((state) => state.progress)
    
    const [numbers, setNumbers] = useState([
        {value: 1, active: false},
        {value: 2, active: false},
        {value: 3, active: false},
        {value: 4, active: false},
        {value: 5, active: false},
        {value: 6, active: false},
        {value: 7, active: false},
        {value: 8, active: false},
        {value: 9, active: false},
        {value: 10, active: false},
        {value: 11, active: false},
        {value: 12, active: false},
        {value: 13, active: false},
        {value: 14, active: false},
        {value: 15, active: false},
        {value: 16, active: false},
        {value: 17, active: false},
        {value: 18, active: false},
        {value: 19, active: false},
        {value: 20, active: false},
        {value: 21, active: false},
        {value: 22, active: false},
        {value: 23, active: false},
        {value: 24, active: false},
        {value: 25, active: false},
        {value: 26, active: false},
        {value: 27, active: false},
        {value: 28, active: false},
        {value: 29, active: false},
        {value: 30, active: false},
        {value: 31, active: false},
        {value: 32, active: false},
        {value: 33, active: false},
        {value: 34, active: false},
        {value: 35, active: false},
        {value: 36, active: false},
        {value: 37, active: false},
        {value: 38, active: false},
        {value: 39, active: false},
        {value: 40, active: false},
        {value: 41, active: false},
        {value: 42, active: false},
        {value: 43, active: false},
        {value: 44, active: false},
        {value: 45, active: false},
        {value: 46, active: false},
        {value: 47, active: false},
        {value: 48, active: false},
        {value: 49, active: false},
        {value: 50, active: false},
        {value: 51, active: false},
        {value: 52, active: false},
        {value: 53, active: false},
        {value: 54, active: false},
        {value: 55, active: false},
        {value: 56, active: false},
        {value: 57, active: false},
        {value: 58, active: false},
        {value: 59, active: false},
        {value: 60, active: false},
        {value: 61, active: false},
        {value: 62, active: false},
        {value: 63, active: false},
        {value: 64, active: false},
        {value: 65, active: false},
        {value: 66, active: false},
        {value: 67, active: false},
        {value: 68, active: false},
        {value: 69, active: false},
        {value: 70, active: false},
        {value: 71, active: false},
        {value: 72, active: false},
        {value: 73, active: false},
        {value: 74, active: false},
        {value: 75, active: false},
        {value: 76, active: false},
        {value: 77, active: false},
        {value: 78, active: false},
        {value: 79, active: false},
        {value: 80, active: false}
    ])
    const [current, setCurrent] = useState(0);
    const [columns, setColumn] = useState([[], [], [], []])
	const [delay, setDelay] = useState(0)
	const [loading, setLoading] = useState(true)
	const results = data.round.results
	
	// const [load, setLoad] = useState([])
    // const [time, setTime] = useState(0)
    // const [duration, setDuration] = useState(0)
    
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
        console.log(newColumns)
    }
    
    useEffect(() => {
        const timeDuration = getDuration(data.start, data.nextUpdate, delta)
        const timeDelay = timeDuration / 20
        const timeCurrent = getDifferent(data.nextUpdate, delta, 1)
		const timeIndex = Math.round((timeDuration - timeCurrent) / timeDelay)
        setDelay(timeDelay)
		
		// const a = {
		// 	value: Math.floor((timeDuration - timeCurrent) / timeDelay),
		// 	default: results,
		// 	results: results.slice(0, Math.round((timeDuration - timeCurrent) / timeDelay)),
		// 	time: timeCurrent,
		// 	delay: timeDelay,
		// 	duration: timeDuration
		// }
		
		if (timeCurrent < timeDuration) {
			setCurrent(timeIndex)
			initActive(results.slice(0, timeIndex))
		}
    }, [])
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (current === results.length) {
                clearInterval(intervalId)
                return false
            }
            else {
                setCurrent((prevIndex) => prevIndex + 1)
                setActive(results[Number(current)])
            }
        }, delay * 1000)

        return () => {
            clearInterval(intervalId);
        }
    }, [current]);
	
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
