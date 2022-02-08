import Head from 'next/head'
import Header from './header'
import Footer from './footer'

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header logo="WJSNcosmic" />
      <main>
        <div className="container mx-auto p-5">{children}</div>
      </main>
      <Footer author="Vercel" homepage="https://vercel.com" />
    </>
  )
}
