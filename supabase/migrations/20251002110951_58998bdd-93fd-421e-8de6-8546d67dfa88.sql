-- Enable realtime for leaderboard updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.leaderboard_scores;