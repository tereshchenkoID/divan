import {useSelector} from "react-redux";

import classNames from "classnames";

import Icon from "components/Icon";
import Bet from "./Bet";

import style from './index.module.scss';

const Betslip = () => {
    const {betslip} = useSelector((state) => state.betslip)

    return (
        <div className={style.block}>
            <div className={style.wrapper}>
            {
                betslip.length > 0 &&
                <>
                    <div className={style.row}>
                        <div>Selection</div>
                        <div>Odds</div>
                        <div>Stake</div>
                    </div>
                    <div className={style.list}>
                        {
                            betslip.map((el, idx) =>
                                <div
                                    key={idx}
                                    className={style.item}
                                >
                                    <Bet
                                        data={el}
                                        betslip={betslip}
                                    />
                                </div>
                            )
                        }
                    </div>
                </>
            }
            </div>
            <div>
                <div className={style.stake}>
                    <div>Total Stake</div>
                    <div>400</div>
                </div>
                <div className={style.stake}>
                    <div>Max Total Win</div>
                    <div>400</div>
                </div>
            </div>
            <div className={style.footer}>
                <button
                    className={
                        classNames(
                            style.option,
                            style.red
                        )
                    }
                >
                    <Icon id={'close'} />
                </button>
                <button
                    className={
                        classNames(
                            style.option,
                            style.blue
                        )
                    }
                >
                    <Icon id={'file-times'} />
                </button>
                <button
                    className={
                        classNames(
                            style.option,
                            style.olive
                        )
                    }
                >
                    <Icon id={'dollar'} />
                </button>
                <button
                    className={
                        classNames(
                            style.option,
                            style.green
                        )
                    }
                >
                    <Icon id={'check'} />
                </button>
                <button
                    className={
                        classNames(
                            style.option,
                            style.olive
                        )
                    }
                >
                    <Icon id={'print'} />
                </button>
            </div>
        </div>
    );
}

export default Betslip;
