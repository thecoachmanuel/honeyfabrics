import Header from '@components/Header'
import Footer from '@components/Footer'
import HeroSlider from '@components/HeroSlider'
import ProductCard from '@components/ProductCard'
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@lib/db'

export default async function Home() {
  const settings = await prisma.siteSetting.findFirst()
  const slides = await prisma.slide.findMany({ where: { active: true } })
  const sliderData = slides.length
    ? slides.map((s) => ({ id: String(s.id), imageUrl: s.imageUrl, headline: s.headline, subtext: s.subtext, ctaText: s.ctaText ?? undefined, ctaLink: s.ctaLink ?? undefined }))
    : undefined
  
  const categories = await prisma.category.findMany()
  const visibleCategories = categories.filter(c => c.imageUrl)

  const newArrivals = await prisma.product.findMany({
    take: 8,
    orderBy: { id: 'desc' },
    include: { category: true }
  })

  const picks = await prisma.product.findMany({
    take: 4,
    skip: 5, // Skip some to get variety
    include: { category: true }
  })

  return (
    <div className="bg-neutral-50 min-h-screen flex flex-col">
      <Header name={settings?.businessName} logoUrl={settings?.logoUrl ?? undefined} />
      
      <main className="flex-1">
        <HeroSlider slides={sliderData} />

        {/* Categories Section */}
        <section className="container py-16">
          <h2 className="text-3xl font-display font-bold text-center text-primary mb-10">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {visibleCategories.map((c) => (
              <Link key={c.id} href={`/shop?category=${c.slug}`} className="group relative overflow-hidden rounded-lg aspect-square shadow-md hover:shadow-xl transition-all">
                <Image 
                  src={c.imageUrl!} 
                  alt={c.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold tracking-wide uppercase border-b-2 border-transparent group-hover:border-white transition-all pb-1">
                    {c.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* New Arrivals Section */}
        <section className="bg-white py-16">
          <div className="container">
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="text-secondary font-bold uppercase tracking-wider text-sm">Just In</span>
                <h2 className="text-3xl font-display font-bold text-primary mt-1">New Arrivals</h2>
              </div>
              <Link href="/shop?sort=newest" className="text-primary font-medium hover:text-secondary transition-colors flex items-center gap-2">
                View All <span className="text-xl">→</span>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {newArrivals.map((p) => (
                <ProductCard key={p.id} product={p} categoryName={p.category.name} />
              ))}
            </div>
          </div>
        </section>

        {/* Promotional Banner */}
        <section className="relative h-[400px] w-full bg-primary flex items-center my-10">
          <div className="absolute inset-0 z-0">
             <Image 
              src="https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg" 
              alt="Luxury Fabrics" 
              fill 
              className="object-cover opacity-40"
            />
          </div>
          <div className="container relative z-10 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Unmatched Quality & Style</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8 text-gray-200">
              Discover our premium collection of fabrics sourced from the finest mills. 
              Elevate your wardrobe with textures that speak luxury.
            </p>
            <Link href="/shop" className="btn bg-secondary text-white hover:bg-white hover:text-primary px-8 py-3 text-lg transition-colors border-2 border-transparent hover:border-white">
              Shop Now
            </Link>
          </div>
        </section>

        {/* Picks of the Week */}
        <section className="container py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-primary">Picks of the Week</h2>
            <p className="text-gray-500 mt-2">Curated selections just for you</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {picks.map((p) => (
              <ProductCard key={p.id} product={p} categoryName={p.category.name} />
            ))}
          </div>
        </section>

        {/* Features / Why Choose Us */}
        <section className="bg-neutral-100 py-16 border-t border-gray-200">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Fast Delivery</h3>
                <p className="text-gray-600">We deliver your style essentials swiftly to your doorstep anywhere in Lagos.</p>
              </div>
              <div className="p-6">
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Authentic Quality</h3>
                <p className="text-gray-600">100% genuine fabrics and materials. We never compromise on quality.</p>
              </div>
              <div className="p-6">
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Best Prices</h3>
                <p className="text-gray-600">Luxury doesn&apos;t have to break the bank. Competitive pricing on all items.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
