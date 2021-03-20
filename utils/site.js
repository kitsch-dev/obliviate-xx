export const paths = [
  { title: 'Daum Cafe', slug: 'daum-cafe' },
  { title: 'First Week', slug: 'first-week' },
  { title: 'As You Wish', slug: 'melon-daily' },
  { title: 'YouTube Official and FanCam', slug: 'youtube-daily' }
]

export function page(slug) {
  return paths.find(page => page.slug === slug)
}

export default {
  paths,
  page
}
