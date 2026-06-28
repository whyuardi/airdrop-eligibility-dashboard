'use client'
import { useStore } from '@/lib/store'
import styles from './ExportPanel.module.css'

export default function ExportPanel() {
  const { results } = useStore()

  const exportCSV = () => {
    const headers = ['address', 'chain', 'score', 'txCount', 'gasSpent', 'timestamp']
    const rows = results.flatMap(r =>
      r.results.map(chainRes => [
        r.address,
        chainRes.chainId,
        chainRes.score,
        chainRes.txCount,
        chainRes.gasSpentUsd,
        r.timestamp.toISOString(),
      ].join(','))
    )
    const csv = [headers.join(','), ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'drophunter-results.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportJSON = () => {
    const data = results.map(r => ({
      address: r.address,
      totalScore: r.totalScore,
      sybilRisk: r.sybilRisk,
      totalGasUsd: r.totalGasUsd,
      totalTx: r.totalTx,
      chains: r.results.map(cr => ({
        chain: cr.chainId,
        score: cr.score,
        txCount: cr.txCount,
        gasSpent: cr.gasSpentUsd,
        eligible: cr.isEligible,
      })),
    }))
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'drophunter-results.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  if (results.length === 0) return null

  return (
    <div className={styles.wrap}>
      <span className={styles.label}>Export Results</span>
      <div className={styles.btns}>
        <button onClick={exportCSV} className={styles.btn}>Export CSV</button>
        <button onClick={exportJSON} className={styles.btn}>Export JSON</button>
      </div>
    </div>
  )
}