import {useTranslation} from "react-i18next";

import Label from "../../../modules/Label";
import Odd from "../Odd";

import style from './index.module.scss';

const Winning = ({data}) => {
	const { t } = useTranslation()
	
	return (
        <>
			<Label text={t('interface.winning_colors')} />
			<div className={style.row}>
				{
					data.statistics.winning.map((el, idx) =>
						<div
							key={idx}
							className={style.cell}
						>
							<Odd
								color={el.num}
								size={'md'}
								data={el.count}
							/>
						</div>
					)
				}
			</div>
        </>
    );
}

export default Winning;
