import React, { Component } from 'react'
import { If, Then, Else } from 'react-if'
import isEmpty from 'lodash/isEmpty'
import Layout from '../components/layout'
import Chart from '../components/chart'
import store from '../utils/store'
import date from '../utils/date'
import site from '../utils/site'

const isoDateRange = date.dateRange(-6, 1)

export default class DaumCafePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      '-ohmygirl': {},
      'WJSNcosmic': {},
      'cube-g-i-dle': {}
    }
  }

  componentDidMount() {
    store.get('/b/600066264f42973a289cde3b/latest').then(({ data }) => this.setState(data))
    store.get('/b/5ffeb19868f9f835a3de9e26/latest').then(({ data }) => this.setState(data))
    store.get('/b/6000668ff98f6e35d5fc791b/latest').then(({ data }) => this.setState(data))
  }

  render() {
    const keys = Object.keys(this.state)
    const page = site.page('daum-cafe')
    const series = keys.map(name => ({
      name,
      data: isoDateRange.map(date => {
        const count = this.state[name][date]
        return count ? count.replace(/,/g, '') : null
      })
    }))

    const isLoading = isEmpty(this.state['-ohmygirl']) ||
                      isEmpty(this.state['WJSNcosmic']) ||
                      isEmpty(this.state['cube-g-i-dle'])
    return (
      <Layout title={page?.title}>
        <div className="leading-10 mb-4">
          <h1 className="font-bold text-3xl">{'Daum Cafe'}</h1>
        </div>
        <If condition={isLoading}>
          <Then>
            <div className="flex items-center justify-center h-56">
              <span className="loading fish"></span>
            </div>
          </Then>
          <Else>
            <Chart type="line" height="460px" series={series} options={{
              chart: {
                toolbar: { show: false },
                zoom: { enabled: false }
              },
              labels: isoDateRange,
              stroke: {
                width: [3, 3, 3],
                curve: 'straight'
              },
              tooltip: {
                theme: 'dark'
              }
            }} />
          </Else>
        </If>
      </Layout>
    )
  }
}
