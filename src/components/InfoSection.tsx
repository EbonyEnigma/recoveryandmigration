import React from 'react'
import { Shield, ArrowRight, Lock, Smartphone } from 'lucide-react'

export const InfoSection: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Secure Wallet Recovery & Migration
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Safely recover access to your cryptocurrency wallets and migrate to new devices 
          with our secure, encrypted recovery system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Secure Recovery</h3>
          <p className="text-gray-400">
            Your seed phrase is encrypted using industry-standard AES encryption 
            before being stored securely in our database.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <ArrowRight className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Easy Migration</h3>
          <p className="text-gray-400">
            Seamlessly transfer your wallet to new devices or wallet applications 
            with our guided migration process.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Privacy First</h3>
          <p className="text-gray-400">
            Your data is protected with advanced encryption and security measures. 
            Only you and authorized administrators can access your information.
          </p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">How It Works</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">1</span>
            </div>
            <div>
              <h4 className="text-white font-semibold">Enter Your Seed Phrase</h4>
              <p className="text-gray-400 text-sm">
                Provide your 12 or 24-word seed phrase in our secure form. The phrase is encrypted immediately.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">2</span>
            </div>
            <div>
              <h4 className="text-white font-semibold">View Your Portfolio</h4>
              <p className="text-gray-400 text-sm">
                See your current wallet balance and token holdings across multiple blockchains.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">3</span>
            </div>
            <div>
              <h4 className="text-white font-semibold">Complete Recovery</h4>
              <p className="text-gray-400 text-sm">
                Our team processes your recovery request and helps you regain access to your wallet.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Smartphone className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-yellow-200 font-semibold mb-2">Important Security Notice</h3>
            <ul className="text-yellow-200 text-sm space-y-1">
              <li>• This platform is for demonstration purposes only</li>
              <li>• Never use your real seed phrase on untrusted platforms</li>
              <li>• Always verify the authenticity of wallet recovery services</li>
              <li>• Consider hardware wallets for maximum security</li>
              <li>• Keep backup copies of your seed phrase in secure, offline locations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}