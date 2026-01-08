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
    const id = Number(form.get('id') || 0)
    const imageUrl = String(form.get('imageUrl') || '')
    const headline = String(form.get('headline') || '')
    const subtext = String(form.get('subtext') || '')
    const ctaText = String(form.get('ctaText') || '')
    const ctaLink = String(form.get('ctaLink') || '')

    if (!imageUrl || !headline || !subtext) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const data = { imageUrl, headline, subtext, ctaText: ctaText || null, ctaLink: ctaLink || null }

    if (id > 0) {
      await prisma.slide.update({ where: { id }, data })
    } else {
      await prisma.slide.create({ data })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving slide:', error)
    return NextResponse.json({ error: 'Failed to save slide' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  if (!await isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const id = Number(searchParams.get('id'))
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
    
    await prisma.slide.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting slide:', error)
    return NextResponse.json({ error: 'Failed to delete slide' }, { status: 500 })
  }
}
