

const getWinnings = (stake, decimalPrice) => {
    return stake*decimalPrice;
}

const getAccumulatorPrice = (priceArray) => {
    let result = 1;

    for (let i = 0; i < priceArray.length; i++) {
        result = result * priceArray[i];
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

export const getCoverBetMaxSystem = (priceArray, minAccSize, stake) => {
    let total = 0;

    for(let i = minAccSize; i <= priceArray.length; i++) {
        let perms = getUniquePermutations(priceArray, i);

        for(let j = 0; j < perms.length; j++) {
            total += getAccumulatorPrice(perms[j]) * stake;
        }
    }

    return total;
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

    // eslint-disable-next-line array-callback-return
    data.map((el) => {
        a.push(el.b)
    });

    return a
}

export const getBetMaxSingle = (data, stake) => {
    let a = getOdds(data);
    const add = arr => arr.reduce((a, b) => a + b, 0);

    return add(a);
}
