import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {deleteBetslip} from "store/actions/betslipAction";

const deleteBets = (data, now) => {
    const a = []

    for(let i = 0; i < data.length; i++) {
        if(data[i].start > now) {
            a.push(data[i])
        }
    }

    return a
}

const clearActiveBets = (data, now) => {
    const f = data.find(el => {
        return el.start < now
    })

    return f ? deleteBets(data, now) : null
}

const ClearResults = ({date}) => {
    const dispatch = useDispatch()
    const {betslip} = useSelector((state) => state.betslip)

    useEffect(() => {
        if(betslip.length > 0) {
            const a = clearActiveBets(betslip, date)
            if (a) {
                dispatch(deleteBetslip(a))
            }
        }
    }, [betslip, date])

    return null
}

export default ClearResults;
