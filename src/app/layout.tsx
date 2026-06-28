import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DropHunter — OSINT Airdrop Scanner',
  description: 'Scan 10 chains for airdrop eligibility, Sybil risk & gas spent. 5x faster than DeBank.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}