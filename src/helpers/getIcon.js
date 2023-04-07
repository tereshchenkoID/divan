import {gameType} from "constant/config";

export const getIcon = (data) => {
    switch (data) {
        case gameType.FOOTBALL_LEAGUE:
            return 'icon-1';
        case gameType.ROULETTE:
            return 'icon-2';
        case gameType.COLOR_COLOR:
            return 'icon-3';
        case gameType.KENO:
            return 'icon-4';
        default:
            return 'icon-1'
    }
}
