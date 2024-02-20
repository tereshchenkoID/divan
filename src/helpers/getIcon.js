import { gameType } from 'constant/config'

export const getIcon = data => {
  switch (data) {
    case gameType.FOOTBALL_LEAGUE:
      return 'icon-1'
    case gameType.ROULETTE:
      return 'icon-2'
    case gameType.COLOR_COLOR:
      return 'icon-3'
    case gameType.KENO:
      return 'icon-4'
    case gameType.DOGS_6:
      return 'icon-5'
    case gameType.HORSES_8_VR:
      return 'icon-6'
    default:
      return 'icon-1'
  }
}
