function src(ident) {
  return `https://assets-zeta.vercel.app/albums/${ident}.jpg`
}

function preload(ident) {
  const image = new Image()
  image.src = src(ident)
}

export default {
  preload,
  src
}
