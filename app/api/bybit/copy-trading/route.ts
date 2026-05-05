import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // 서비스 일시 중단 응답
    return NextResponse.json(
      {
        success: false,
        message: '카피트레이딩 서비스가 일시적으로 중단되었습니다.',
        data: [],
        status: 'maintenance'
      },
      { status: 503 }
    )
  } catch (error) {
    console.error('Copy trading API error:', error)
    return NextResponse.json(
      {
        success: false,
        message: '서비스에 일시적인 문제가 발생했습니다.',
        data: []
      },
      { status: 500 }
    )
  }
}
