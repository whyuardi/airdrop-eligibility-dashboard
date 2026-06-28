'use client'
import { useState } from 'react'
import styles from './WalletInput.module.css'

interface Props {
  onScan: (address: string) => void
  isScanning: boolean
}

function isValidAddress(addr: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(addr)
}

export default function WalletInput({ onScan, isScanning }: Props) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const addr = value.trim()
    if (!addr) { setError('Enter a wallet address'); return }
    if (!isValidAddress(addr) && !addr.match(/^[a-zA-Z0-9]{32,44}$/)) {
      setError('Invalid address format. Use 0x... for EVM, base58 for Solana.')
      return
    }
    setError('')
    onScan(addr)
  }

  const sampleAddresses = [
    '0x28C6c06298d514Db089934071355E5743bf21d60',
    '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
  ]

  return (
    <div className={styles.wrap}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputWrap}>
          <span className={styles.prefix}>0x</span>
          <input
            type="text"
            value={value}
            onChange={e => { setValue(e.target.value); setError('') }}
            placeholder="Paste wallet address..."
            className={`${styles.input} ${error ? styles.inputError : ''}`}
            disabled={isScanning}
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="submit"
            disabled={isScanning || !value.trim()}
            className={styles.scanBtn}
          >
            {isScanning ? (
              <>
                <span className={styles.spinner} />
                Scanning...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                Scan
              </>
            )}
          </button>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </form>

      {/* Quick test */}
      <div className={styles.quick}>
        <span className={styles.quickLabel}>Quick test:</span>
        <div className={styles.quickBtns}>
          {sampleAddresses.map(addr => (
            <button
              key={addr}
              className={styles.quickBtn}
              onClick={() => { setValue(addr); setError('') }}
            >
              {addr.slice(0, 6)}...{addr.slice(-4)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}