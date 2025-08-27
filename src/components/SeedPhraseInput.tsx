import React, { useState } from 'react'
import { Eye, EyeOff, AlertTriangle } from 'lucide-react'

interface SeedPhraseInputProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

export const SeedPhraseInput: React.FC<SeedPhraseInputProps> = ({
  value,
  onChange,
  error
}) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleSeedPhraseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-300">
          Seed Phrase (12 or 24 words)
        </label>
        <button
          type="button"
          onClick={toggleVisibility}
          className="text-gray-400 hover:text-gray-300 transition-colors"
        >
          {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      
      <div className="relative">
        <textarea
          value={value}
          onChange={handleSeedPhraseChange}
          type={isVisible ? 'text' : 'password'}
          className={`w-full h-32 px-3 py-2 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
            error ? 'border-red-500' : 'border-gray-700'
          }`}
          placeholder="Enter your 12 or 24 word seed phrase separated by spaces..."
          style={{ fontFamily: isVisible ? 'inherit' : 'password' }}
        />
        {!isVisible && (
          <div className="absolute inset-0 bg-gray-800 rounded-lg flex items-center justify-center pointer-events-none">
            <span className="text-gray-500 text-sm">Seed phrase hidden for security</span>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center space-x-2 text-red-400 text-sm">
          <AlertTriangle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
          <div className="text-yellow-200 text-xs">
            <strong>Security Notice:</strong> Your seed phrase will be encrypted before storage. 
            However, for maximum security, consider using hardware wallets for long-term storage.
          </div>
        </div>
      </div>
    </div>
  )
}