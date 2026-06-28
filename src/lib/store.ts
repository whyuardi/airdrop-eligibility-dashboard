import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { WalletResult, ChainResult } from './chains'

interface ScanState {
  // Current wallet
  currentWallet: string
  setCurrentWallet: (w: string) => void

  // Scan results
  results: WalletResult[]
  addResult: (r: WalletResult) => void
  clearResults: () => void

  // Scanning state
  isScanning: boolean
  scanProgress: number
  setScanning: (v: boolean) => void
  setProgress: (v: number) => void

  // Batch
  batchAddresses: string[]
  setBatchAddresses: (v: string[]) => void
  batchResults: WalletResult[]
  addBatchResult: (r: WalletResult) => void
  clearBatchResults: () => void
  currentBatchIndex: number
  setCurrentBatchIndex: (i: number) => void
}

function generateMockResult(address: string): WalletResult {
  const now = new Date()
  const chains = ['ethereum', 'base', 'arbitrum', 'optimism', 'polygon', 'zksync', 'scroll', 'linea', 'mode', 'blast']
  const results: ChainResult[] = chains.map((chainId, i) => {
    const txCount = Math.floor(Math.random() * 60)
    const gasSpentUsd = parseFloat((Math.random() * 300 + 10).toFixed(2))
    const eligibility = Math.floor(Math.random() * 100)
    return {
      chainId,
      txCount,
      gasSpent: gasSpentUsd < 50 ? 'low' : gasSpentUsd < 150 ? 'medium' : 'high',
      gasSpentUsd,
      eligibility,
      score: eligibility,
      protocols: [],
      isEligible: eligibility >= 30,
      lastActivity: txCount > 0 ? `${Math.floor(Math.random() * 90 + 1)}d ago` : null,
      avgGasPerTx: txCount > 0 ? parseFloat((gasSpentUsd / txCount).toFixed(2)) : 0,
    }
  })

  const totalScore = Math.round(results.reduce((s, r) => s + r.score, 0) / results.length)
  const totalGasUsd = parseFloat(results.reduce((s, r) => s + r.gasSpentUsd, 0).toFixed(2))
  const totalTx = results.reduce((s, r) => s + r.txCount, 0)

  const sybilReasons: string[] = []
  if (totalTx < 5) sybilReasons.push('Very low tx count across all chains')
  if (results.filter(r => r.txCount > 20).length < 2) sybilReasons.push('Limited DEX activity depth')
  if (totalGasUsd < 20) sybilReasons.push('Low gas spend — may be flagged as inactive')
  if (results.filter(r => r.txCount > 0).length < 3) sybilReasons.push('Few chains engaged')

  const sybilRisk: 'low' | 'medium' | 'high' =
    sybilReasons.length === 0 ? 'low' : sybilReasons.length <= 2 ? 'medium' : 'high'

  return {
    address,
    results,
    totalScore,
    sybilRisk,
    sybilReasons,
    totalGasUsd,
    totalTx,
    scanTime: Math.floor(Math.random() * 800 + 400),
    timestamp: now,
  }
}

export const useStore = create<ScanState>()(
  persist(
    (set, get) => ({
      currentWallet: '',
      setCurrentWallet: (w) => set({ currentWallet: w }),

      results: [],
      addResult: (r) => set((s) => ({ results: [r, ...s.results] })),
      clearResults: () => set({ results: [] }),

      isScanning: false,
      scanProgress: 0,
      setScanning: (v) => set({ isScanning: v }),
      setProgress: (v) => set({ scanProgress: v }),

      batchAddresses: [],
      setBatchAddresses: (v) => set({ batchAddresses: v }),
      batchResults: [],
      addBatchResult: (r) => set((s) => ({ batchResults: [...s.batchResults, r] })),
      clearBatchResults: () => set({ batchResults: [], currentBatchIndex: 0 }),
      currentBatchIndex: 0,
      setCurrentBatchIndex: (i) => set({ currentBatchIndex: i }),
    }),
    {
      name: 'drophunter-storage',
      partialize: (s) => ({
        results: s.results.slice(0, 10),
        batchResults: s.batchResults.slice(0, 50),
      }),
    }
  )
)

// Simulate scan — in production this would call real RPCs
export async function scanWallet(address: string): Promise<WalletResult> {
  await new Promise(r => setTimeout(r, 600 + Math.random() * 400))
  return generateMockResult(address)
}