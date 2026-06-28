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
    if (!addr) { setError('enter wallet address'); return }
    if (!isValidAddress(addr) && !addr.match(/^[a-zA-Z0-9]{32,44}$/)) {
      setError('invalid format. use 0x... for EVM, base58 for Solana.')
      return
    }
    setError('')
    onScan(addr)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputWrap}>
        <input
          type="text"
          value={value}
          onChange={e => { setValue(e.target.value); setError('') }}
          placeholder="paste wallet address..."
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
              Scanning
            </>
          ) : (
            '> scan'
          )}
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  )
}