import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hrmwkqqmspnzacxvwavl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhybXdrcXFtc3BuemFjeHZ3YXZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0MjQzODMsImV4cCI6MjAxNjAwMDM4M30.Zvv5C78_GTT8k8Pl57qWN2EnUdN9kb57qcA2YJpIpcA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});