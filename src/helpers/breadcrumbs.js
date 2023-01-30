import {useLocalStorage} from "./localStorage";

const setBreadcrumbs = (id, name, idx) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {getLocalStorage, setLocalStorage} = useLocalStorage()

    const results =  JSON.parse(getLocalStorage('breadcrumbs')) || {}

    if (idx === 0) {
        Reflect.deleteProperty(results, 1);
        Reflect.deleteProperty(results, 2);
    }

    if (idx === 1) {
        Reflect.deleteProperty(results, 2);
    }

    results[idx] = {
        id: id,
        name: name
    }

    setLocalStorage("breadcrumbs", JSON.stringify(results))

    return results
}

export default setBreadcrumbs
