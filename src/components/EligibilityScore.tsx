'use client'
import styles from './EligibilityScore.module.css'

interface Props {
  score: number
}

function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent'
  if (score >= 60) return 'Good'
  if (score >= 40) return 'Average'
  if (score >= 20) return 'Low'
  return 'Very Low'
}

function getScoreColor(score: number): string {
  if (score >= 60) return 'var(--accent)'
  if (score >= 30) return 'var(--amber)'
  return 'var(--red)'
}

export default function EligibilityScore({ score }: Props) {
  const color = getScoreColor(score)
  const label = getScoreLabel(score)
  const circumference = 2 * Math.PI * 54
  const offset = circumference - (score / 100) * circumference

  return (
    <div className={styles.wrap}>
      <div className={styles.circle}>
        <svg width="130" height="130" viewBox="0 0 130 130">
          {/* Track */}
          <circle cx="65" cy="65" r="54" fill="none" stroke="var(--border)" strokeWidth="8" />
          {/* Progress */}
          <circle
            cx="65" cy="65" r="54"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 65 65)"
            style={{ transition: 'stroke-dashoffset 1s ease', filter: `drop-shadow(0 0 8px ${color})` }}
          />
        </svg>
        <div className={styles.inner}>
          <span className={styles.score} style={{ color }}>{score}</span>
          <span className={styles.max}>/100</span>
        </div>
      </div>
      <div className={styles.label}>{label}</div>
      <div className={styles.sub}>Overall Eligibility Score</div>
    </div>
  )
}