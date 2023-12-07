import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wivcspoyvmyeglvpdfve.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpdmNzcG95dm15ZWdsdnBkZnZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDExMjU2ODUsImV4cCI6MjAxNjcwMTY4NX0.nXuWSWbwor7W8lQ-ikg9M3ysDCxsWkfYSscIMNCcu0Q'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
})
