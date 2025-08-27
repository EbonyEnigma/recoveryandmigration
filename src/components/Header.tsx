import React from 'react'
import { Shield, Menu, X } from 'lucide-react'
import { useState } from 'react'

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">WalletRecover</h1>
              <p className="text-xs text-gray-400">Secure Recovery & Migration</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#home" className="text-gray-300 hover:text-white transition-colors">
              Home
            </a>
            <a href="#recovery" className="text-gray-300 hover:text-white transition-colors">
              Recovery
            </a>
            <a href="#migration" className="text-gray-300 hover:text-white transition-colors">
              Migration
            </a>
            <a href="#admin" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Admin
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800 py-4">
            <nav className="flex flex-col space-y-3">
              <a href="#home" className="text-gray-300 hover:text-white transition-colors">
                Home
              </a>
              <a href="#recovery" className="text-gray-300 hover:text-white transition-colors">
                Recovery
              </a>
              <a href="#migration" className="text-gray-300 hover:text-white transition-colors">
                Migration
              </a>
              <a href="#admin" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-fit">
                Admin
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}