import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'
import './Badge.css'

type BadgeVariant = 'neutral' | 'accent' | 'danger'
type BadgeSize = 'sm' | 'md'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant
  size?: BadgeSize
}

export function Badge({
  variant = 'neutral',
  size = 'md',
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'badge',
        `badge--${variant}`,
        `badge--${size}`,
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
