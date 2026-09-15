'use client'

import DownloadCvButton from '@/components/download-cv'

const DEFAULT_CV_LINK = 'https://drive.google.com/file/d/19mp7llVrQ8FYT1kx-okFGRWq2pkBHgdG/view?usp=sharing'

export default function DownloadCvClient({ cvLink }: { cvLink: string }) {
  // Prefer an admin-provided link; otherwise use the current Google Drive CV link.
  const url = cvLink && cvLink.length > 0 ? cvLink : DEFAULT_CV_LINK
  return <DownloadCvButton url={url} newTab={true} />
}
