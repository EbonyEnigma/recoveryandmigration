import React from 'react'
import { AlertTriangle, Shield, Lock } from 'lucide-react'

interface SecurityWarningProps {
  type?: 'warning' | 'danger' | 'info'
  title: string
  children: React.ReactNode
}

export const SecurityWarning: React.FC<SecurityWarningProps> = ({ 
  type = 'warning', 
  title, 
  children 
}) => {
  const getStyles = () => {
    switch (type) {
      case 'danger':
        return 'bg-red-900/20 border-red-500 text-red-100'
      case 'info':
        return 'bg-blue-900/20 border-blue-500 text-blue-100'
      default:
        return 'bg-yellow-900/20 border-yellow-500 text-yellow-100'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'danger':
        return <Shield className="w-5 h-5" />
      case 'info':
        return <Lock className="w-5 h-5" />
      default:
        return <AlertTriangle className="w-5 h-5" />
    }
  }

  return (
    <div className={`border rounded-lg p-4 ${getStyles()}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div>
          <h3 className="font-semibold mb-2">{title}</h3>
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  )
}