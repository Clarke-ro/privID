-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  wallet_address TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create leaderboard_scores table
CREATE TABLE public.leaderboard_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address TEXT UNIQUE NOT NULL REFERENCES public.profiles(wallet_address) ON DELETE CASCADE,
  balance_score BIGINT DEFAULT 0 NOT NULL,
  transfers_score BIGINT DEFAULT 0 NOT NULL,
  liquidity_score BIGINT DEFAULT 0 NOT NULL,
  governance_score BIGINT DEFAULT 0 NOT NULL,
  total_score BIGINT DEFAULT 0 NOT NULL,
  rank INTEGER,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  UNIQUE(user_id, role)
);

-- Create indexes for better performance
CREATE INDEX idx_leaderboard_total_score ON public.leaderboard_scores(total_score DESC);
CREATE INDEX idx_leaderboard_wallet ON public.leaderboard_scores(wallet_address);
CREATE INDEX idx_profiles_wallet ON public.profiles(wallet_address);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Anyone can view profiles"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS Policies for leaderboard_scores
CREATE POLICY "Anyone can view leaderboard scores"
  ON public.leaderboard_scores FOR SELECT
  USING (true);

CREATE POLICY "Only authenticated users can update scores"
  ON public.leaderboard_scores FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Only authenticated users can insert scores"
  ON public.leaderboard_scores FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policies for user_roles
CREATE POLICY "Anyone can view user roles"
  ON public.user_roles FOR SELECT
  USING (true);

CREATE POLICY "Only admins can manage roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Function to update leaderboard ranks
CREATE OR REPLACE FUNCTION public.update_leaderboard_ranks()
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
  WITH ranked_scores AS (
    SELECT 
      id,
      ROW_NUMBER() OVER (ORDER BY total_score DESC, last_updated ASC) as new_rank
    FROM public.leaderboard_scores
  )
  UPDATE public.leaderboard_scores ls
  SET rank = rs.new_rank
  FROM ranked_scores rs
  WHERE ls.id = rs.id;
END;
$$;

-- Trigger to update ranks when scores change
CREATE OR REPLACE FUNCTION public.trigger_update_ranks()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  PERFORM public.update_leaderboard_ranks();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_ranks_on_score_change
  AFTER INSERT OR UPDATE ON public.leaderboard_scores
  FOR EACH STATEMENT
  EXECUTE FUNCTION public.trigger_update_ranks();