import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { isAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  if (!await isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const form = await req.formData()
    const isActive = form.get('isActive') !== null
    const method = String(form.get('method') || 'flat')
    const rate = Number(form.get('rate') || 1000)
    const freeThresholdRaw = form.get('freeThreshold')
    const freeThreshold = freeThresholdRaw ? Number(freeThresholdRaw) : null

    await prisma.deliverySetting.upsert({
      where: { id: 1 },
      update: { isActive, method, rate, freeThreshold },
      create: { id: 1, isActive, method, rate, freeThreshold }
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Delivery settings update error', err)
    return NextResponse.json({ error: 'Failed to save delivery settings' }, { status: 500 })
  }
}
