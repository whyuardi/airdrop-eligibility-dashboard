'use client'
import { useState, useCallback } from 'react'
import { scanWallet, useStore } from '@/lib/store'
import styles from './BatchPanel.module.css'

export default function BatchPanel() {
  const [input, setInput] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const { addBatchResult, batchResults, clearBatchResults, currentBatchIndex, setCurrentBatchIndex } = useStore()

  const handleBatchScan = useCallback(async () => {
    const addresses = input
      .split(/[\n,]+/)
      .map(a => a.trim())
      .filter(a => a.length > 0)
    if (addresses.length === 0) return

    setIsScanning(true)
    clearBatchResults()

    for (let i = 0; i < addresses.length; i++) {
      setCurrentBatchIndex(i)
      setProgress(Math.round(((i + 1) / addresses.length) * 100))
      const result = await scanWallet(addresses[i])
      addBatchResult(result)
    }

    setIsScanning(false)
    setCurrentBatchIndex(addresses.length)
  }, [input, addBatchResult, clearBatchResults, setCurrentBatchIndex])

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.title}>Batch Scan</h2>
        <span className={styles.sub}>Scan up to 50 wallets at once. One address per line or comma-separated.</span>
      </div>

      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder={'0x28C6c06298d514Db089934071355E5743bf21d60\n0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'}
        className={styles.textarea}
        rows={6}
        disabled={isScanning}
        spellCheck={false}
      />

      <div className={styles.actions}>
        <button onClick={handleBatchScan} disabled={isScanning || !input.trim()} className={styles.scanBtn}>
          {isScanning ? (
            <>
              <span className={styles.spinner} />
              Scanning {currentBatchIndex + 1}...
            </>
          ) : (
            <>Scan {input.trim() ? input.split(/[\n,]+/).filter(a => a.trim()).length : 0} Wallets</>
          )}
        </button>
      </div>

      {isScanning && (
        <div className={styles.progress}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
          <span className={styles.progressLabel}>{currentBatchIndex + 1} wallets done</span>
        </div>
      )}

      {batchResults.length > 0 && !isScanning && (
        <div className={styles.resultsTable}>
          <div className={styles.tableHeader}>
            <span>Address</span>
            <span>Score</span>
            <span>Gas</span>
            <span>Txs</span>
            <span>Time</span>
          </div>
          {batchResults.map((r, i) => (
            <div key={r.address + i} className={styles.tableRow}>
              <span className={styles.addr}>{r.address.slice(0, 6)}...{r.address.slice(-4)}</span>
              <span className={styles.score} style={{ color: r.totalScore >= 60 ? 'var(--accent)' : r.totalScore >= 30 ? 'var(--amber)' : 'var(--red)' }}>
                {r.totalScore}
              </span>
              <span>${r.totalGasUsd}</span>
              <span>{r.totalTx}</span>
              <span>{r.scanTime}ms</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}