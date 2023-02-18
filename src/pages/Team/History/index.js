import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine, ResponsiveContainer } from 'recharts';

import {fetchData} from "helpers/api";
import {useLocalStorage} from "helpers/localStorage";

import Loading from "components/Loading";

import style from './index.module.scss';

const getColor = (id) => {
    const data = {
        1: '#66b0d6',
        26: '#98e9fb',
        49: '#fd6',
        8: '#ff6673',
        7: '#eb0618'
    }

    return data[id]
}


const setLevel = (data) => {
    const result = []
    let id = 0

    // eslint-disable-next-line array-callback-return
    data.map((el, idx) => {

        if (id !== el._id) {
            const arr = data.filter(s => s._id === el._id)

            id = el._id
            result.push({
                id: el._id,
                color: getColor(el._id),
                label: el.name,
                position: el.position,
                count: arr.length
            })
        }
    })

    console.log(result)
    return result
}

const getTicks = (count) => {
    const result = [0]

    Array.from({length: count}).forEach((el, idx) => {
        result.push(idx + 1)
    })

    return result
}

const History = () => {
    let url = useParams()
    // const { t } = useTranslation()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const {getLocalStorage} = useLocalStorage()

    useEffect(() => {
        fetchData(`https://stats.fn.sportradar.com/betradar/${getLocalStorage('i18nextLng')}/Europe:Helsinki/gismo/stats_season_teampositionhistory/${url.league}/${url.team}`).then((data) => {
            setData(data)
            setLoading(false)
        })
    }, []);

    return (
        <div className={style.block}>
            {
                loading
                    ?
                        <Loading />
                    :
                        <>
                            <div className={style.head}> ПОЗИЦІЯ КОМАНДИ</div>
                            <div className={style.wrapper}>
                                <ResponsiveContainer width={"100%"} height={data.doc[0].data.teamcount * 30}>
                                    <LineChart
                                        data={Object.values(data.doc[0].data.currentseason)[0]}
                                        margin={{
                                            top: 10,
                                            right: 10,
                                            left: -30,
                                            bottom: 10,
                                        }}
                                    >
                                        <CartesianGrid
                                            strokeDasharray="0.5 10"
                                            stroke="var(--sub-text)"
                                        />
                                        <XAxis
                                            dataKey={'round'}
                                            interval={1}
                                        />
                                        <YAxis
                                            dataKey={'position'}
                                            reversed={true}
                                            domain={[0, data.doc[0].data.teamcount]}
                                            ticks={getTicks(data.doc[0].data.teamcount)}
                                            tickSize={5}
                                            interval={0}
                                        />
                                        {
                                            setLevel(Object.values(data.doc[0].data.positiondata)).map((el, idx) =>
                                                <ReferenceLine
                                                    key={idx}
                                                    y={el.position}
                                                    stroke={el.color}
                                                    strokeDasharray="5 5"
                                                    strokeOpacity={0.4}
                                                    strokeWidth={2}
                                                    label={{
                                                        value: el.label,
                                                        fill: el.color
                                                    }}
                                                />
                                            )
                                        }
                                        <Line
                                            type="linear"
                                            dataKey="position"
                                            stroke="var(--brand)"
                                            activeDot={{ r: 12 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                                <div className={style.legend}>
                                    {
                                        setLevel(Object.values(data.doc[0].data.positiondata)).map((el, idx) =>
                                            <div className={style.label}>
                                                <div
                                                    className={style.marker}
                                                    style={{
                                                        backgroundColor: el.color
                                                    }}
                                                />
                                                <div>{el.label}</div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </>
            }
        </div>
    );
}

export default History;
