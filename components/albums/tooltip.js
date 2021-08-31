import image from '../../utils/image'

export default function renderTooltip({ albums }) {
  return function TooltipComponent({
    indexValue,
    value
  }) {
    const name = albums[indexValue][0]
    const ident = albums[indexValue][1]
    const color = albums[indexValue][3]
    return (
      <div className="overflow-hidden rounded border border-gray-300 bg-white">
        <img className="w-32 h-32" src={image.src(ident)} />
        <div className="flex flex-col w-32 px-2 py-1">
          <span className="font-bold truncate" style={{ color }}>{name}</span>
          <span className="text-sm text-gray-600">{`Total: ${value}`}</span>
        </div>
      </div>
    )
  }
}
