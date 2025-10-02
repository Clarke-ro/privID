-- Fix security warnings by setting search_path for functions

-- Update the update_updated_at function
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Update the update_leaderboard_ranks function
CREATE OR REPLACE FUNCTION public.update_leaderboard_ranks()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

-- Update the trigger_update_ranks function
CREATE OR REPLACE FUNCTION public.trigger_update_ranks()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM public.update_leaderboard_ranks();
  RETURN NEW;
END;
$$;