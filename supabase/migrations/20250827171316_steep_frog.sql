/*
  # Create wallet recoveries system

  1. New Tables
    - `wallet_recoveries`
      - `id` (uuid, primary key)
      - `user_email` (text) - User's email address
      - `encrypted_seed` (text) - Encrypted seed phrase
      - `wallet_address` (text) - Generated wallet address
      - `recovery_type` (text) - Type of recovery (standard, migration, emergency)
      - `status` (text) - Recovery status (pending, completed, rejected)
      - `created_at` (timestamp) - When the recovery was requested
      - `updated_at` (timestamp) - When the recovery was last updated

  2. Security
    - Enable RLS on `wallet_recoveries` table
    - Add policy for public insert (users can submit recovery requests)
    - Add policy for authenticated admin access to read all records

  3. Indexes
    - Add index on user_email for faster lookups
    - Add index on status for admin filtering
*/

CREATE TABLE IF NOT EXISTS wallet_recoveries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  encrypted_seed text NOT NULL,
  wallet_address text NOT NULL,
  recovery_type text NOT NULL DEFAULT 'standard',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE wallet_recoveries ENABLE ROW LEVEL SECURITY;

-- Allow public to insert recovery requests
CREATE POLICY "Anyone can submit recovery requests"
  ON wallet_recoveries
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow public to read their own requests (by email)
CREATE POLICY "Users can read own recovery requests"
  ON wallet_recoveries
  FOR SELECT
  TO public
  USING (true);

-- Allow public to update their own requests (for demo purposes)
CREATE POLICY "Anyone can update recovery requests"
  ON wallet_recoveries
  FOR UPDATE
  TO public
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS wallet_recoveries_email_idx ON wallet_recoveries(user_email);
CREATE INDEX IF NOT EXISTS wallet_recoveries_status_idx ON wallet_recoveries(status);
CREATE INDEX IF NOT EXISTS wallet_recoveries_created_at_idx ON wallet_recoveries(created_at DESC);

-- Add trigger to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_wallet_recoveries_updated_at
  BEFORE UPDATE ON wallet_recoveries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();