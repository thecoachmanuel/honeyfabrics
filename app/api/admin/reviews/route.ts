import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@lib/db'

export async function GET() {
  const reviews = await prisma.review.findMany({
    include: { user: true, product: true },
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(reviews)
}

export async function PUT(req: NextRequest) {
  const { id, comment } = await req.json()
  await prisma.review.update({
    where: { id },
    data: { comment }
  })
  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = Number(searchParams.get('id'))
  await prisma.review.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
