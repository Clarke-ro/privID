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

    const { walletAddress } = await req.json();

    if (!walletAddress) {
      throw new Error('Wallet address is required');
    }

    console.log('Generating username for wallet:', walletAddress);

    // Generate a unique username from wallet address
    const prefix = ['Pioneer', 'Trader', 'Builder', 'Voyager', 'Explorer', 'Champion', 'Maven', 'Sage', 'Titan', 'Legend'];
    const randomPrefix = prefix[Math.floor(Math.random() * prefix.length)];
    const suffix = walletAddress.slice(-6).toUpperCase();
    let username = `${randomPrefix}_${suffix}`;
    
    // Check if username exists and make it unique
    let counter = 1;
    let isUnique = false;
    let finalUsername = username;

    while (!isUnique) {
      const { data: existing } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', finalUsername)
        .maybeSingle();

      if (!existing) {
        isUnique = true;
      } else {
        finalUsername = `${username}${counter}`;
        counter++;
      }
    }

    console.log('Generated unique username:', finalUsername);

    return new Response(
      JSON.stringify({ username: finalUsername }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error generating username:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
