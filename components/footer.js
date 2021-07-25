export default function Footer({ author, homepage }) {
  return (
    <footer>
      <div className="container mx-auto p-5">
        <div className="text-center leading-10 truncate">
          Built using <a href="https://nextjs.org">Next.js</a> and maintained by <a href={homepage}>{author}</a>
        </div>
      </div>
    </footer>
  )
}
