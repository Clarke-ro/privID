-- Drop the insecure policy that allows anyone to view all user roles
DROP POLICY IF EXISTS "Anyone can view user roles" ON public.user_roles;

-- Create a secure policy that only allows users to view their own role
CREATE POLICY "Users can view their own role"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow admins to view all roles (for user management purposes)
CREATE POLICY "Admins can view all roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

-- Keep the existing admin management policy intact
-- (already exists as "Only admins can manage roles")