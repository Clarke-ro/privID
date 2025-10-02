import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { 
      walletAddress, 
      balanceScore, 
      transfersScore, 
      liquidityScore, 
      governanceScore 
    } = await req.json();

    if (!walletAddress) {
      throw new Error('Wallet address is required');
    }

    console.log('Updating scores for wallet:', walletAddress);

    const totalScore = balanceScore + transfersScore + liquidityScore + governanceScore;

    // Upsert the score
    const { data, error } = await supabase
      .from('leaderboard_scores')
      .upsert({
        wallet_address: walletAddress,
        balance_score: balanceScore,
        transfers_score: transfersScore,
        liquidity_score: liquidityScore,
        governance_score: governanceScore,
        total_score: totalScore,
        last_updated: new Date().toISOString(),
      }, {
        onConflict: 'wallet_address'
      })
      .select()
      .single();

    if (error) throw error;

    console.log('Scores updated successfully:', data);

    return new Response(
      JSON.stringify({ success: true, data }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error updating scores:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
