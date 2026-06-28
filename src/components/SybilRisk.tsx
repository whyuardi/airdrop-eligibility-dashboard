'use client'
import styles from './SybilRisk.module.css'

interface Props {
  risk: 'low' | 'medium' | 'high'
  reasons: string[]
}

const riskColors = {
  low: 'var(--accent)',
  medium: 'var(--amber)',
  high: 'var(--red)',
}

export default function SybilRisk({ risk, reasons }: Props) {
  const color = riskColors[risk]
  return (
    <div className={styles.wrap} style={{ borderColor: `${color}30` }}>
      <div className={styles.top}>
        <div className={styles.dot} style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
        <span className={styles.label}>Sybil Risk</span>
        <span className={styles.badge} style={{ color, background: `${color}12` }}>{risk.toUpperCase()}</span>
      </div>
      {reasons.length > 0 && (
        <ul className={styles.reasons}>
          {reasons.map((r, i) => (
            <li key={i} className={styles.reason}>{r}</li>
          ))}
        </ul>
      )}
    </div>
  )
}