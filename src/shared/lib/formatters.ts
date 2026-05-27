export function formatRelativeDate(input: string | null): string {
  if (!input) {
    return 'Never'
  }

  const target = new Date(input)
  const now = new Date()
  const diffInDays = Math.round(
    (now.getTime() - target.getTime()) / (1000 * 60 * 60 * 24),
  )

  if (diffInDays <= 0) {
    return 'Today'
  }

  if (diffInDays === 1) {
    return '1 day ago'
  }

  if (diffInDays < 30) {
    return `${diffInDays} days ago`
  }

  const diffInMonths = Math.round(diffInDays / 30)
  return `${diffInMonths} month${diffInMonths === 1 ? '' : 's'} ago`
}

export function formatExpiry(input: string | null): string {
  if (!input) {
    return '\u2014'
  }

  const target = new Date(input)
  const now = new Date()
  const diffInDays = Math.ceil(
    (target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  )

  if (diffInDays < 0) {
    return 'Expired'
  }

  if (diffInDays === 0) {
    return 'Today'
  }

  if (diffInDays === 1) {
    return '1 day'
  }

  return `${diffInDays} days`
}

export function formatCalendarDate(input: string): string {
  const date = new Date(input)

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}
