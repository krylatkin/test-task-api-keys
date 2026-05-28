export function formatRelativeDate(input: string | null): string {
  if (!input) {
    return 'Never';
  }

  const target = new Date(input);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - target.getTime()) / (1000 * 60 * 60),
  );
  const diffInDays = Math.floor(
    (now.getTime() - target.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffInHours <= 0) {
    return 'Just now';
  }

  if (diffInHours === 1) {
    return '1 hour ago';
  }

  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }

  if (diffInDays <= 0) {
    return 'Today';
  }

  if (diffInDays === 1) {
    return '1 day ago';
  }

  if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  }

  const diffInMonths = Math.round(diffInDays / 30);
  return `${diffInMonths} month${diffInMonths === 1 ? '' : 's'} ago`;
}

export function formatExpiry(input: string | null): string {
  if (!input) {
    return '\u2014';
  }

  const target = new Date(input);
  const now = new Date();
  const diffInDays = Math.ceil(
    (target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffInDays < 0) {
    return '\u2014';
  }

  if (diffInDays === 0) {
    return 'Today';
  }

  if (diffInDays === 1) {
    return 'In 1 day';
  }

  return `In ${diffInDays} days`;
}

export function formatCalendarDate(input: string): string {
  const date = new Date(input);

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
    .format(date)
    .replaceAll('/', '.');
}

export function formatMobileSummary(
  expiresAt: string | null,
  lastUsedAt: string | null,
): string {
  const parts: string[] = [];

  if (expiresAt) {
    const expiryText = formatExpiry(expiresAt);

    if (expiryText !== '\u2014') {
      parts.push(`Expires ${expiryText}`);
    }
  }

  if (!lastUsedAt) {
    parts.push('never used');
  } else {
    parts.push(`used ${formatRelativeDate(lastUsedAt)}`);
  }

  if (parts.length === 0) {
    return 'No usage information yet';
  }

  const [firstPart, ...rest] = parts;
  return [firstPart, ...rest].join(', ');
}
