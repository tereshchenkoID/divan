export const useLocalStorage = () => {

    const getLocalStorage = (key) => {
        return localStorage.getItem(key)
    }

    const setLocalStorage = (key, data) => {
        localStorage.setItem(key, data)
    }

    return {
        getLocalStorage,
        setLocalStorage,
    }
}
