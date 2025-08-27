import CryptoJS from 'crypto-js'

const ENCRYPTION_KEY = 'your-secret-encryption-key-change-this'

export const encryptSeedPhrase = (seedPhrase: string): string => {
  return CryptoJS.AES.encrypt(seedPhrase, ENCRYPTION_KEY).toString()
}

export const decryptSeedPhrase = (encryptedSeed: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedSeed, ENCRYPTION_KEY)
  return bytes.toString(CryptoJS.enc.Utf8)
}

export const generateWalletAddress = (seedPhrase: string): string => {
  // This is a mock implementation - in real use, you'd use proper Web3 libraries
  const hash = CryptoJS.SHA256(seedPhrase).toString()
  return `0x${hash.substring(0, 40)}`
}