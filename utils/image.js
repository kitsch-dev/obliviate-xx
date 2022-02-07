import resource from './resource'

function src(ident) {
  return `https://p1.music.126.net/${resource[ident]}.jpg?param=460y460`
}

function preload(ident) {
  const image = new Image()
  image.src = src(ident)
}

export default {
  preload,
  src
}
