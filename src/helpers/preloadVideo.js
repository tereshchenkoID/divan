export const preloadVideo = async url => {
  const response = await fetch(url, { mode: 'cors' })
  const videoBlob = await response.blob()
  return URL.createObjectURL(videoBlob)
}
