// Yahan Supabase se copy ki hui keys daalein
const SUPABASE_URL = 'https://fsyokvlhxfaqhmfnbhlz.supabase.co';       // Apna Supabase URL yahan paste karein
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzeW9rdmxoeGZhcWhtZm5iaGx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NjQ3NjcsImV4cCI6MjA3MDM0MDc2N30.edSIcgSdhj07Q5iX28JTZdMzBvMdm6EuHe1YMSx-Hqs'; // Apni Anon Key yahan paste karein

// Supabase client ko create karna aur export karna
// Neeche diye gaye CDN link se hum Supabase client library ko import kar rahe hain
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';

// Humein bas is 'supabase' object ki zaroorat padegi
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
