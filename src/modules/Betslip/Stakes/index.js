import Stake from "./Stake";

import style from './index.module.scss';

const Stakes = ({
    stake,
    setInit,
}) => {
    return (
        <div className={style.block}>
            <div className={style.thead}>
                <div className={style.tr}>
                    <div className={style.th}>GR</div>
                    <div className={style.th}>Combi</div>
                    <div className={style.th}>
                        <div className={style.th}>Odds</div>
                        <div className={style.tr}>
                            <div className={style.th}>Min</div>
                            <div className={style.th}>Max</div>
                        </div>
                    </div>
                    <div className={style.th}>Stake / Bet</div>
                </div>
            </div>
            <div className={style.tbody}>
                {
                    stake.map((el, idx) =>
                        <div
                            key={idx}
                            className={style.item}
                        >
                            <Stake
                                key={idx}
                                data={el}
                                setInit={setInit}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Stakes;
