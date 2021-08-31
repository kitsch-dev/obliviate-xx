import React, { Component } from 'react'
import { If, Then, Else } from 'react-if'
import isEmpty from 'lodash/isEmpty'
import Bar from '../components/albums/bar'
import Layout from '../components/layout'
import image from '../utils/image'
import store from '../utils/store'
import site from '../utils/site'

export default class FirstWeekPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albums: {},
      items: []
    }
  }

  componentDidMount() {
    store.get('/b/qkpE9QMFaE').then(({ data: albums }) => {
      const items = Object.keys(albums).map(id => {
        image.preload(albums[id][1])
        return { id, value: albums[id][2] }
      })
      this.setState({ albums, items })
    })
  }

  render() {
    const page = site.page('first-week')
    const { albums, items } = this.state
    return (
      <Layout title={page?.title}>
        <div className="leading-10 mb-4">
          <h1 className="font-bold text-3xl">{'First Week'}</h1>
        </div>
        <If condition={isEmpty(this.state.items)}>
          <Then>
            <div className="flex items-center justify-center h-56">
              <span className="loading fish"></span>
            </div>
          </Then>
          <Else>
            <Bar albums={albums} items={items} height="460px" />
          </Else>
        </If>
      </Layout>
    )
  }
}
