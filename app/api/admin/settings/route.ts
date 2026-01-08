import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'
import { isAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  if (!await isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const form = await req.formData()
    const data = {
      businessName: String(form.get('businessName') || ''),
      location: String(form.get('location') || ''),
      yearsExperience: Number(form.get('yearsExperience') || 0),
      tagline: String(form.get('tagline') || ''),
      whatsappNumber: String(form.get('whatsappNumber') || ''),
      instagram: String(form.get('instagram') || ''),
      twitter: String(form.get('twitter') || ''),
      tiktok: String(form.get('tiktok') || ''),
      logoUrl: String(form.get('logoUrl') || '')
    }
    await prisma.siteSetting.upsert({ where: { id: 1 }, update: data, create: data })
    revalidatePath('/', 'layout')
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving settings:', error)
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
  }
}
