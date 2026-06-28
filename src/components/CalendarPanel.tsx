'use client'
import { SAMPLE_AIRDROP_CALENDAR } from '@/lib/chains'
import styles from './CalendarPanel.module.css'

const typeColors: Record<string, string> = {
  confirmed: 'var(--accent)',
  tba: 'var(--amber)',
  potential: 'var(--text-muted)',
}

export default function CalendarPanel() {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.title}>Airdrop Calendar</h2>
        <span className={styles.sub}>Known and potential airdrops. Check eligibility and missing actions.</span>
      </div>

      <div className={styles.grid}>
        {SAMPLE_AIRDROP_CALENDAR.map((a, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardTop}>
              <div className={styles.cardLeft}>
                <h3 className={styles.projectName}>{a.project}</h3>
                <div className={styles.chainTag}>{a.chain}</div>
              </div>
              <span className={styles.typeBadge} style={{ background: `${typeColors[a.type]}15`, color: typeColors[a.type], border: `1px solid ${typeColors[a.type]}30` }}>
                {a.type === 'confirmed' ? '✅ Confirmed' : a.type === 'tba' ? '⏳ TBA' : '🔮 Potential'}
              </span>
            </div>

            <div className={styles.meta}>
              {a.snapshotDate && <span className={styles.metaItem}>Snapshot: {a.snapshotDate}</span>}
              {a.estimatedDate && <span className={styles.metaItem}>Est: {a.estimatedDate}</span>}
            </div>

            <div className={styles.eligibility}>{a.eligibility}</div>

            <div className={styles.tasks}>
              <div className={styles.tasksLabel}>Tasks needed:</div>
              {a.tasks.map((task, j) => (
                <label key={j} className={styles.taskItem}>
                  <input type="checkbox" className={styles.checkbox} />
                  <span>{task}</span>
                </label>
              ))}
            </div>

            <a href={a.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
              Visit Project ↗
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}