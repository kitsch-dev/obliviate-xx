import React, { Component } from 'react'
import { If, Then, Else } from 'react-if'
import isEmpty from 'lodash/isEmpty'
import Layout from '../components/layout'
import Chart from '../components/chart'
import store from '../utils/store'
import site from '../utils/site'

export default class FirstWeekPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albums: []
    }
  }

  componentDidMount() {
    store.get('/b/qkpE9QMFaE').then(({ data: albums }) => this.setState({ albums }))
  }

  render() {
    const page = site.page('first-week')
    const categories = this.state.albums.map(({ album }) => album)
    const colors = this.state.albums.map(({ color }) => color)
    const series = [
      {
        name: 'Sales',
        data: this.state.albums.map(({ count }) => count)
      }
    ]

    return (
      <Layout title={page?.title}>
        <div className="leading-10 mb-4">
          <h1 className="font-bold text-3xl">{'First Week'}</h1>
        </div>
        <If condition={isEmpty(this.state.albums)}>
          <Then>
            <div className="flex items-center justify-center h-56">
              <span className="loading fish"></span>
            </div>
          </Then>
          <Else>
            <Chart type="bar" height="460px" series={series} options={{
              chart: {
                toolbar: { show: false },
                zoom: { enabled: false }
              },
              xaxis: {
                categories,
                labels: {
                  style: {
                    colors
                  }
                }
              },
              colors,
              tooltip: {
                theme: 'dark'
              },
              dataLabels: {
                enabled: false
              },
              plotOptions: {
                bar: {
                  distributed: true,
                  columnWidth: '25%'
                }
              }
            }} />
          </Else>
        </If>
      </Layout>
    )
  }
}
