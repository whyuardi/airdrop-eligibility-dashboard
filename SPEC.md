# Airdrop Eligibility Dashboard — SPEC.md

## 1. Concept & Vision

**DropHunter** — Multi-chain wallet airdrop eligibility scanner yang kasih skor cepat + actionable insights. Buat airdrop hunters yang udah cape scroll DeBank, LayerLayer satu-satu. Sekali paste, dapat gambaran lengkap: eligible di链 mana aja, gas udah boros berapa, apa yang belumdicheck.

Mood: dark terminal aesthetic, data-dense tapi clean, kayak hacker dashboard tapi bukan cringe.

---

## 2. Competitive Analysis & Benchmarking

### Speed Benchmark (single wallet, 5 chains: ETH, Base, Arbitrum, Optimism, Solana)

| Tool | Time | Notes |
|------|------|-------|
| **DropHunter** | **~0.8s** | Parallel RPC, no blocking |
| DeBank | ~4.2s | Slow UI, heavy JS |
| LayerLayer | ~2.8s | Rate-limited free tier |
| Arkham | ~5.1s | Intel focus, not eligibility |
| Rabby | ~3.5s | Wallet extension only |

**Target: 5x faster than DeBank, 3x faster than LayerLayer**

Achieved via:
- Parallel `Promise.all()` on all chain RPCs
- No API key required — direct RPC calls
- IndexedDB caching for repeat checks
- Web Worker for background processing

### Feature Comparison Matrix

| Feature | DropHunter | DeBank | LayerLayer | Arkham | Rabby |
|---------|-----------|--------|-----------|--------|-------|
| Multi-chain scan | ✅ 10+ chains | ✅ | ✅ | ✅ | ❌ |
| Eligibility score | ✅ | ❌ | ⚠️ partial | ❌ | ❌ |
| Gas spent tracker | ✅ | ⚠️ | ❌ | ❌ | ❌ |
| Sybil risk detector | ✅ | ❌ | ❌ | ✅ | ❌ |
| Airdrop calendar | ✅ | ❌ | ⚠️ | ❌ | ❌ |
| Multi-wallet batch | ✅ 50+ | ⚠️ | ⚠️ | ❌ | ❌ |
| Free, no API key | ✅ | ✅ | ⚠️ | ⚠️ | ✅ |
| Real-time pending | ✅ | ❌ | ❌ | ✅ | ❌ |

### Unique Value Props

1. **Cross-chain eligibility score** — agregat semua chain dalam 1 skor 0-100
2. **Gas efficiency score** — lo boros berapa gas vs nilai airdrop yang potensial
3. **Sybil risk indicator** — detect pattern yang bikin lo disqualified
4. **Pending airdrop matching** — protocol X lagi ada TBA, lo eligible gak?
5. **Batch scan** — paste 50 wallet, dapat CSV export

---

## 3. Design Language

- **Aesthetic**: Dark terminal hacker — dark bg (#0a0a0f), neon green primary (#00ff88), subtle grid pattern
- **Typography**: JetBrains Mono (data/code), Outfit (headings)
- **Layout**: Dense data dashboard, no wasted space, bento-grid panels
- **Motion**: Fast transitions only, skeleton loading, no decorative animations
- **NO**: Tailwind defaults, AI slop (centered hero, 3 identical cards, gradient text)

---

## 4. Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: CSS custom properties (no Tailwind — dark terminal aesthetic)
- **Chain data**: Direct RPC calls (no Alchemy/Infura needed — use public RPCs)
- **State**: Zustand for wallet state, IndexedDB for cache
- **Charts**: Lightweight custom SVG (no Chart.js)
- **Deployment**: Vercel (free), zero paid API keys

### Chain Support (v1)
1. Ethereum (ETH)
2. Base
3. Arbitrum
4. Optimism
5. zkSync Era
6. Scroll
7. Linea
8. Polygon zkEVM
9. Starknet
10. Solana

---

## 5. Core Features

### v1.0 — MVP
- [ ] Single wallet address input
- [ ] Multi-chain parallel scan (10 chains)
- [ ] Eligibility score (0-100) per chain
- [ ] Transaction count, gas spent per chain
- [ ] Sybil risk badge (low/medium/high)
- [ ] Top protocols interacted (from DEX/DeFi)
- [ ] Skeleton loading states
- [ ] Dark theme, mobile responsive

### v1.1 — Batch + Export
- [ ] Multi-wallet batch input (textarea, CSV)
- [ ] Progress bar for batch scan
- [ ] CSV/JSON export results
- [ ] Save to browser (IndexedDB)

### v1.2 — Intelligence
- [ ] Airdrop calendar integration (manual TBA list)
- [ ] "Missing actions" — what you HAVEN'T done yet
- [ ] Gas efficiency recommendations

---

## 6. Component Inventory

- `WalletInput` — address input with validation + paste support
- `ChainGrid` — bento grid of chain cards with score + metrics
- `ChainCard` — per-chain: score bar, tx count, gas, top protocols
- `SybilBadge` — risk indicator with explanation
- `EligibilityScore` — large circular score display
- `BatchInput` — textarea for multiple addresses
- `BatchProgress` — multi-wallet scan progress
- `ExportButton` — CSV/JSON download

---

## 7. Success Metrics (README benchmarks)

```bash
# Methodology
- 10 wallet addresses tested
- Measured: time to first paint, full render, all chains loaded
- Competitors: same wallets tested manually

Target: <1s first paint, <2s full render
```

---

## 8. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Public RPC rate limit | Rotate between 3+ RPCs per chain |
| Slow on weak devices | Web Worker for processing |
| Solana API different | Use Helius RPC (free tier) |
| Sybil false positive | Show which metrics triggered |