import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'your-supabase-url'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      wallet_recoveries: {
        Row: {
          id: string
          user_email: string
          encrypted_seed: string
          wallet_address: string
          recovery_type: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_email: string
          encrypted_seed: string
          wallet_address: string
          recovery_type: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_email?: string
          encrypted_seed?: string
          wallet_address?: string
          recovery_type?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}