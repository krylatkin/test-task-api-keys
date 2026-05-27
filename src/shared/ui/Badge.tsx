import './Badge.css'
import type { HTMLAttributes } from 'react'

type BadgeVariant = 'neutral' | 'accent' | 'danger'
type BadgeSize = 'sm' | 'md'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant
  size?: BadgeSize
}

function joinClassNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ')
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
      className={joinClassNames(
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
