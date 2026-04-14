import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://xlvlerxpgemofuwjtaiu.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsdmxlcnhwZ2Vtb2Z1d2p0YWl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNDI2NDUsImV4cCI6MjA5MTcxODY0NX0.LzNRo1o7mKRNB8SGq0-m5pCX9dghEb2XKkpQqr96GsM";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
