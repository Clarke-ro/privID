-- Drop the insecure policies that allow any authenticated user to modify scores
DROP POLICY IF EXISTS "Only authenticated users can insert scores" ON public.leaderboard_scores;
DROP POLICY IF EXISTS "Only authenticated users can update scores" ON public.leaderboard_scores;

-- Create secure policies that only allow service role (backend) to modify scores
-- Regular users can only view, not modify
CREATE POLICY "Service role can insert scores"
  ON public.leaderboard_scores
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update scores"
  ON public.leaderboard_scores
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Ensure the public SELECT policy remains for viewing leaderboard
-- (this already exists as "Anyone can view leaderboard scores")