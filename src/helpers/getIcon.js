export const getIcon = (data) => {
    switch (data) {
        case "FOOTBALL_LEAGUE":
            return 'icon-1';
        case "ROULETTE":
            return 'icon-2';
        case "COLOR_COLOR":
            return 'icon-3';
        default:
            return 'icon-1'
    }
}
