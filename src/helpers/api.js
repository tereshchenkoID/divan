import {useRequest} from "hooks/useRequest";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { post, get } = useRequest();

export const getData = async (url) => {
    try {
        return await get(url)
    } catch (e) {
        console.log(e)
    }
}


export const postData = async (url, data) => {
    try {
        return await post(url, data)
    } catch (e) {
        console.log(e)
    }
}

