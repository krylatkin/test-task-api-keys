import './Pill.css'
import type { HTMLAttributes } from 'react'

type PillVariant = 'neutral' | 'accent'
type PillSize = 'md' | 'lg'
type PillShape = 'rounded' | 'circle'

type PillProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: PillVariant
  size?: PillSize
  shape?: PillShape
}

function joinClassNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ')
}

export function Pill({
  variant = 'neutral',
  size = 'md',
  shape = 'rounded',
  className,
  children,
  ...props
}: PillProps) {
  return (
    <span
      className={joinClassNames(
        'pill',
        `pill--${variant}`,
        `pill--${size}`,
        `pill--${shape}`,
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
