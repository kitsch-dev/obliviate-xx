import React, { Component } from 'react'
import { If, Then, Else } from 'react-if'
import { useRouter } from 'next/router'
import tinykeys from 'tinykeys'
import axios from 'axios'
import store from '../utils/store'
import { Store } from '../utils/cafe'
import RaceBar from '../components/fancafe/bar'

class QueryComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paused: true,
      dateTag: '',
      items: []
    }
  }

  componentDidMount() {
    this.subscribeKeyBindings()
    axios.get(this.props.src).then(({ data }) => {
      const store = new Store(data)
      store.setDateRange('2018.08.30', '2021.08.30')
      this.setState({ items: store.currentState() })
      this.executeInterval({ store })
    })
  }

  componentWillUnmount() {
    this.unsubscribeKeyBindings()
  }

  subscribeKeyBindings() {
    this.unsubscribeKeyBindings = tinykeys(window, {
      'Space': () => this.setState({ paused: !this.state.paused })
    })
  }

  executeInterval({ store }) {
    const _id = setInterval(() => {
      if (store.isEnd()) {
        clearInterval(_id)
      }

      if (!this.state.paused) {
        const dateTag = store.currentDate()
        this.setState({ dateTag, items: store.nextState() })
      }
    }, 100)
  }

  render() {
    const { options } = this.props
    const { dateTag, items } = this.state
    return (
      <>
        <RaceBar items={items} options={options} />
        <div style={{
          fontFamily: 'Monoid',
          fontSize: '2.5rem',
          color: '#002f6c'
        }} className="fixed right-0 bottom-0 p-10">
          <span>{dateTag}</span>
        </div>
      </>
    )
  }
}

export async function getStaticProps() {
  const { data } = await store.get('/b/mbTljVSFLq')
  return { props: { options: data } }
}

export default function FanCafePage({ options }) {
  const router = useRouter()
  return (
    <If condition={!router.query.src}>
      <Then>
        <div className="flex items-center justify-center h-56">
          <span className="loading fish"></span>
        </div>
      </Then>
      <Else>
        <div className="px-20 py-10">
          <QueryComponent src={router.query.src} options={options} />
        </div>
      </Else>
    </If>
  )
}
