import {getDifferent} from "helpers/getDifferent";

const announcementTimer = (update, delta) => {
    return getDifferent(update, delta)
}

export default announcementTimer;
