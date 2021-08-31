import React, { Component } from 'react'
import { If, Then, Else } from 'react-if'
import isEmpty from 'lodash/isEmpty'
import Line from '../components/melon/line'
import Layout from '../components/layout'
import store from '../utils/store'
import date from '../utils/date'
import site from '../utils/site'

const isoDateRange = date.dateRange(-7, 0)

function parseCount(value) {
  return value ? parseInt(value[2]) : null
}

export default class MelonDailyPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      '이루리': {},
      'UNNATURAL': {}
    }
  }

  componentDidMount() {
    Promise.all([
      store.get('/b/kzws2arEhg'),
      store.get('/b/KiHUNpZCbx')
    ]).then(response => {
      this.setState({
        '이루리': response[0].data.daily,
        'UNNATURAL': response[1].data.daily
      })
    })
  }

  render() {
    const keys = Object.keys(this.state)
    const page = site.page('melon-daily')
    const items = keys.map(name => ({
      id: name,
      data: isoDateRange.map(date => {
        return {
          x: date,
          y: parseCount(this.state[name][date])
        }
      })
    }))

    const isLoading = isEmpty(this.state['이루리']) ||
                      isEmpty(this.state['UNNATURAL'])
    return (
      <Layout title={page?.title}>
        <div className="leading-10 mb-4">
          <h1 className="font-bold text-3xl">{'As You Wish'}</h1>
        </div>
        <If condition={isLoading}>
          <Then>
            <div className="flex items-center justify-center h-56">
              <span className="loading fish"></span>
            </div>
          </Then>
          <Else>
            <Line items={items} height="460px" />
          </Else>
        </If>
      </Layout>
    )
  }
}
