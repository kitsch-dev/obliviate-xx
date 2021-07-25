import React, { Component } from 'react'
import { If, Then, Else } from 'react-if'
import isEmpty from 'lodash/isEmpty'
import Layout from '../components/layout'
import Chart from '../components/chart'
import store from '../utils/store'
import date from '../utils/date'
import site from '../utils/site'

const isoDateRange = date.dateRange(-7, 0).map(date => date.replace(/\-/g, '.'))

export default class MelonDailyPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      daily: {}
    }
  }

  componentDidMount() {
    store.get('/b/kzws2arEhg').then(({ data }) => this.setState(data))
  }

  render() {
    const page = site.page('melon-daily')
    const series = [0, 2].map((item, index) => {
      return {
        name: ['排名', '收听人数'][index],
        data: isoDateRange.map(date => {
          return this.state.daily[date] ? this.state.daily[date][item] : null
        })
      }
    })

    return (
      <Layout title={page?.title}>
        <div className="leading-10 mb-4">
          <h1 className="font-bold text-3xl">{'As You Wish'}</h1>
        </div>
        <If condition={isEmpty(this.state.daily)}>
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
              yaxis: [
                {
                  min: 1,
                  max: 1000,
                  reversed: true
                },
                {
                  opposite: true
                }
              ],
              colors: [
                '#34d399',
                '#60a5fa'
              ],
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
