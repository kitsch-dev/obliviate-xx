import Link from 'next/link'

export default ({ logo }) => {
  return (
    <header>
      <div className="container mx-auto p-5">
        <div className="flex items-center justify-between h-10">
          <Link href="/">
            <a className="font-bold text-2xl leading-10">{logo}</a>
          </Link>
        </div>
      </div>
    </header>
  )
}
