import { NextRequest, NextResponse } from 'next/server'
import { setAdminSession } from '@lib/auth'

import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const u = String(body.username || '')
  const p = String(body.password || '')
  const U = process.env.ADMIN_USERNAME || 'admin'
  const P = process.env.ADMIN_PASSWORD || 'admin123'
  if (u === U && p === P) {
    await setAdminSession()
    // Ensure no user session is active
    const cookieStore = await cookies()
    cookieStore.delete('user_session')
    return NextResponse.json({ ok: true })
  }
  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
}
