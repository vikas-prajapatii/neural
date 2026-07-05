import { createClient } from '@supabase/supabase-js';

// Fallback to valid mock URL/key structures to prevent pre-render/build crashes when env keys are not present yet
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qamjwjkobuzwdjdwumys.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'placeholder-key-for-build';

export const supabase = createClient(supabaseUrl, supabaseKey);
