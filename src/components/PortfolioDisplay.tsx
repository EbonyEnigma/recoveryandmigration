import React from 'react'
import { TrendingUp, TrendingDown, Wallet, DollarSign } from 'lucide-react'
import type { Portfolio } from '../types/wallet'

interface PortfolioDisplayProps {
  portfolio: Portfolio
  isLoading?: boolean
}

export const PortfolioDisplay: React.FC<PortfolioDisplayProps> = ({
  portfolio,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 animate-pulse">
        <div className="space-y-4">
          <div className="h-8 bg-gray-700 rounded w-1/3"></div>
          <div className="h-12 bg-gray-700 rounded w-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatPercentage = (percentage: number) => {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">Portfolio Overview</h3>
        <div className="flex items-center space-x-4">
          <div>
            <p className="text-3xl font-bold text-white">{formatCurrency(portfolio.totalBalance)}</p>
            <div className={`flex items-center space-x-1 text-sm ${
              portfolio.balanceChange24h >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {portfolio.balanceChange24h >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{formatPercentage(portfolio.balanceChange24h)} (24h)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {portfolio.tokens.map((token, index) => (
          <div key={index} className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {token.symbol.substring(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="text-white font-semibold">{token.symbol}</p>
                  <p className="text-gray-400 text-xs">{token.name}</p>
                </div>
              </div>
              <span className="text-xs bg-gray-600 px-2 py-1 rounded text-gray-300">
                {token.chain}
              </span>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Balance:</span>
                <span className="text-white text-sm font-medium">{token.balance}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Value:</span>
                <span className="text-white text-sm font-medium">
                  {formatCurrency(token.value)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">24h:</span>
                <span className={`text-sm font-medium ${
                  token.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {formatPercentage(token.change24h)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}