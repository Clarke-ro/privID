-- Drop the insecure policy that allows anyone to view all profiles
DROP POLICY IF EXISTS "Anyone can view profiles" ON public.profiles;

-- Create a secure policy that only allows authenticated users to view profiles
-- This prevents public scraping while allowing legitimate platform users to interact
CREATE POLICY "Authenticated users can view profiles"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (true);

-- Users can still view their own profile even if not authenticated (for profile setup)
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  TO anon
  USING (auth.uid() = id);