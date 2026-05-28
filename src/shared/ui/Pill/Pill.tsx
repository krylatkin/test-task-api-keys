import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'
import './Pill.css'

type PillVariant = 'neutral' | 'accent'
type PillSize = 'md' | 'lg'
type PillShape = 'rounded' | 'circle'

type PillProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: PillVariant
  size?: PillSize
  shape?: PillShape
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
      className={cn(
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
