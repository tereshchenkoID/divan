import {oddsType} from "constant/config";

const getAccumulatorPrice = (priceArray) => {
    let result = 1;

    for (let i = 0; i < priceArray.length; i++) {
        result = result * priceArray[i];
    }

    return result;
}

const getAccumulatorPrices = (priceArray) => {
    let result = 1;

    for (let i = 0; i < priceArray.length; i++) {
        result = result * priceArray[i].b;
    }

    return result;
}

const twoDimArrayUnion = (arr1, arr2) => {
    for(let i = 0; i < arr2.length; i++)
    {
        let duplicate = false;

        for(let j = 0; j < arr1.length; j++)

            if(arr1[j].length === arr2[i].length)

                for(let k = 0; k < arr1[j].length; k++)

                    if(arr1[j][k] !== arr2[i][k])
                        break;
                    else if(k === arr1[j].length-1)
                        duplicate = true;

        if(!duplicate)
            arr1.push(arr2[i]);
    }

    return arr1;
}

export const getUniquePermutations = (arr, permLength) => {
    if(arr.length <= permLength)
        return [arr];

    let permutations = [];
    let newArr = [];

    newArr = arr.slice(0);

    for(let i = 0; i < arr.length; i++)
    {
        newArr = arr.slice(0);
        newArr.splice(i, 1);
        permutations = twoDimArrayUnion(permutations,(getUniquePermutations(newArr, permLength)));
    }

    return permutations;
}

const calculateBetsCombinations = (bets) => {
    const r = [];
    let combiCount = {};

    for (let i = 0; i < bets.length; i++) {
        const currentBets = bets[i];
        const combinations = [];

        for (let j = 0; j < currentBets.length; j++) {
            const currentObject = currentBets[j];
            // const currentNumber = currentObject.b;
            const currentId = currentObject.id;

            for (let k = 0; k < r.length; k++) {
                const existingCombination = r[k];

                let canUse = true;
                for (let l = 0; l < existingCombination.length; l++) {
                    const existingObject = existingCombination[l];
                    if (existingObject.id === currentId) {
                        canUse = false;
                        break;
                    }
                }

                if (canUse) {
                    combinations.push([...existingCombination, currentObject]);
                }
            }
        }

        for (let j = 0; j < currentBets.length; j++) {
            const currentObject = currentBets[j];
            combinations.push([currentObject]);
        }

        r.push(...combinations);

        for (let j = 0; j < combinations.length; j++) {
            const currentCombination = combinations[j];
            const currentCombinationLength = currentCombination.length;
            if (currentCombinationLength >= 2) {
                if (combiCount[currentCombinationLength]) {
                    combiCount[currentCombinationLength]++;
                } else {
                    combiCount[currentCombinationLength] = 1;
                }
            }
        }
    }

    const countList = Object.keys(combiCount).map((key) => {
        return { gr: Number(key), combi: combiCount[key] };
    });

    return { r, countList };
}

export const getSystemBetMinMaxSystem = (data, type) => {
    const r = []
    for(let i = 0; i < data.length; i++) {
        r.push(getAccumulatorPrices(data[i]))
    }

    // console.log(r)

    switch (type) {
        case 0:
            return Math.min(...r)
        case 1:
            return Math.max(...r)
        case 2:
            const add = arr => arr.reduce((a, b) => a + b, 0);
            return add(r);
        default:
            return 0;
    }
}

export const getSystemCombination = (arr) => {
    let r = {}

    if (arr.length) {
        for(let i = 0; i < arr.length; i++) {
            if (r[arr[i].mid]) {
                r[arr[i].mid].push({
                    id: arr[i].id,
                    b: arr[i].b
                })
            }
            else {
                r[arr[i].mid] = [{
                    id: arr[i].id,
                    b: arr[i].b
                }]
            }
        }
    }

    return calculateBetsCombinations(Object.values(r))
}

export const getCoverBetMaxSingle = (data) => {
    let result = 0;

    for (let i = 0; i < data.length; i++) {
        result += data[i].stake > 0 ? data[i].b * data[i].stake : 0
    }

    return result;
}

export const getCoverStakeMaxSystem = (data) => {
    let result = 0;

    for (let i = 0; i < data.length; i++) {
        result += data[i].maxWin
    }

    return result;
}

export const getBetMinMaxSystem = (data, type) => {
    const r = []
    for(let i = 0; i < data.length; i++) {
        r.push(getAccumulatorPrice(data[i]))
    }

    switch (type) {
        case 0:
            return Math.min(...r)
        case 1:
            return Math.max(...r)
        case 2:
            const add = arr => arr.reduce((a, b) => a + b, 0);
            return add(r);
        default:
            return 0;
    }
}

export const getOdds = (data) => {
    let a = []

    for(let i = 0; i < data.length; i++) {
        a.push(data[i].b)
    }

    return a
}

export const getBetMaxSingle = (data) => {
    let a = getOdds(data);
    const add = arr => arr.reduce((a, b) => a + b, 0);

    return add(a);
}

export const getMinMaxOdd = (data, type) => {
    const a = data.slice(0).sort((a, b) => type === 0 ? a.b - b.b : b.b - a.b)[0]
    return a ? a.b : 0;
}

export const getTotalStakeSingle = (data) => {
    let result = 0

    for(let i = 0; i < data.length; i++) {
        result += parseFloat(data[i].stake)
    }

    return result
}

export const getTotalStakeSystem = (data, mode) => {
    let result = 0

    for (let i = 0; i < data.length; i++) {
        result = mode === oddsType.PER_BET ? result + parseFloat(data[i].stake) : result + parseFloat(data[i].stake) * data[i].combi
    }

    return result
}
