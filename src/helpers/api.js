import {useRequest} from "hooks/useRequest";

export const fetchData = async (url) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { get } = useRequest();

    try {
        return await get(url)
    } catch (e) {
        console.log(e)
    }
}

export default fetchData
