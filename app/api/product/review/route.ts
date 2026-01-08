import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@lib/db'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const session = cookies().get('user_session')
  if (!session?.value) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const userId = parseInt(session.value)
  
  try {
    const { productId, rating, comment } = await req.json()
    
    // Basic validation
    if (!rating || !comment || !productId) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }
    
    await prisma.review.create({
      data: {
        userId,
        productId: parseInt(productId),
        rating: parseInt(rating),
        comment
      }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Review error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
