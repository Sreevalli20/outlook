/**
 * Currency and date formatting helpers
 */

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  try {
    const symbolMap: Record<string, string> = {
      USD: '$',
      INR: '₹',
      EUR: '€',
      GBP: '£',
    };
    const symbol = symbolMap[currency] || currency + ' ';
    return `${symbol}${amount.toLocaleString()}`;
  } catch {
    return `${currency} ${amount}`;
  }
}

export function formatDate(dateString: string, format: string = 'YYYY-MM-DD'): string {
  if (!dateString) return 'N/A';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    if (format === 'DD/MM/YYYY') return `${day}/${month}/${year}`;
    if (format === 'MM/DD/YYYY') return `${month}/${day}/${year}`;
    return `${year}-${month}-${day}`;
  } catch {
    return dateString;
  }
}

export function formatRelativeDeadline(deadlineString: string): {
  text: string;
  isPast: boolean;
  daysRemaining: number;
  urgent: boolean;
} {
  if (!deadlineString) {
    return { text: 'No deadline', isPast: false, daysRemaining: 999, urgent: false };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const deadline = new Date(deadlineString);
  deadline.setHours(0, 0, 0, 0);

  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      text: `Closed ${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? '' : 's'} ago`,
      isPast: true,
      daysRemaining: diffDays,
      urgent: false,
    };
  } else if (diffDays === 0) {
    return {
      text: 'Closes today!',
      isPast: false,
      daysRemaining: 0,
      urgent: true,
    };
  } else if (diffDays === 1) {
    return {
      text: '1 day left',
      isPast: false,
      daysRemaining: 1,
      urgent: true,
    };
  } else if (diffDays <= 7) {
    return {
      text: `${diffDays} days left`,
      isPast: false,
      daysRemaining: diffDays,
      urgent: true,
    };
  } else if (diffDays <= 30) {
    return {
      text: `${diffDays} days left`,
      isPast: false,
      daysRemaining: diffDays,
      urgent: false,
    };
  } else {
    const months = Math.round(diffDays / 30);
    return {
      text: `~${months} month${months > 1 ? 's' : ''} left`,
      isPast: false,
      daysRemaining: diffDays,
      urgent: false,
    };
  }
}

/**
 * Returns a YYYY-MM-DD string for a Date using local timezone
 * (avoids toISOString() shifting the date in non-UTC timezones).
 */
export function toLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
