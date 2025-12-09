/*
  # Create quiz submissions table

  ## 1. New Tables
    - `quiz_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `user_id` (uuid) - References the authenticated user
      - `email` (text) - User's email address
      - `answers` (jsonb) - User's quiz answers stored as JSON
      - `score` (integer) - Calculated quiz score
      - `created_at` (timestamptz) - Timestamp of submission

  ## 2. Security
    - Enable RLS on `quiz_submissions` table
    - Policy: Players can insert their own submission
    - Policy: Players can read their own submission
    - Policy: Admin (admin@example.com) can read all submissions

  ## 3. Important Notes
    - Each user should only submit once (enforced at app level)
    - Answers stored as JSONB for flexibility
    - Score calculated and stored during submission
*/

CREATE TABLE IF NOT EXISTS quiz_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  email text NOT NULL,
  answers jsonb NOT NULL,
  score integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own submission"
  ON quiz_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own submission"
  ON quiz_submissions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can read all submissions"
  ON quiz_submissions
  FOR SELECT
  TO authenticated
  USING (
    email IN (
      SELECT email FROM auth.users WHERE id = auth.uid() AND email = 'admin@example.com'
    )
  );

CREATE INDEX IF NOT EXISTS idx_quiz_submissions_user_id ON quiz_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_submissions_email ON quiz_submissions(email);