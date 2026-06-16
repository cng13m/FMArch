export function redirectToPdf(url: string, newTab: boolean = true) {
  if (typeof window === 'undefined') return
  try {
    if (newTab) {
      window.open(url, '_blank', 'noopener,noreferrer')
    } else {
      // Use location replace to preserve history semantics if needed
      window.location.href = url
    }
  } catch (err) {
    // Fallback to setting location
    window.location.href = url
  }
}
