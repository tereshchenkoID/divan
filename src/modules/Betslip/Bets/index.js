import classNames from "classnames";

import Bet from "./Bet";

import style from './index.module.scss';

const Bets = ({
    betslip,
    stake,
    type,
    setInit,
    setDisabled
}) => {
    return (
        <div className={style.block}>
            <div
                className={
                    classNames(
                        style.row,
                        type === 0 ? style.lg : style.sm
                    )
                }
            >
                <div>Selection</div>
                <div>Odds</div>
                {
                    type === 0 &&
                    <div>Stake</div>
                }
            </div>
            {
                betslip.map((el, idx) =>
                    <div
                        key={idx}
                        className={style.item}
                    >
                        <Bet
                            data={el}
                            betslip={betslip}
                            stake={stake}
                            type={type}
                            setInit={setInit}
                            setDisabled={setDisabled}
                        />
                    </div>
                )
            }
        </div>
    );
}

export default Bets;
