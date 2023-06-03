import {useRequest} from "hooks/useRequest";

export const getData = async (url) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { get } = useRequest();

    try {
        return await get(url)
    } catch (e) {
        console.log(e)
    }
}

export const postData = async (url, data) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { post } = useRequest();

    try {
        return await post(url, data)
    } catch (e) {
        console.log(e)
    }
}

