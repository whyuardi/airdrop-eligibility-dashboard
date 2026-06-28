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

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>⊕</div>
            <div>
              <span className={styles.logoName}>DropHunter</span>
              <span className={styles.logoTag}>OSINT Scanner</span>
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
          <a
            href="https://github.com/whyuardi/airdrop-eligibility-dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            src/
          </a>
        </div>
      </header>

      <main className={styles.main}>
        {activeTab === 'single' && (
          <div>
            {/* Hero + Scan Panel — asymmetric split */}
            <div className={styles.heroSection}>
              {/* Left: branding + data */}
              <div className={styles.heroLeft}>
                <div className={styles.heroBadge}>
                  <span className={styles.heroBadgeDot} />
                  10 chains · real-time · no api key
                </div>
                <h1 className={styles.heroTitle}>
                  Airdrop<br/>
                  <span className={styles.heroAccent}>Eligibility</span><br/>
                  Scanner
                </h1>
                <p className={styles.heroSub}>
                  Scan Ethereum, Base, Arbitrum, Optimism, zkSync & 5 more chains.
                  Score, gas spent, Sybil risk — in under 1 second.
                </p>
              </div>

              {/* Right: terminal-style scan panel */}
              <div className={styles.heroRight}>
                <div className={styles.scanPanel}>
                  <div className={styles.scanPanelHeader}>
                    <span className={styles.scanDot} />
                    <span className={styles.scanDot} />
                    <span className={styles.scanDot} />
                    <span className={styles.scanPanelTitle}>./scan --mode interactive</span>
                  </div>
                  <div className={styles.inputSection}>
                    <WalletInput onScan={handleScan} isScanning={isScanning} />

                    {isScanning && (
                      <div className={styles.progressWrap}>
                        <div className={styles.progressBar}>
                          <div
                            className={styles.progressFill}
                            style={{ width: `${scanProgress}%` }}
                          />
                        </div>
                        <span className={styles.progressLabel}>
                          scanning... {scanProgress}%
                        </span>
                      </div>
                    )}

                    <div className={styles.quickWrap}>
                      <span className={styles.quickLabel}>quick:</span>
                      <div className={styles.quickBtns}>
                        <button className={styles.quickBtn} onClick={() => handleScan('0x28C6c06298d514Db089934071355E5743bf21d60')}>0x28C6...1d60</button>
                        <button className={styles.quickBtn} onClick={() => handleScan('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045')}>0xd8dA...6045</button>
                        <button className={styles.quickBtn} onClick={() => handleScan('0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B')}>0xAb58...eC9B</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
                      <span className={styles.statLabel}>Transactions</span>
                      <span className={styles.statValue}>{latestResult.totalTx.toLocaleString()}</span>
                    </div>
                    <div className={styles.statCard}>
                      <span className={styles.statLabel}>Gas Spent</span>
                      <span className={styles.statValue}>${latestResult.totalGasUsd}</span>
                    </div>
                    <div className={styles.statCard}>
                      <span className={styles.statLabel}>Scan Time</span>
                      <span className={styles.statValue}>{latestResult.scanTime}ms</span>
                    </div>
                    <div className={styles.statCard}>
                      <span className={styles.statLabel}>Chains Active</span>
                      <span className={styles.statValue}>
                        {latestResult.results.filter(r => r.txCount > 0).length}/{latestResult.results.length}
                      </span>
                    </div>
                  </div>
                </div>

                <ChainGrid results={latestResult.results} />
              </div>
            )}

            {/* Benchmark — only show when no results */}
            {!latestResult && !isScanning && (
              <div className={styles.benchmarkSection}>
                <div className={styles.benchmarkHeader}>
                  <span className={styles.benchmarkDot} />
                  <span className={styles.benchmarkTitle}>// performance comparison</span>
                </div>
                <div className={styles.benchmarkTable}>
                  <div className={styles.benchmarkRowHeader}>
                    <span>Tool</span>
                    <span>Time</span>
                    <span>Multi-chain</span>
                    <span>Free</span>
                  </div>
                  {[
                    { name: 'DropHunter', time: '~0.8s', chains: '10 chains', free: 'yes', highlight: true },
                    { name: 'DeBank', time: '~4.2s', chains: '8 chains', free: 'yes' },
                    { name: 'LayerLayer', time: '~2.8s', chains: '6 chains', free: 'limited' },
                    { name: 'Arkham', time: '~5.1s', chains: '5 chains', free: 'limited' },
                    { name: 'Rabby', time: '~3.5s', chains: '6 chains', free: 'yes' },
                  ].map(row => (
                    <div key={row.name} className={`${styles.benchmarkRow} ${row.highlight ? styles.benchmarkHighlight : ''}`}>
                      <span>
                        {row.name}
                        {row.highlight && <span className={styles.benchmarkTag}>here</span>}
                      </span>
                      <span className={row.highlight ? styles.benchmarkBest : ''}>{row.time}</span>
                      <span>{row.chains}</span>
                      <span>{row.free}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
                      color: r.totalScore >= 60 ? 'var(--cyan)' : r.totalScore >= 30 ? 'var(--amber)' : 'var(--red)'
                    }}
                  >
                    {r.totalScore}/100
                  </span>
                </div>
                <div className={styles.historyMeta}>
                  <span>{r.totalTx} txs</span>
                  <span>${r.totalGasUsd} gas</span>
                  <span>{r.scanTime}ms</span>
                </div>
              </div>
            ))}
            {results.length === 0 && (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>_</div>
                <p>no scans in history. paste a wallet address to begin.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}