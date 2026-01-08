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
    const name = String(form.get('name') || '')
    const description = String(form.get('description') || '')
    const priceNgn = Number(form.get('priceNgn') || 0)
    const stock = Number(form.get('stock') || 0)
    const imageUrl = String(form.get('imageUrl') || '')
    const categoryId = Number(form.get('categoryId') || 0)

    if (!name || !priceNgn || !imageUrl || !categoryId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (id > 0) {
      await prisma.product.update({
        where: { id },
        data: { name, description, priceNgn, stock, imageUrl, categoryId }
      })
    } else {
      await prisma.product.create({ 
        data: { name, description, priceNgn, stock, imageUrl, categoryId } 
      })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving product:', error)
    return NextResponse.json({ error: 'Failed to save product' }, { status: 500 })
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
    
    await prisma.product.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
