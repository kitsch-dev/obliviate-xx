import React, { Component } from 'react'
import { If, Then, Else } from 'react-if'
import isEmpty from 'lodash/isEmpty'
import Line from '../components/fancafe/line'
import Layout from '../components/layout'
import store from '../utils/store'
import date from '../utils/date'
import site from '../utils/site'

const isoDateRange = date.dateRange(-9, 1)

function parseCount(value) {
  return value ? parseInt(value.replace(/,/g, '')) : null
}

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
    store.get('/b/7tuyHDi2GI').then(({ data }) => this.setState(data))
    store.get('/b/PKNc04J9Yb').then(({ data }) => this.setState(data))
    store.get('/b/mqnvh8vnjj').then(({ data }) => this.setState(data))
  }

  render() {
    const keys = Object.keys(this.state)
    const page = site.page('daum-cafe')
    const items = keys.map(name => ({
      id: name,
      data: isoDateRange.map(date => {
        return {
          x: date,
          y: parseCount(this.state[name][date])
        }
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
            <Line items={items} height="460px" />
          </Else>
        </If>
      </Layout>
    )
  }
}
