import { animated } from '@react-spring/web'

const style = {
  line: {
    stroke: '#ddd',
    strokeWidth: 1
  },
  text: {
    fontFamily: 'IBM Plex Sans Condensed',
    fontWeight: 700,
    fontSize: 13
  }
}

export default function renderTick({ albums }) {
  return function TickComponent({
    animatedProps: {
      textTransform,
      transform
    },
    lineX,
    lineY,
    value
  }) {
    const name = albums[value][0]
    const color = albums[value][3]
    return (
      <animated.g transform={transform}>
        <animated.line x1={0} x2={lineX} y1={0} y2={lineY} style={style.line} />
        <animated.text
          fill={color}
          textAnchor="end"
          transform={textTransform}
          style={style.text}>{name}</animated.text>
      </animated.g>
    )
  }
}
