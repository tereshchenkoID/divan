import {dogsColor} from "../constant/config";

export const generateCircles = (data) => {
    const circles = []

    data.split(',').map(el => {
        circles.push({
            id: el,
            color: dogsColor[el - 1]
        })

        return true
    })

    return circles
}
