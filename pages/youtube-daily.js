import React, { Component } from 'react'
import { If, Then, Else } from 'react-if'
import isEmpty from 'lodash/isEmpty'
import Layout from '../components/layout'
import YouTube from '../components/youtube'
import store from '../utils/store'
import site from '../utils/site'

export default class YouTubeDailyPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      official: [],
      fancam: []
    }
  }

  componentDidMount() {
    store.get('/b/5ffea24768f9f835a3de98d6/latest').then(({ data: official }) => this.setState({ official }))
    store.get('/b/5ffeb153f98f6e35d5fbf31f/latest').then(({ data: fancam }) => this.setState({ fancam }))
  }

  render() {
    const page = site.page('youtube-daily')
    const videos = this.state.official.concat(this.state.fancam)

    return (
      <Layout title={page?.title}>
        <div className="leading-10 mb-4">
          <h1 className="font-bold text-3xl">{'YouTube Official and FanCam'}</h1>
        </div>
        <If condition={isEmpty(videos)}>
          <Then>
            <div className="flex items-center justify-center h-56">
              <span className="loading fish"></span>
            </div>
          </Then>
          <Else>
            {
              videos.map(data => <YouTube key={data.id} data={data} />)
            }
          </Else>
        </If>
      </Layout>
    )
  }
}
