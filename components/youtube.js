import round from 'round-to'

function YouTubeComponent({
  data: {
    id,
    title,
    viewCount,
    likeCount,
    dislikeCount
  }
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between">
      <div className="flex md:w-7/12">
        <a className="font-bold leading-10 underline truncate" href={`https://www.youtube.com/watch?v=${id}`} target="_blank">{title}</a>
      </div>
      <div className="flex space-x-3 h-10">
        <span className="font-mono leading-10 text-gray-500">{viewCount} 次观看</span>
        <span className="font-mono leading-10 text-gray-500">{likeCount} 赞</span>
      </div>
    </div>
  )
}

export default YouTubeComponent
