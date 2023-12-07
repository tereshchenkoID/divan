import React from "react";

import classNames from "classnames";

import Label from "../../../modules/Label";
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
	
	return mostCommonColor;
};

const History = ({data}) => {

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
					data.history.map((el, idx) =>
						<React.Fragment key={idx}>
							<div className={style.cell}>#{el.id}</div>
							<div className={style.cell}>
								{
									el.results.map((o_el, o_idx) =>
										<Odd
											key={o_idx}
											color={o_el.color}
											data={o_el.num}
										/>
									)
								}
							</div>
							<div
								className={
									classNames(
										style.cell,
										style.left
									)
								}
							>
								{
									Object.entries(colorCounter(el)).map(([color, count]) =>
										<Odd
											key={color}
											color={color}
											data={count}
										/>
									)
								}
							</div>
							<div className={style.cell}>
								<Odd
									color={findMostCommonColor(colorCounter(el))}
								/>
							</div>
						</React.Fragment>
					)
				}
			</div>
        </div>
    );
}

export default History;
