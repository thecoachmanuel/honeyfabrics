import { PrismaClient } from '@prisma/client'
import { isAdmin } from '@/lib/auth'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

const categories = [
  { name: 'Swiss Lace', slug: 'swiss-lace', imageUrl: 'https://images.pexels.com/photos/1235695/pexels-photo-1235695.jpeg' },
  { name: 'Ankara Prints', slug: 'ankara-prints', imageUrl: 'https://images.pexels.com/photos/5705494/pexels-photo-5705494.jpeg' },
  { name: 'Silk & Chiffon', slug: 'silk-chiffon', imageUrl: 'https://images.pexels.com/photos/3756038/pexels-photo-3756038.jpeg' },
  { name: 'Velvet', slug: 'velvet', imageUrl: 'https://images.pexels.com/photos/10295842/pexels-photo-10295842.jpeg' },
  { name: 'Bridal Fabrics', slug: 'bridal-fabrics', imageUrl: 'https://images.pexels.com/photos/2285145/pexels-photo-2285145.jpeg' },
]

const productAdjectives = ['Luxury', 'Premium', 'Classic', 'Royal', 'Elegant', 'Exquisite', 'Vibrant', 'Authentic', 'Soft', 'Textured']
const fabricTypes = ['Swiss Voile', 'Dry Lace', 'Guipure', 'Organza', 'George', 'Damask', 'Brocade', 'Aso Oke', 'Kente', 'Jacquard']
const colors = ['Gold', 'Silver', 'Royal Blue', 'Emerald Green', 'Burgundy', 'Purple', 'White', 'Black', 'Teal', 'Coral']

// Curated list of high-quality fabric/fashion related images from Pexels
const fabricImages = [
  'https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg',
  'https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg',
  'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg',
  'https://images.pexels.com/photos/3756038/pexels-photo-3756038.jpeg',
  'https://images.pexels.com/photos/5705494/pexels-photo-5705494.jpeg',
  'https://images.pexels.com/photos/1235695/pexels-photo-1235695.jpeg',
  'https://images.pexels.com/photos/2285145/pexels-photo-2285145.jpeg',
  'https://images.pexels.com/photos/10295842/pexels-photo-10295842.jpeg',
  'https://images.pexels.com/photos/6254425/pexels-photo-6254425.jpeg',
  'https://images.pexels.com/photos/6254429/pexels-photo-6254429.jpeg',
  'https://images.pexels.com/photos/6254432/pexels-photo-6254432.jpeg',
  'https://images.pexels.com/photos/6910629/pexels-photo-6910629.jpeg',
  'https://images.pexels.com/photos/6910630/pexels-photo-6910630.jpeg',
  'https://images.pexels.com/photos/4452516/pexels-photo-4452516.jpeg',
  'https://images.pexels.com/photos/4452517/pexels-photo-4452517.jpeg',
  'https://images.pexels.com/photos/7679698/pexels-photo-7679698.jpeg',
  'https://images.pexels.com/photos/7679703/pexels-photo-7679703.jpeg',
  'https://images.pexels.com/photos/7679708/pexels-photo-7679708.jpeg',
  'https://images.pexels.com/photos/7679687/pexels-photo-7679687.jpeg',
  'https://images.pexels.com/photos/4614167/pexels-photo-4614167.jpeg',
  'https://images.pexels.com/photos/4614165/pexels-photo-4614165.jpeg',
  'https://images.pexels.com/photos/5935745/pexels-photo-5935745.jpeg',
  'https://images.pexels.com/photos/5935748/pexels-photo-5935748.jpeg',
  'https://images.pexels.com/photos/5935754/pexels-photo-5935754.jpeg',
  'https://images.pexels.com/photos/5935758/pexels-photo-5935758.jpeg',
  'https://images.pexels.com/photos/6045145/pexels-photo-6045145.jpeg',
  'https://images.pexels.com/photos/6045148/pexels-photo-6045148.jpeg',
  'https://images.pexels.com/photos/6045151/pexels-photo-6045151.jpeg',
  'https://images.pexels.com/photos/6045155/pexels-photo-6045155.jpeg',
  'https://images.pexels.com/photos/7206096/pexels-photo-7206096.jpeg',
  'https://images.pexels.com/photos/7206100/pexels-photo-7206100.jpeg',
  'https://images.pexels.com/photos/7206114/pexels-photo-7206114.jpeg',
  'https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg',
  'https://images.pexels.com/photos/3944415/pexels-photo-3944415.jpeg',
  'https://images.pexels.com/photos/3944420/pexels-photo-3944420.jpeg',
  'https://images.pexels.com/photos/3944425/pexels-photo-3944425.jpeg',
  'https://images.pexels.com/photos/3807278/pexels-photo-3807278.jpeg',
  'https://images.pexels.com/photos/3807283/pexels-photo-3807283.jpeg',
  'https://images.pexels.com/photos/3807288/pexels-photo-3807288.jpeg',
  'https://images.pexels.com/photos/3807293/pexels-photo-3807293.jpeg',
  'https://images.pexels.com/photos/4099235/pexels-photo-4099235.jpeg',
  'https://images.pexels.com/photos/4099238/pexels-photo-4099238.jpeg',
  'https://images.pexels.com/photos/4099243/pexels-photo-4099243.jpeg',
  'https://images.pexels.com/photos/4099248/pexels-photo-4099248.jpeg',
  'https://images.pexels.com/photos/4099253/pexels-photo-4099253.jpeg',
  'https://images.pexels.com/photos/4099258/pexels-photo-4099258.jpeg',
  'https://images.pexels.com/photos/4099263/pexels-photo-4099263.jpeg',
  'https://images.pexels.com/photos/4099268/pexels-photo-4099268.jpeg',
  'https://images.pexels.com/photos/4099273/pexels-photo-4099273.jpeg',
  'https://images.pexels.com/photos/4099278/pexels-photo-4099278.jpeg',
]

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generatePrice(): number {
  // Prices between 15,000 and 150,000 NGN
  return Math.floor(Math.random() * 28 + 3) * 5000
}

export async function GET() {
  if (!await isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    console.log('Start seeding...')

    // Upsert Categories
    const createdCategories = []
    for (const cat of categories) {
      const category = await prisma.category.upsert({
        where: { slug: cat.slug },
        update: {},
        create: cat,
      })
      createdCategories.push(category)
      console.log(`Created category: ${category.name}`)
    }

    // Create 50 Products
    for (let i = 0; i < 50; i++) {
      const adj = getRandomItem(productAdjectives)
      const type = getRandomItem(fabricTypes)
      const color = getRandomItem(colors)
      const category = getRandomItem(createdCategories)
      const name = `${adj} ${color} ${type}`
      
      // Ensure we have enough unique images, cycle if we run out (though we have 50)
      const imageUrl = fabricImages[i % fabricImages.length]

      const product = await prisma.product.create({
        data: {
          name: name,
          description: `Experience the elegance of this ${name}. Perfect for weddings, special occasions, and luxury fashion statements. High-quality ${category.name} material that stands out.`,
          priceNgn: generatePrice(),
          stock: Math.floor(Math.random() * 50) + 5, // 5 to 55 items in stock
          imageUrl: imageUrl,
          active: true,
          categoryId: category.id,
        },
      })
      console.log(`Created product ${i + 1}/50: ${product.name}`)
    }

    // Upsert Site Setting if not exists
    await prisma.siteSetting.upsert({
      where: { id: 1 },
      update: {},
      create: {
        businessName: 'Honey Fabrics',
        location: 'Lagos, Nigeria',
        yearsExperience: 5,
        tagline: 'Quality Fabrics for Elegant Styles',
        whatsappNumber: '+23409065160088',
        logoUrl: 'https://images.pexels.com/photos/7206096/pexels-photo-7206096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      }
    })

    console.log('Seeding finished.')
    return NextResponse.json({ message: 'Seeding completed successfully' })

  } catch (error) {
    console.error('Seeding error:', error)
    return NextResponse.json({ error: 'Seeding failed' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
