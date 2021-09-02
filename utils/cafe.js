import dateFormat from 'dateformat'

function dateTag(value) {
  return dateFormat(value, 'yyyy.mm.dd')
}

export class Store {
  constructor(data) {
    this.cache = {}
    this.data = data
    this.keys = Object.keys(data)
  }

  currentState() {
    const items = this.keys.map(name => {
      const date = this.currentDate()
      const currentValue = this.data[name][date]
      const previousValue = this.cache[name] || 0
      return {
        id: name,
        value: currentValue ? currentValue[0] : previousValue
      }
    })

    items.forEach(({ id, value }) => this.cache[id] = value)
    return items.sort((a, b) => a.value - b.value)
  }

  nextState() {
    this.nextDate()
    return this.currentState()
  }

  currentDate() {
    return dateTag(this.timestamp)
  }

  nextDate() {
    this.executeNextDate()
    return dateTag(this.timestamp)
  }

  executeNextDate() {
    this.timestamp += 86_400_000
  }

  setDateRange(from, to) {
    this.timestamp = +new Date(from)
    this.finalTimestamp = +new Date(to)
  }

  isEnd() {
    return this.timestamp >= this.finalTimestamp
  }
}
