import type { CSSProperties } from 'react'

type Props = {
  className?: string
  style?: CSSProperties
  size?: number
  color?: string
}

export function CornerTicks({ className = '', style, size = 10, color }: Props) {
  const tickStyle: CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    pointerEvents: 'none',
    zIndex: 2,
    ...(color ? { color } : {}),
  }

  return (
    <div className={`corner-ticks ${className}`} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', ...style }}>
      {/* Top Left */}
      <span
        className="corner-tick corner-tl"
        style={{
          ...tickStyle,
          top: -1,
          left: -1,
          borderTop: '1.5px solid currentColor',
          borderLeft: '1.5px solid currentColor',
        }}
      />
      {/* Top Right */}
      <span
        className="corner-tick corner-tr"
        style={{
          ...tickStyle,
          top: -1,
          right: -1,
          borderTop: '1.5px solid currentColor',
          borderRight: '1.5px solid currentColor',
        }}
      />
      {/* Bottom Left */}
      <span
        className="corner-tick corner-bl"
        style={{
          ...tickStyle,
          bottom: -1,
          left: -1,
          borderBottom: '1.5px solid currentColor',
          borderLeft: '1.5px solid currentColor',
        }}
      />
      {/* Bottom Right */}
      <span
        className="corner-tick corner-br"
        style={{
          ...tickStyle,
          bottom: -1,
          right: -1,
          borderBottom: '1.5px solid currentColor',
          borderRight: '1.5px solid currentColor',
        }}
      />
    </div>
  )
}

