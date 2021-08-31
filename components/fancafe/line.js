import { ResponsiveLine } from '@nivo/line'

export default function Line({ items, height }) {
  return (
    <div style={{ height }}>
      <ResponsiveLine
        data={items}
        axisLeft={{
          tickSize: 0,
          tickPadding: 12
        }}
        axisBottom={{
          tickPadding: 12,
          tickRotation: -45
        }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear' }}
        margin={{ left: 57, top: 32, right: 12, bottom: 76 }}
        enableSlices={'x'}
        enableGridX={false} />
    </div>
  )
}
