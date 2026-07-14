import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const response = NextResponse.redirect(`${origin}${next}`)
      // 로그인 직후 브라우저가 캐시된(로그아웃 상태) 페이지를 보여주지 않도록 방지
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
      return response
    }
  }

  return NextResponse.redirect(`${origin}/auth/error`)
}