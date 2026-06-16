'use client'

import DownloadCvButton from '@/components/download-cv'

const DEFAULT_GOOGLE_DRIVE_VIEW = 'https://drive.google.com/file/d/1rm1qKdR9JDA-ZNeoWp7Lzvox_k95qRWz/view?usp=sharing'
const DEFAULT_GOOGLE_DRIVE_DIRECT = 'https://drive.google.com/uc?export=download&id=1rm1qKdR9JDA-ZNeoWp7Lzvox_k95qRWz'

export default function DownloadCvClient({ cvLink }: { cvLink: string }) {
  // Prefer admin-provided link, otherwise fallback to a direct-download Google Drive URL
  const url = cvLink && cvLink.length > 0 ? cvLink : DEFAULT_GOOGLE_DRIVE_DIRECT
  return <DownloadCvButton url={url} newTab={true} />
}
