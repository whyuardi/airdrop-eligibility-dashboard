import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DropHunter — Airdrop Eligibility Scanner',
  description: 'Scan 10 chains for airdrop eligibility, Sybil risk, and gas spent. Free, fast, no API key.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' fill='%23111'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' font-size='18' font-family='monospace' fill='%23E8001C'>+</text></svg>" />
      </head>
      <body>{children}</body>
    </html>
  )
}