import { createClient } from "@supabase/supabase-js"

let browserClient: ReturnType<typeof createClient> | null = null

export function getSupabaseBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL 또는 공개 키가 설정되지 않았습니다. .env.local을 확인하세요.")
  }

  if (!browserClient) {
    browserClient = createClient(supabaseUrl, supabaseKey)
  }

  return browserClient
}
