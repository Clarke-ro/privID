-- Fix infinite recursion in rank update trigger
-- Drop the existing trigger
DROP TRIGGER IF EXISTS update_ranks_on_score_change ON public.leaderboard_scores;

-- Recreate the trigger to only fire on score changes, not rank changes
CREATE TRIGGER update_ranks_on_score_change
  AFTER INSERT OR UPDATE OF balance_score, transfers_score, liquidity_score, governance_score, total_score
  ON public.leaderboard_scores
  FOR EACH STATEMENT
  EXECUTE FUNCTION public.trigger_update_ranks();