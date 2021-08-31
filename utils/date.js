import dateFormat from 'dateformat'
import range from 'lodash/range'

function dateRange(...args) {
  const date = Date.now()

  return range(...args)
    .map(item => date + item * 86_400_000)
    .map(date => dateFormat(date, 'isoDate'))
    .map(date => date.replace(/\-/g, '.'))
}

export default { dateRange }
