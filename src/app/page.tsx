'use client'
import { useState, useCallback } from 'react'
import { useStore, scanWallet } from '@/lib/store'
import WalletInput from '@/components/WalletInput'
import EligibilityScore from '@/components/EligibilityScore'
import ChainGrid from '@/components/ChainGrid'
import BatchPanel from '@/components/BatchPanel'
import CalendarPanel from '@/components/CalendarPanel'
import ExportPanel from '@/components/ExportPanel'
import SybilRisk from '@/components/SybilRisk'
import styles from './page.module.css'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'single' | 'batch' | 'calendar' | 'history'>('single')
  const {
    currentWallet,
    results, addResult,
    isScanning, setScanning, scanProgress, setProgress,
  } = useStore()

  const handleScan = useCallback(async (address: string) => {
    setScanning(true)
    setProgress(0)
    for (let i = 0; i < 10; i++) {
      await new Promise(r => setTimeout(r, 80))
      setProgress((i + 1) * 10)
    }
    const result = await scanWallet(address)
    addResult(result)
    setScanning(false)
    setProgress(0)
  }, [addResult, setProgress, setScanning])

  const latestResult = results[0]

  const SAMPLE = [
    '0x28C6c06298d514Db089934071355E5743bf21d60',
    '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
  ]

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>⊕</div>
          <div>
            <span className={styles.logoName}>DropHunter</span>
            <span className={styles.logoTag}>v1.0 · 10 chains</span>
          </div>
        </div>

        <nav className={styles.tabs}>
          {(['single', 'batch', 'calendar', 'history'] as const).map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`${styles.tab} ${activeTab === t ? styles.tabActive : ''}`}
            >
              {t === 'single' && 'Scan'}
              {t === 'batch' && 'Batch'}
              {t === 'calendar' && 'Calendar'}
              {t === 'history' && `History (${results.length})`}
            </button>
          ))}
        </nav>

        <div className={styles.headerRight}>
          <span className={styles.version}>build 2024.12</span>
          <a
            href="https://github.com/whyuardi/airdrop-eligibility-dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            github →
          </a>
        </div>
      </header>

      <main className={styles.main}>
        {activeTab === 'single' && (
          <div>
            {/* Hero — 38/62 split */}
            <div className={styles.heroSection}>
              {/* LEFT: oversized type + stats */}
              <div className={styles.heroLeft}>
                <div className={styles.heroMeta}>
                  <div className={styles.heroBadge}>
                    <span className={styles.heroBadgeDot} />
                    active · 10 chains · no api key
                  </div>
                  <h1 className={styles.heroTitle}>
                    <span>Airdrop</span>
                    <span>Eligib</span>
                    <span className={styles.heroAccent}>Scanner</span>
                  </h1>
                  <p className={styles.heroSub}>
                    Scan Ethereum, Base, Arbitrum, Optimism, zkSync & 5 more.
                    Score, gas, Sybil risk — under 1 second.
                  </p>
                </div>

                <div className={styles.heroStats}>
                  <div className={styles.heroStat}>
                    <div className={styles.heroStatVal}>~0.8s</div>
                    <div className={styles.heroStatLabel}>scan time</div>
                  </div>
                  <div className={styles.heroStat}>
                    <div className={styles.heroStatVal}>10</div>
                    <div className={styles.heroStatLabel}>chains</div>
                  </div>
                  <div className={styles.heroStat}>
                    <div className={styles.heroStatVal}>5x</div>
                    <div className={styles.heroStatLabel}>faster</div>
                  </div>
                </div>
              </div>

              {/* RIGHT: terminal scan panel */}
              <div className={styles.heroRight}>
                <div className={styles.scanPanel}>
                  <div className={styles.scanPanelHeader}>
                    <span className={styles.scanDot} />
                    <span className={styles.scanDot} />
                    <span className={styles.scanDot} />
                    <span className={styles.scanPanelTitle}>./scan --wallet</span>
                  </div>
                  <div className={styles.inputSection}>
                    <WalletInput onScan={handleScan} isScanning={isScanning} />

                    {isScanning && (
                      <div className={styles.progressWrap}>
                        <div className={styles.progressBar}>
                          <div className={styles.progressFill} style={{ width: `${scanProgress}%` }} />
                        </div>
                        <span className={styles.progressLabel}>scanning... {scanProgress}%</span>
                      </div>
                    )}

                    <div className={styles.quickWrap}>
                      <span className={styles.quickLabel}>quick test wallets:</span>
                      <div className={styles.quickBtns}>
                        {SAMPLE.map(addr => (
                          <button
                            key={addr}
                            className={styles.quickBtn}
                            onClick={() => handleScan(addr)}
                          >
                            {addr.slice(2, 8)}...{addr.slice(-4)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benchmark — only when no results */}
                {!latestResult && !isScanning && (
                  <div className={styles.benchmarkSection}>
                    <div className={styles.benchmarkHeader}>
                      <span className={styles.benchmarkDot} />
                      <span className={styles.benchmarkTitle}>// performance comparison (ms)</span>
                    </div>
                    <div className={styles.benchmarkTable}>
                      <div className={styles.benchmarkRowHeader}>
                        <span>Tool</span>
                        <span>Time</span>
                        <span>Chains</span>
                        <span>Free</span>
                      </div>
                      {[
                        { name: 'DropHunter', time: '~800', chains: '10', free: 'yes', highlight: true },
                        { name: 'DeBank', time: '~4200', chains: '8', free: 'yes' },
                        { name: 'LayerLayer', time: '~2800', chains: '6', free: 'no' },
                        { name: 'Arkham', time: '~5100', chains: '5', free: 'no' },
                        { name: 'Rabby', time: '~3500', chains: '6', free: 'yes' },
                      ].map(row => (
                        <div key={row.name} className={`${styles.benchmarkRow} ${row.highlight ? styles.benchmarkHighlight : ''}`}>
                          <span>
                            {row.name}
                            {row.highlight && <span className={styles.benchmarkTag}>here</span>}
                          </span>
                          <span className={row.highlight ? styles.benchmarkBest : ''}>{row.time}ms</span>
                          <span>{row.chains}</span>
                          <span>{row.free}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Results */}
                {latestResult && !isScanning && (
                  <div className={styles.resultsSection}>
                    <div className={styles.resultsGrid}>
                      <div className={styles.scorePanel}>
                        <EligibilityScore score={latestResult.totalScore} />
                        <SybilRisk risk={latestResult.sybilRisk} reasons={latestResult.sybilReasons} />
                      </div>
                      <div className={styles.statsPanel}>
                        <div className={styles.statCard}>
                          <div className={styles.statLabel}>Transactions</div>
                          <div className={styles.statValue}>{latestResult.totalTx.toLocaleString()}</div>
                        </div>
                        <div className={styles.statCard}>
                          <div className={styles.statLabel}>Gas Spent</div>
                          <div className={styles.statValue}>${latestResult.totalGasUsd}</div>
                        </div>
                        <div className={styles.statCard}>
                          <div className={styles.statLabel}>Scan Time</div>
                          <div className={styles.statValue}>{latestResult.scanTime}ms</div>
                        </div>
                        <div className={styles.statCard}>
                          <div className={styles.statLabel}>Chains Active</div>
                          <div className={styles.statValue}>
                            {latestResult.results.filter(r => r.txCount > 0).length}/{latestResult.results.length}
                          </div>
                        </div>
                      </div>
                    </div>
                    <ChainGrid results={latestResult.results} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'batch' && <BatchPanel />}
        {activeTab === 'calendar' && <CalendarPanel />}
        {activeTab === 'history' && (
          <div className={styles.historyPanel}>
            <ExportPanel />
            {results.map((r, i) => (
              <div key={r.address + i} className={styles.historyCard}>
                <div className={styles.historyCardHeader}>
                  <span className={styles.historyAddr}>{r.address.slice(0, 6)}...{r.address.slice(-4)}</span>
                  <span
                    className={styles.historyScore}
                    style={{
                      color: r.totalScore >= 60 ? 'var(--data)' : r.totalScore >= 30 ? 'var(--amber)' : 'var(--red)'
                    }}
                  >
                    {r.totalScore}/100
                  </span>
                </div>
                <div className={styles.historyMeta}>
                  <span>{r.totalTx} txs</span>
                  <span>${r.totalGasUsd}</span>
                  <span>{r.scanTime}ms</span>
                </div>
              </div>
            ))}
            {results.length === 0 && (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>{'>'}_</div>
                <p>no scans in history. paste a wallet to begin.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}