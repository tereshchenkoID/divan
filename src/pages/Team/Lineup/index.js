import {useState, useEffect, useRef} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {fetchData} from "helpers/api";
import {useLocalStorage} from "helpers/localStorage";

import Preloader from "components/Preloader";

import style from './index.module.scss';

const getTeamFormat = (format, data) => {
    const result = {}
    let position = 0

    // eslint-disable-next-line array-callback-return
    format.map((el, idx) => {
        const end = parseInt(el, 10) + parseInt(position, 10)

        result[idx] = {
            data: data.slice(position, end)
        }
        position = end
    })

    return result
}

const getPositionOdd = (idx, length) => {
    let result
    let size = 12
    const center = (length - 1) / 2

    if (length === 1) {
        result = 0
    }
    else {
        if (idx === center) {
            result = 0
        }
        else if (idx < center) {
            result = size * (idx + 1)
        }
        else if (idx > center) {
            result = -size * (idx - center)
        }
    }

    return result
}

const getPositionEven = (idx, length) => {
    let result
    let size = 6
    const center = length / 2

    if (idx < center) {
        result = size * (center - idx)

        if (center > 1 && idx === 0) {
            result = result + size
        }
    }
    else {
        result = -size * (idx - center + 1)

        if (center > 1 && idx - center > 0) {
            result = result - size
        }
    }

    return result
}

const Lineup = () => {
    let url = useParams()
    const { t } = useTranslation()
    const pointRef = useRef([])
    const rowRef = useRef([]);
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [format, setFormat] = useState([])

    const {getLocalStorage} = useLocalStorage()

    useEffect(() => {
        fetchData(`https://stats.fn.sportradar.com/betradar/${getLocalStorage('i18nextLng')}/Europe:Helsinki/gismo/stats_team_usuallineup/${url.team}/${url.league}`).then((data) => {
            setData(data)

            setFormat('1-'.concat(data.doc[0].data.formation).split('-'))
            setLoading(false)
        })
    }, []);

    return (
        <div className={style.block}>
            {
                loading
                    ?
                        <Preloader />
                    :
                        <>
                            <div className={style.head}>ЗВИЧНИЙ СКЛАД (НЕЩОДАВНІ МАТЧІ)</div>
                            <div className={style.wrapper}>
                                <div className={style.column}>
                                    <div className={style.field}>
                                        <svg width="100%" viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
                                            <g>
                                                <defs>
                                                    <mask id="field-soccer-mask">
                                                        <rect x="3" y="3" width="94" height="54" fill="white" />
                                                    </mask>
                                                </defs>
                                                <g>
                                                    <rect x="0" width="100" height="60" fill="#00C57A"></rect>
                                                    <rect x="3" y="3" width="9.4" height="54" fill="#00AB5D" strokeWidth="0.3" />
                                                    <rect x="12.4" y="3" width="9.4" height="54" fill="#00B663" strokeWidth="0.3" />
                                                    <rect x="21.8" y="3" width="9.4" height="54" fill="#00AB5D" strokeWidth="0.3" />
                                                    <rect x="31.200000000000003" y="3" width="9.4" height="54" fill="#00B663" strokeWidth="0.3" />
                                                    <rect x="40.6" y="3" width="9.4" height="54" fill="#00AB5D" strokeWidth="0.3" />
                                                    <rect x="50" y="3" width="9.4" height="54" fill="#00B663" strokeWidth="0.3" />
                                                    <rect x="59.400000000000006" y="3" width="9.4" height="54" fill="#00AB5D" strokeWidth="0.3" />
                                                    <rect x="68.8" y="3" width="9.4" height="54" fill="#00B663" strokeWidth="0.3" />
                                                    <rect x="78.2" y="3" width="9.4" height="54" fill="#00AB5D" strokeWidth="0.3" />
                                                    <rect x="87.60000000000001" y="3" width="9.4" height="54" fill="#00B663" strokeWidth="0.3" />
                                                    <rect x="3" y="3" width="94" height="54" fill="transparent" stroke="#FFF" strokeWidth="0.3" />
                                                </g>
                                                <g>
                                                    <line x1="50" y1="3" x2="50" y2="57" stroke="#FFF" strokeWidth="0.3" />
                                                    <circle cx="50" cy="30" r="7.5" fill="transparent" stroke="#FFF" strokeWidth="0.3" />
                                                    <line x1="49.5" y1="30" x2="50.5" y2="30" stroke="#FFF" strokeWidth="0.3" />
                                                </g>
                                                <g>
                                                    <rect x="3" y="15" width="12.5" height="30" fill="transparent" stroke="#FFF" strokeWidth="0.3" />
                                                    <rect x="3" y="20" width="6" height="20" fill="transparent" stroke="#FFF" strokeWidth="0.3" />
                                                </g>
                                                <g>
                                                    <rect x="84.5" y="15" width="12.5" height="30" fill="transparent" stroke="#FFF" strokeWidth="0.3" />
                                                    <rect x="91" y="20" width="6" height="20" fill="transparent" stroke="#FFF" strokeWidth="0.3" />
                                                </g>
                                                <g>
                                                    {
                                                        Object.values(getTeamFormat(format, data.doc[0].data.players)).map((lineEl, lineIdx) =>
                                                            lineEl.data.map((playerEl, playerIdx) =>
                                                                <g
                                                                    key={playerIdx}
                                                                >
                                                                    <svg
                                                                        className={style.point}
                                                                        width="12"
                                                                        viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
                                                                        x={lineIdx * (100 / format.length) + 2}
                                                                        y={
                                                                            lineEl.data.length % 2 === 0
                                                                                ?
                                                                                    getPositionEven(playerIdx, lineEl.data.length)
                                                                                :
                                                                                    getPositionOdd(playerIdx, lineEl.data.length)
                                                                        }

                                                                        ref={el => pointRef.current[playerEl.shirtnumber] = el}
                                                                        onMouseEnter={(e) => {
                                                                            console.log(rowRef, rowRef.current[playerEl.shirtnumber])
                                                                            rowRef.current[playerEl.shirtnumber].classList.add(style.active)
                                                                        }}
                                                                        onMouseLeave={(e) => {
                                                                            rowRef.current[playerEl.shirtnumber].classList.remove(style.active)
                                                                        }}
                                                                    >
                                                                        <circle
                                                                            cx="50"
                                                                            cy="50"
                                                                            r="27"
                                                                            strokeWidth="2"
                                                                        />
                                                                        <text
                                                                            x="50"
                                                                            y="58"
                                                                            direction="ltr"
                                                                            style={{
                                                                                textAnchor: 'middle',
                                                                                fontSize: 22,
                                                                                fill: '#fff'
                                                                            }}
                                                                        >
                                                                            {playerEl.shirtnumber}
                                                                        </text>
                                                                    </svg>
                                                                </g>
                                                            )
                                                        )
                                                    }
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                                <div className={style.column}>
                                    <div className={style.table}>
                                        {
                                            data.doc[0].data.players.map((rowElement, rowIdx) =>
                                                <div
                                                    key={rowIdx}
                                                    className={style.row}
                                                    ref={el => rowRef.current[rowElement.shirtnumber] = el}
                                                    onMouseEnter={(e) => {
                                                        pointRef.current[rowElement.shirtnumber].classList.add(style.active)
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        pointRef.current[rowElement.shirtnumber].classList.remove(style.active)
                                                    }}
                                                >
                                                    <div className={style.cell}>{rowElement.position.baseshortname}</div>
                                                    <div className={style.cell}>{rowElement.shirtnumber}</div>
                                                    <div className={style.cell}>{rowElement.name}</div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </>
            }
        </div>
    );
}

export default Lineup;
