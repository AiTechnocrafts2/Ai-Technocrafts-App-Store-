// Yahan Supabase se copy ki hui keys daalein
const supabaseUrl = 'https://fsyokvlhxfaqhmfnbhlz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzeW9rdmxoeGZhcWhtZm5iaGx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NjQ3NjcsImV4cCI6MjA3MDM0MDc2N30.edSIcgSdhj07Q5iX28JTZdMzBvMdm6EuHe1YMSx-Hqs';

// 'supabase' object ab globally available hai (kyunki humne use HTML mein load kiya hai)
// Hum bas usse use karke apna client banayenge aur use 'sb' naam se export karenge.
export const sb = supabase.createClient(supabaseUrl, supabaseKey);
