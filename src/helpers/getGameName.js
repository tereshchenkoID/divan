export const getGameName = (data, name) => {
  const game = data.find(game => game.type === name)
  return game ? game.name : null
}
