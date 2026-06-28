import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DropHunter — Multi-Chain Airdrop Eligibility Scanner',
  description: 'Scan 10+ chains instantly. See your airdrop eligibility score, gas spent, and Sybil risk — all in one dashboard. 5x faster than DeBank.',
  keywords: 'airdrop, eligibility, crypto, wallet scanner, DeFi, multi-chain, Arbitrum, Base, Optimism, zkSync',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}