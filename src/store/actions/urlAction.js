import { SET_URL } from "../actionTypes";

const setUrl = (data) => {
    const r = () => {
        return localStorage.setItem("url", JSON.stringify({url: data}))
    }

    return {
        type: SET_URL,
        payload: data || r
    };
};

export { setUrl };
