import Header from '@components/Header'
import Footer from '@components/Footer'
import { prisma } from '@lib/db'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { formatNgn } from '@lib/utils'
import ProductActions from '@components/ProductActions'
import ReviewsSection from '@components/ReviewsSection'

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: paramId } = await params
  const id = Number(paramId)
  if (isNaN(id)) notFound()

  const settings = await prisma.siteSetting.findFirst()
  const product = await prisma.product.findUnique({ 
    where: { id },
    include: {
      category: true,
      reviews: {
        include: { user: { select: { name: true } } },
        orderBy: { createdAt: 'desc' }
      }
    }
  })
  
  if (!product || !product.active) notFound()

  const relatedProducts = await prisma.product.findMany({
    where: { 
      categoryId: product.categoryId,
      id: { not: product.id },
      active: true
    },
    take: 4
  })

  return (
    <div className="bg-background min-h-screen">
      <Header name={settings?.businessName} logoUrl={settings?.logoUrl ?? undefined} />
      
      <main className="container py-8 md:py-12">
        <nav className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <span className="mx-2">/</span>
          <Link href={`/shop?category=${product.category.slug}`} className="hover:text-primary transition-colors">{product.category.name}</Link>
          <span className="mx-2">/</span>
          <span className="text-primary font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Product Image Gallery Style */}
          <div className="space-y-4">
             <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-peach bg-white">
                <Image 
                  src={product.imageUrl} 
                  alt={product.name} 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  priority 
                />
             </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary mb-4 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-bold text-accent">{formatNgn(product.priceNgn)}</span>
              {product.reviews.length > 0 && (
                 <div className="flex items-center text-sm text-gray-600 border-l border-gray-300 pl-4">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="font-medium">{(product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length).toFixed(1)}</span>
                    <span className="mx-1">·</span>
                    <span>{product.reviews.length} reviews</span>
                 </div>
              )}
            </div>

            <div className="prose prose-lg text-gray-600 mb-8 leading-relaxed">
               <p>{product.description}</p>
            </div>

            <div className="mt-auto pt-8 border-t border-peach">
               <ProductActions product={product} />
               <div className="mt-6 flex gap-8 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    {(product.stock ?? 0) > 0 ? (
                      <>
                        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <span className="text-green-600 font-medium">In Stock ({product.stock} available)</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        <span className="text-red-500 font-medium">Out of Stock</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Fast Delivery
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewsSection productId={product.id} reviews={product.reviews} />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
           <section className="mt-24 pt-12 border-t border-peach/50">
              <h2 className="text-2xl font-display font-bold text-primary mb-8">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 {relatedProducts.map(p => (
                    <Link key={p.id} href={`/product/${p.id}`} className="group">
                       <div className="card overflow-hidden hover:shadow-xl transition-all h-full flex flex-col">
                          <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                             <Image 
                               src={p.imageUrl} 
                               alt={p.name} 
                               fill 
                               className="object-cover group-hover:scale-105 transition-transform duration-500" 
                             />
                          </div>
                          <div className="p-4 flex-1 flex flex-col">
                             <h3 className="font-bold text-primary mb-1 line-clamp-1">{p.name}</h3>
                             <p className="text-accent font-medium mt-auto">{formatNgn(p.priceNgn)}</p>
                          </div>
                       </div>
                    </Link>
                 ))}
              </div>
           </section>
        )}

      </main>
      <Footer />
    </div>
  )
}
