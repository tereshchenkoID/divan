export const getLogo = (games, id) => {
  return games.filter(game => game.id === id)[0].logo
}
