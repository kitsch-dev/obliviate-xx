import { ResponsiveBar } from '@nivo/bar'
import renderTooltip from './tooltip'
import renderTick from './tick'

export default function BarChart({ albums, items, height }) {
  return (
    <div style={{ height }}>
      <ResponsiveBar
        data={items}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 12
        }}
        axisBottom={{
          tickPadding: 12,
          tickRotation: -45,
          renderTick: renderTick({ albums })
        }}
        margin={{ left: 50, top: 50, right: 50, bottom: 115 }}
        padding={0.7}
        gridYValues={5}
        maxValue={80000}
        tooltip={renderTooltip({ albums })}
        colors={({ data }) => albums[data.id][3]}
        enableLabel={false} />
    </div>
  )
}
