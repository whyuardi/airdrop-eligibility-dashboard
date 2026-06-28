export interface ChainConfig {
  id: string
  name: string
  icon: string
  color: string
  rpcUrl: string
  explorer: string
  logo: string
}

export interface ChainResult {
  chainId: string
  txCount: number
  gasSpent: string
  gasSpentUsd: number
  eligibility: number       // 0-100
  score: number             // 0-100 combined score
  protocols: Protocol[]
  isEligible: boolean
  lastActivity: string | null
  avgGasPerTx: number
}

export interface Protocol {
  name: string
  category: 'DEX' | 'Lending' | 'Bridge' | 'NFT' | 'Governance' | 'Yield' | 'Other'
  txCount: number
  volume: number
}

export interface WalletResult {
  address: string
  results: ChainResult[]
  totalScore: number
  sybilRisk: 'low' | 'medium' | 'high'
  sybilReasons: string[]
  totalGasUsd: number
  totalTx: number
  scanTime: number
  timestamp: Date
}

export interface AirdropCalendar {
  project: string
  chain: string
  type: 'confirmed' | 'tba' | 'potential'
  snapshotDate: string | null
  estimatedDate: string | null
  eligibility: string
  tasks: string[]
  url: string
}

export const CHAINS: ChainConfig[] = [
  {
    id: 'ethereum',
    name: 'Ethereum',
    icon: 'Ξ',
    color: '#627EEA',
    rpcUrl: 'https://eth.llamarpc.com',
    explorer: 'https://etherscan.io',
    logo: 'ETH',
  },
  {
    id: 'base',
    name: 'Base',
    icon: '◈',
    color: '#0052FF',
    rpcUrl: 'https://base.llamarpc.com',
    explorer: 'https://basescan.org',
    logo: 'BASE',
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum',
    icon: '◆',
    color: '#28A0F0',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    explorer: 'https://arbiscan.io',
    logo: 'ARB',
  },
  {
    id: 'optimism',
    name: 'Optimism',
    icon: '◎',
    color: '#FF0420',
    rpcUrl: 'https://mainnet.optimism.io',
    explorer: 'https://optimistic.etherscan.io',
    logo: 'OP',
  },
  {
    id: 'polygon',
    name: 'Polygon',
    icon: '◈',
    color: '#8247E5',
    rpcUrl: 'https://polygon-rpc.com',
    explorer: 'https://polygonscan.com',
    logo: 'MATIC',
  },
  {
    id: 'zksync',
    name: 'zkSync Era',
    icon: '⬡',
    color: '#C6F',
    rpcUrl: 'https://mainnet.era.zksync.io',
    explorer: 'https://explorer.zksync.io',
    logo: 'ZK',
  },
  {
    id: 'scroll',
    name: 'Scroll',
    icon: '⑂',
    color: '#FFD92C',
    rpcUrl: 'https://rpc.scroll.io',
    explorer: 'https://scrollscan.com',
    logo: 'SCR',
  },
  {
    id: 'linea',
    name: 'Linea',
    icon: '⬡',
    color: '#82EAFF',
    rpcUrl: 'https://rpc.linea.build',
    explorer: 'https://lineascan.build',
    logo: 'LIN',
  },
  {
    id: 'mode',
    name: 'Mode',
    icon: '◉',
    color: '#00D4FF',
    rpcUrl: 'https://mainnet.mode.network',
    explorer: 'https://explorer.mode.network',
    logo: 'MODE',
  },
  {
    id: 'blast',
    name: 'Blast',
    icon: '◈',
    color: '#FFEB00',
    rpcUrl: 'https://rpc.blast.io',
    explorer: 'https://blastscan.io',
    logo: 'BLAST',
  },
]

// Sample protocols per chain for demo
export const SAMPLE_PROTOCOLS: Record<string, Protocol[]> = {
  ethereum: [
    { name: 'Uniswap', category: 'DEX', txCount: 12, volume: 3400 },
    { name: 'Aave', category: 'Lending', txCount: 3, volume: 1200 },
    { name: 'OpenSea', category: 'NFT', txCount: 5, volume: 800 },
  ],
  base: [
    { name: 'Aerodrome', category: 'DEX', txCount: 28, volume: 5600 },
    { name: 'PoolTogether', category: 'Yield', txCount: 4, volume: 200 },
    { name: 'Basin', category: 'DEX', txCount: 8, volume: 900 },
  ],
  arbitrum: [
    { name: 'GMX', category: 'DEX', txCount: 15, volume: 2800 },
    { name: 'Treasure DAO', category: 'NFT', txCount: 6, volume: 400 },
    { name: 'Radiant', category: 'Lending', txCount: 2, volume: 600 },
  ],
  optimism: [
    { name: 'Velodrome', category: 'DEX', txCount: 20, volume: 4200 },
    { name: 'Perpetual', category: 'DEX', txCount: 7, volume: 1100 },
  ],
  polygon: [
    { name: 'QuickSwap', category: 'DEX', txCount: 18, volume: 2100 },
    { name: 'Aave V3', category: 'Lending', txCount: 4, volume: 900 },
  ],
  zksync: [
    { name: 'SyncSwap', category: 'DEX', txCount: 35, volume: 7800 },
    { name: 'EraLend', category: 'Lending', txCount: 6, volume: 1500 },
    { name: 'SpaceFi', category: 'DEX', txCount: 12, volume: 600 },
  ],
  scroll: [
    { name: '藕丝', category: 'DEX', txCount: 22, volume: 3100 },
    { name: 'ScrollSwap', category: 'DEX', txCount: 9, volume: 800 },
  ],
  linea: [
    { name: 'Lynex', category: 'DEX', txCount: 30, volume: 6200 },
    { name: 'Maverick', category: 'DEX', txCount: 11, volume: 1400 },
  ],
  mode: [
    { name: 'Rollup Finance', category: 'DEX', txCount: 18, volume: 2900 },
    { name: 'Supra', category: 'Yield', txCount: 5, volume: 400 },
  ],
  blast: [
    { name: 'Blast DEX', category: 'DEX', txCount: 25, volume: 5500 },
    { name: 'Magi', category: 'Yield', txCount: 8, volume: 1200 },
  ],
}

export const SAMPLE_AIRDROP_CALENDAR: AirdropCalendar[] = [
  {
    project: 'LayerZero v2',
    chain: 'Multi-chain',
    type: 'confirmed',
    snapshotDate: '2024-03-15',
    estimatedDate: '2024-Q3',
    eligibility: 'Bridge assets via Stargate',
    tasks: ['Bridge ETH to Base via Stargate', 'Swap on Stargate', 'Hold stETH'],
    url: 'https://layerzero.network',
  },
  {
    project: 'Hyperlane',
    chain: 'Multi-chain',
    type: 'tba',
    snapshotDate: null,
    estimatedDate: '2024-Q4',
    eligibility: 'Deploy mailbox contract',
    tasks: ['Deploy a mailbox on testnet', 'Send interchain messages'],
    url: 'https://hyperlane.xyz',
  },
  {
    project: 'Mode Network',
    chain: 'Mode',
    type: 'confirmed',
    snapshotDate: '2024-06-01',
    estimatedDate: '2024-Q3',
    eligibility: 'Activity on Mode mainnet',
    tasks: ['Bridge to Mode', 'Use any DeFi protocol', 'Swap/redeem'],
    url: 'https://mode.network',
  },
  {
    project: 'EigenLayer',
    chain: 'Ethereum',
    type: 'confirmed',
    snapshotDate: '2024-04-15',
    estimatedDate: '2024-Q4',
    eligibility: 'Restake ETH on EigenLayer',
    tasks: ['Restake ETH/LST via AVS', 'Delegate to operators'],
    url: 'https://eigenlayer.xyz',
  },
  {
    project: 'Scroll',
    chain: 'Scroll',
    type: 'confirmed',
    snapshotDate: 'TBA',
    estimatedDate: '2024-Q4',
    eligibility: 'Bridge + DeFi usage',
    tasks: ['Bridge to Scroll', 'Swap on ScrollSwap', 'Provide liquidity'],
    url: 'https://scroll.io',
  },
]