import React, { useState } from 'react'
import { Header } from './components/Header'
import { RecoveryForm } from './components/RecoveryForm'
import { InfoSection } from './components/InfoSection'
import { AdminDashboard } from './components/AdminDashboard'

function App() {
  const [currentSection, setCurrentSection] = useState('home')

  const renderSection = () => {
    switch (currentSection) {
      case 'recovery':
        return <RecoveryForm />
      case 'admin':
        return <AdminDashboard />
      default:
        return <InfoSection />
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex space-x-4 mb-8">
          <button
            onClick={() => setCurrentSection('home')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentSection === 'home'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:text-white'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentSection('recovery')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentSection === 'recovery'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:text-white'
            }`}
          >
            Recovery
          </button>
          <button
            onClick={() => setCurrentSection('admin')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentSection === 'admin'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:text-white'
            }`}
          >
            Admin
          </button>
        </nav>

        {renderSection()}
      </main>

      <footer className="bg-gray-800 border-t border-gray-700 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>&copy; 2025 WalletRecover. Demo platform for educational purposes only.</p>
        </div>
      </footer>
    </div>
  )
}

export default App