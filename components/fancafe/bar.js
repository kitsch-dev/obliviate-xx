import { animated, to } from '@react-spring/web'
import { Bar } from '@nivo/bar'

function renderBarComponent({ options }) {
  return function BarComponent({
    style: {
      transform,
      width,
      height
    },
    bar
  }) {
    return (
      <animated.g transform={transform}>
        <animated.rect x={-5} y={5} {...{ width, height }} fill="rgba(0, 0, 0, 0.1)" />
        <animated.rect {...{ width, height }} fill={options[bar.data.indexValue][1]} />
        <animated.text x={to(width, w => w - 12)} y={bar.height / 2 - 8} textAnchor="end" dominantBaseline="central" fill={options[bar.data.indexValue][2]} style={{
          fontFamily: 'JetBrains Mono',
          fontWeight: 500,
          fontSize: 17
        }}>
          {
            options[bar.data.indexValue][0]
          }
        </animated.text>
        <animated.text x={to(width, w => w - 12)} y={bar.height / 2 + 12} textAnchor="end" dominantBaseline="central" fill={options[bar.data.indexValue][2]} style={{
          fontFamily: 'JetBrains Mono',
          fontWeight: 400,
          fontSize: 14
        }}>
          {
            bar.data.value
          }
        </animated.text>
      </animated.g>
    )
  }
}

export default function RaceBar({ items, options }) {
  return (
    <Bar
      data={items}
      width={1600}
      height={900}
      axisLeft={null}
      axisTop={{ format: '~s' }}
      axisBottom={{ format: '~s' }}
      enableGridX={true}
      enableGridY={false}
      layout="horizontal"
      motionConfig={{ damping: 26, tension: 170 }}
      barComponent={renderBarComponent({ options })}
      margin={{ left: 5, top: 26, right: 156, bottom: 26 }}
      padding={0.3} />
  )
}
