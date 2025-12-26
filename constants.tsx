
import { APIModule, UseCase } from './types';

export const DECENTRO_MODULES: APIModule[] = [
  {
    id: 'kyc',
    name: 'KYC & Onboarding',
    icon: '👤',
    description: 'Multi-modal identity verification stack leveraging Aadhaar, PAN, CKYC, and DigiLocker for seamless user onboarding.',
    complexity: 'Low',
    businessValue: 'Reduces onboarding drop-offs by 40% and ensures 100% compliance with RBI and SEBI mandates.',
    endpoints: [
      { id: 'kyc-1', name: 'Aadhaar OTP', method: 'POST', path: '/v2/kyc/aadhaar/otp', description: 'Trigger OTP for e-KYC verification via UIDAI.', module: 'kyc' },
      { id: 'kyc-2', name: 'PAN Verification', method: 'POST', path: '/v2/kyc/pan/verify', description: 'Verify PAN authenticity and fetch holder name.', module: 'kyc' },
      { id: 'kyc-3', name: 'CKYC Search', method: 'POST', path: '/v2/kyc/ckyc/search', description: 'Fetch CKYC records for simplified onboarding.', module: 'kyc' },
      { id: 'kyc-4', name: 'DigiLocker Access', method: 'POST', path: '/v2/kyc/digilocker/document', description: 'Retrieve verified documents directly from user accounts.', module: 'kyc' },
      { id: 'kyc-5', name: 'Video KYC', method: 'POST', path: '/v2/kyc/video/session', description: 'AI-assisted live video verification session.', module: 'kyc' }
    ]
  },
  {
    id: 'scanner',
    name: 'Scanner (Forensics)',
    icon: '👁️',
    description: 'Advanced forensics suite for document OCR, face matching, and liveness detection to combat identity fraud.',
    complexity: 'High',
    businessValue: 'Detects 99.9% of digital image tampering and deepfakes during the verification process.',
    endpoints: [
      { id: 'scan-1', name: 'OCR & Extraction', method: 'POST', path: '/v2/kyc/ocr/extract', description: 'Intelligent data extraction from identity documents.', module: 'scanner' },
      { id: 'scan-2', name: 'Face Match Pro', method: 'POST', path: '/v2/kyc/face/match', description: '1:1 and 1:N face comparison with confidence scoring.', module: 'scanner' },
      { id: 'scan-3', name: 'Liveness Detect', method: 'POST', path: '/v2/kyc/liveness', description: 'Ensure the user is present and real in real-time.', module: 'scanner' },
      { id: 'scan-4', name: 'Tamper Detection', method: 'POST', path: '/v2/kyc/forensics/tamper', description: 'Analyze image metadata and pixels for manipulation.', module: 'scanner' }
    ]
  },
  {
    id: 'payments',
    name: 'Payments & Collections',
    icon: '💸',
    description: 'Unified payments stack for UPI collections, real-time payouts, and automated split settlements.',
    complexity: 'Medium',
    businessValue: 'Enables 24/7 money movement and automated vendor settlements with 0 reconciliation friction.',
    endpoints: [
      { id: 'pay-1', name: 'Dynamic UPI QR', method: 'POST', path: '/v2/payments/upi/qr', description: 'Generate unique QRs for intent-based collections.', module: 'payments' },
      { id: 'pay-2', name: 'Instant Payout', method: 'POST', path: '/v2/payments/payout', description: 'IMPS/NEFT/RTGS payouts with real-time tracking.', module: 'payments' },
      { id: 'pay-3', name: 'Split Settlement', method: 'POST', path: '/v2/payments/split', description: 'Multi-party fund distribution from a single collection.', module: 'payments' },
      { id: 'pay-4', name: 'Penny Drop Verify', method: 'POST', path: '/v2/payments/verify_account', description: 'Authenticate bank accounts via ₹1 verification.', module: 'payments' }
    ]
  },
  {
    id: 'banking',
    name: 'Virtual Accounts',
    icon: '🏦',
    description: 'Scalable banking infrastructure to create unique virtual accounts for reconciliation and fund management.',
    complexity: 'High',
    businessValue: 'Simplifies accounting for millions of transactions by assigning a unique ID to every payer.',
    endpoints: [
      { id: 'bnk-1', name: 'Create VA', method: 'POST', path: '/v2/banking/account/virtual', description: 'Provision a unique bank account and IFSC pair.', module: 'banking' },
      { id: 'bnk-2', name: 'Account Balance', method: 'GET', path: '/v2/banking/account/balance', description: 'Fetch the real-time balance of any virtual account.', module: 'banking' },
      { id: 'bnk-3', name: 'Ledger Statement', method: 'GET', path: '/v2/banking/account/statement', description: 'Generate a ledger view of account transactions.', module: 'banking' }
    ]
  },
  {
    id: 'ledgers',
    name: 'Ledgers & Wallets',
    icon: '📒',
    description: 'Powerful accounting engine to maintain double-entry books and closed-loop wallet programs.',
    complexity: 'High',
    businessValue: 'Offloads the complexity of ledgering and reconciliation to a cloud-native infrastructure.',
    endpoints: [
      { id: 'ledger-1', name: 'Create Ledger', method: 'POST', path: '/v2/ledger', description: 'Initialize a new accounting ledger instance.', module: 'ledgers' },
      { id: 'ledger-2', name: 'Journal Posting', method: 'POST', path: '/v2/ledger/transaction', description: 'Record credit/debit entries with automatic balancing.', module: 'ledgers' },
      { id: 'ledger-3', name: 'Wallet Issuance', method: 'POST', path: '/v2/ledger/wallet', description: 'Issue a virtual wallet to an end-user.', module: 'ledgers' }
    ]
  },
  {
    id: 'bytes',
    name: 'Bytes (Data Suite)',
    icon: '📑',
    description: 'Rich alternate data suite for credit bureau reports, GST validation, and vehicle information.',
    complexity: 'Medium',
    businessValue: 'Enriches customer profiles with reliable third-party data for better credit decisioning.',
    endpoints: [
      { id: 'byte-1', name: 'Bureau Fetch', method: 'POST', path: '/v2/bytes/bureau/report', description: 'Retrieve CIBIL/Experian credit score and history.', module: 'bytes' },
      { id: 'byte-2', name: 'GST Search', method: 'POST', path: '/v2/bytes/gst/verify', description: 'Verify business details and filing status via GSTIN.', module: 'bytes' },
      { id: 'byte-3', name: 'RC Search', method: 'POST', path: '/v2/bytes/vehicle/rc', description: 'Get vehicle ownership and fitness details.', module: 'bytes' },
      { id: 'byte-4', name: 'UAN Verification', method: 'POST', path: '/v2/bytes/employment/uan', description: 'Validate employment history via EPFO data.', module: 'bytes' }
    ]
  }
];

export const USE_CASES: UseCase[] = [
  {
    id: 'gold-loan',
    title: 'Gold Lending Lifecycle',
    description: 'End-to-end management for gold-backed lending, from appraiser verification to automated recovery.',
    industry: 'Lending',
    timeToMarket: '3 Weeks',
    roiPotential: 'Very High',
    requiredModules: ['KYC & Onboarding', 'Scanner (Forensics)', 'Payments & Collections', 'Virtual Accounts'],
    flow: [
      { step: 'Onboard Borrower', module: 'kyc', description: 'Verify ID with Aadhaar and PAN.' },
      { step: 'Appraiser Validation', module: 'scanner', description: 'Face match appraiser at doorstep.' },
      { step: 'Instant Credit', module: 'payments', description: 'Disburse loan amount to borrower VA.' },
      { step: 'Mandate Setup', module: 'payments', description: 'Set up e-NACH for monthly recovery.' }
    ]
  },
  {
    id: 'payout-automation',
    title: 'Gig Platform Payouts',
    description: 'Automate high-volume disbursements to delivery partners and vendors with instant reconciliation.',
    industry: 'Gig Economy',
    timeToMarket: '10 Days',
    roiPotential: 'High',
    requiredModules: ['KYC & Onboarding', 'Payments & Collections', 'Ledgers & Wallets'],
    flow: [
      { step: 'Onboard Partner', module: 'kyc', description: 'Aadhaar e-KYC for instant verification.' },
      { step: 'Bank Auth', module: 'payments', description: 'Penny drop to verify destination account.' },
      { step: 'Batch Disbursement', module: 'payments', description: '24/7 IMPS payouts for earnings.' },
      { step: 'Partner Wallet', module: 'ledgers', description: 'Track earnings and deductions in real-time.' }
    ]
  },
  {
    id: 'marketplace-settlement',
    title: 'E-commerce Split Payouts',
    description: 'Collect payments via UPI and automatically split commissions and vendor payouts.',
    industry: 'Marketplace',
    timeToMarket: '2 Weeks',
    roiPotential: 'High',
    requiredModules: ['Payments & Collections', 'Virtual Accounts', 'Ledgers & Wallets'],
    flow: [
      { step: 'Unified Collection', module: 'payments', description: 'Collect funds via Dynamic UPI QR.' },
      { step: 'Split Funds', module: 'payments', description: 'Deduct platform fee and split rest.' },
      { step: 'Virtual Ledgers', module: 'ledgers', description: 'Maintain books for every vendor account.' }
    ]
  },
  {
    id: 'neo-bank-core',
    title: 'Neo-Banking Infrastructure',
    description: 'Build a full-fledged Neo-bank with virtual accounts, wallets, and rich data forensics.',
    industry: 'Banking',
    timeToMarket: '6 Weeks',
    roiPotential: 'Very High',
    requiredModules: ['KYC & Onboarding', 'Scanner (Forensics)', 'Virtual Accounts', 'Ledgers & Wallets', 'Bytes (Data Suite)'],
    flow: [
      { step: 'Full Video KYC', module: 'kyc', description: 'RBI compliant Video KYC onboarding.' },
      { step: 'Provision Accounts', module: 'banking', description: 'Create individual savings VAs.' },
      { step: 'Card/Wallet Issuance', module: 'ledgers', description: 'Activate closed-loop wallets.' },
      { step: 'Credit Scoring', module: 'bytes', description: 'Fetch bureau data for overdrafts.' }
    ]
  }
];
