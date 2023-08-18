import {getDifferent} from "helpers/getDifferent";

const progressTimer = (update, delta) => {
    return getDifferent(update, delta)
}

export default progressTimer;
