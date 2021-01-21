import React, { Component } from 'react'
import Link from 'next/link'
import Layout from '../components/layout'
import { paths } from '../utils/site'

export default class IndexPage extends Component {
  render() {
    return (
      <Layout title="WJSNcosmic">
        <div>
          {
            paths.map(({ title, slug }) => {
              return (
                <h3 key={slug}>
                  <Link href={`/${slug}`}>
                    <a className="font-bold text-xl leading-10 underline truncate">{title}</a>
                  </Link>
                </h3>
              )
            })
          }
        </div>
      </Layout>
    )
  }
}
