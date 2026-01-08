import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding JayBecks Store Data with Updated Images...')

  // 1. Update Site Settings
  await prisma.siteSetting.upsert({
    where: { id: 1 },
    update: {
      businessName: 'Honey Fabrics',
      location: 'Abuja & Lagos, Nigeria',
      yearsExperience: 9,
      tagline: 'Number One Online Fabric Store in Nigeria',
      whatsappNumber: '+23409065160088',
      instagram: 'honey_fabrics123',
      twitter: 'honey_fabrics123',
      tiktok: '',
      logoUrl: 'https://images.pexels.com/photos/3756038/pexels-photo-3756038.jpeg' // Gold Velvet
    },
    create: {
      businessName: 'Honey Fabrics',
      location: 'Abuja & Lagos, Nigeria',
      yearsExperience: 9,
      tagline: 'Number One Online Fabric Store in Nigeria',
      whatsappNumber: '+23409065160088',
      instagram: 'honey_fabrics123',
      twitter: 'honey_fabrics123',
      tiktok: '',
      logoUrl: 'https://images.pexels.com/photos/3756038/pexels-photo-3756038.jpeg'
    }
  })

  // 2. Clear existing data
  try {
    console.log('Clearing old data...')
    await prisma.review.deleteMany({})
    await prisma.orderItem.deleteMany({})
    await prisma.product.deleteMany({})
    await prisma.category.deleteMany({})
    await prisma.slide.deleteMany({})
    console.log('Cleared old data.')
  } catch (e) {
    console.warn('Could not clear all data, proceeding...', e)
  }

  // 3. Create Categories
  console.log('Creating categories...')
  const categoriesData = [
    { name: 'Satin', slug: 'satin', imageUrl: 'https://images.pexels.com/photos/7717488/pexels-photo-7717488.jpeg' },
    { name: 'Velvet', slug: 'velvet', imageUrl: 'https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg' }, // NEW: Red Velvet
    { name: 'Linen', slug: 'linen', imageUrl: 'https://images.pexels.com/photos/5709665/pexels-photo-5709665.jpeg' },
    { name: 'Cotton', slug: 'cotton', imageUrl: 'https://images.pexels.com/photos/5709665/pexels-photo-5709665.jpeg' },
    { name: 'Mesh & Netting', slug: 'mesh', imageUrl: 'https://images.pexels.com/photos/6263155/pexels-photo-6263155.jpeg' },
    { name: 'Embroidered', slug: 'embroidered', imageUrl: 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg' },
    { name: 'Shoes', slug: 'shoes', imageUrl: 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg' }, // NEW: Black Pumps
    { name: 'Bags', slug: 'bags', imageUrl: 'https://images.pexels.com/photos/16690455/pexels-photo-16690455.jpeg' }
  ]

  for (const c of categoriesData) {
    await prisma.category.create({ data: c })
  }

  const cats = await prisma.category.findMany()
  const catMap = Object.fromEntries(cats.map(c => [c.slug, c.id]))

  // 4. Create Real Products with UNIQUE Images
  console.log('Creating products...')

  const products = [
    // FABRICS
    {
      name: 'Luxurious Korean Satin',
      description: 'Ideal for Bridal Wear. Drapes flawlessly, creating flowing silhouettes.',
      priceNgn: 19500,
      imageUrl: 'https://images.pexels.com/photos/7717488/pexels-photo-7717488.jpeg', // White Satin
      categoryId: catMap['satin']
    },
    {
      name: 'Rose Pink Satin Silk',
      description: 'Premium satin silk fabric for elegant dresses.',
      priceNgn: 19500,
      imageUrl: 'https://images.pexels.com/photos/8767573/pexels-photo-8767573.jpeg', // Pink Satin
      categoryId: catMap['satin']
    },
    {
      name: 'Turquoise Velvet Silk Fabric',
      description: 'Exquisite design, perfect for evening gowns.',
      priceNgn: 19500,
      imageUrl: 'https://images.pexels.com/photos/6461493/pexels-photo-6461493.jpeg',
      categoryId: catMap['velvet']
    },
    {
      name: 'Gold Velvet Silk Fabric',
      description: 'Spark up any event with this exclusive Gold Velvet Silk Fabric.',
      priceNgn: 19500,
      imageUrl: 'https://images.pexels.com/photos/3756038/pexels-photo-3756038.jpeg',
      categoryId: catMap['velvet']
    },
    {
      name: 'Dark Red Velvet Silk Fabric',
      description: 'Stunning red color for an instant hit dress.',
      priceNgn: 19500,
      imageUrl: 'https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg',
      categoryId: catMap['velvet']
    },
    {
      name: 'Grey Embroidered Linen Fabric',
      description: 'High quality embroidered linen.',
      priceNgn: 19500,
      imageUrl: 'https://images.pexels.com/photos/5709665/pexels-photo-5709665.jpeg', 
      categoryId: catMap['linen']
    },
    {
      name: 'Gold Mesh Fabric',
      description: 'Light weight net/mesh fabric.',
      priceNgn: 19500,
      imageUrl: 'https://images.pexels.com/photos/6263155/pexels-photo-6263155.jpeg',
      categoryId: catMap['mesh']
    },
    {
      name: 'Royal Blue Embroidered Silk',
      description: 'Detailed embroidery on silk base.',
      priceNgn: 22000,
      imageUrl: 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg',
      categoryId: catMap['embroidered']
    },

    // SHOES (Updated Images)
    {
      name: 'Elegant Gold Stilettos', // Updated name to match request "Elegant gold stilettos for evening wear"
      description: 'Elegant gold stilettos for evening wear.',
      priceNgn: 45000,
      imageUrl: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg', // NEW: Generic luxury shoes
      categoryId: catMap['shoes']
    },
    {
      name: 'Black Classic Pumps',
      description: 'Timeless black pumps for any occasion.',
      priceNgn: 38000,
      imageUrl: 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg', // Reused from category? It's fine for one product to match category thumb.
      categoryId: catMap['shoes']
    },
    {
      name: 'Bridal Silver Heels',
      description: 'Sparkling silver heels perfect for brides.',
      priceNgn: 52000,
      imageUrl: 'https://images.pexels.com/photos/318236/pexels-photo-318236.jpeg',
      categoryId: catMap['shoes']
    },
    {
      name: 'High-end Strappy Sandals',
      description: 'High-end strappy sandals.',
      priceNgn: 42000,
      imageUrl: 'https://images.pexels.com/photos/26856065/pexels-photo-26856065.jpeg', // NEW: Poolside sandals
      categoryId: catMap['shoes']
    },

    // BAGS (Updated Images)
    {
      name: 'Orange Leather Tote',
      description: 'Premium leather tote bag in vibrant orange.',
      priceNgn: 65000,
      imageUrl: 'https://images.pexels.com/photos/16690455/pexels-photo-16690455.jpeg',
      categoryId: catMap['bags']
    },
    {
      name: 'Classic Black Handbag',
      description: 'Essential black handbag for daily use.',
      priceNgn: 55000,
      imageUrl: 'https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg',
      categoryId: catMap['bags']
    },
    {
      name: 'Velvet Evening Clutch',
      description: 'Elegant velvet clutch for parties.',
      priceNgn: 35000,
      imageUrl: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
      categoryId: catMap['bags']
    },
    {
      name: 'Chic Shoulder Bag',
      description: 'Chic shoulder bag with gold accents.',
      priceNgn: 70000,
      imageUrl: 'https://images.pexels.com/photos/19192233/pexels-photo-19192233.jpeg', // NEW: Shoulder bag
      categoryId: catMap['bags']
    }
  ]

  for (const p of products) {
    await prisma.product.create({ data: p })
  }

  // 5. Create Slides
  console.log('Creating slides...')
  const slides = [
    {
      imageUrl: 'https://images.pexels.com/photos/7717488/pexels-photo-7717488.jpeg',
      headline: 'Luxurious Korean Satin',
      subtext: 'Ideal for Bridal Wear & Evening Gowns',
      ctaText: 'Shop Satin',
      ctaLink: '/shop?category=satin',
      active: true
    },
    {
      imageUrl: 'https://images.pexels.com/photos/137603/pexels-photo-137603.jpeg',
      headline: 'New Shoe Collection',
      subtext: 'Step into elegance with our latest arrivals',
      ctaText: 'Shop Shoes',
      ctaLink: '/shop?category=shoes',
      active: true
    },
    {
      imageUrl: 'https://images.pexels.com/photos/16690455/pexels-photo-16690455.jpeg',
      headline: 'Exclusive Bags',
      subtext: 'Complete your look with luxury accessories',
      ctaText: 'Shop Bags',
      ctaLink: '/shop?category=bags',
      active: true
    }
  ]

  for (const s of slides) {
    await prisma.slide.create({ data: s })
  }

  console.log('Seeding completed.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
