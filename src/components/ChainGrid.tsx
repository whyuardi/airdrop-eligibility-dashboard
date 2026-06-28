'use client'
import { CHAINS } from '@/lib/chains'
import type { ChainResult } from '@/lib/chains'
import styles from './ChainGrid.module.css'

interface Props { results: ChainResult[] }

function getScoreColor(s: number): string {
  if (s >= 50) return 'var(--accent)'
  if (s >= 20) return 'var(--amber)'
  return 'var(--red)'
}

export default function ChainGrid({ results }: Props) {
  return (
    <div className={styles.grid}>
      {results.map(r => {
        const chain = CHAINS.find(c => c.id === r.chainId)
        if (!chain) return null
        const color = getScoreColor(r.score)
        return (
          <div key={r.chainId} className={styles.card}>
            <div className={styles.header}>
              <div className={styles.chainInfo}>
                <div className={styles.chainIcon} style={{ background: `${chain.color}20`, color: chain.color, border: `1px solid ${chain.color}40` }}>{chain.icon}</div>
                <div>
                  <div className={styles.chainName}>{chain.name}</div>
                  <div className={styles.chainLabel}>{chain.logo}</div>
                </div>
              </div>
              <div className={styles.scoreBadge} style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
                {r.score}
              </div>
            </div>

            <div className={styles.body}>
              <div className={styles.row}>
                <span className={styles.label}>Transactions</span>
                <span className={styles.value}>{r.txCount.toLocaleString()}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>Gas Spent</span>
                <span className={styles.value}>${r.gasSpentUsd}</span>
              </div>
              {r.lastActivity && (
                <div className={styles.row}>
                  <span className={styles.label}>Last Activity</span>
                  <span className={styles.value}>{r.lastActivity}</span>
                </div>
              )}
            </div>

            {/* Status bar */}
            <div className={styles.statusBar}>
              <div
                className={styles.statusFill}
                style={{ width: `${Math.min(r.score, 100)}%`, background: color }}
              />
            </div>
            <div className={styles.statusLabel}>
              {r.isEligible ? '✅ Likely Eligible' : '❌ Low Activity'}
            </div>

            {/* Mini protocols */}
            {r.protocols.length > 0 && (
              <div className={styles.protocols}>
                {r.protocols.map(p => (
                  <span key={p.name} className={styles.protocolTag}>{p.name}</span>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}