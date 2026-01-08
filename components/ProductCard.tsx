"use client"
import Link from 'next/link'
import Image from 'next/image'
import { formatNgn } from '@lib/utils'
import { useState } from 'react'
import { useCart } from '@components/CartProvider'

export default function ProductCard({
  product,
  onAdd,
  categoryName
}: {
  product: { id: number; name: string; description: string; priceNgn: number; imageUrl: string; stock?: number }
  onAdd?: (id: number) => void
  categoryName?: string
}) {
  const [error, setError] = useState(false)
  const isOutOfStock = (product.stock ?? 0) <= 0

  const src = error
    ? 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg'
    : product.imageUrl
  return (
    <div className="card overflow-hidden group flex flex-col h-full">
      <Link href={`/product/${product.id}`} className="block relative h-56 md:h-64 overflow-hidden">
        <Image
          src={src}
          alt={product.name}
          fill
          className={`object-cover group-hover:scale-105 transition-transform duration-500 ${isOutOfStock ? 'grayscale opacity-70' : ''}`}
          onError={() => setError(true)}
        />
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/40">
            <span className="bg-red-600 text-white px-4 py-2 rounded-full font-bold shadow-lg transform -rotate-12 border-2 border-white">
              OUT OF STOCK
            </span>
          </div>
        )}
        {categoryName && (
          <span className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur text-cocoa text-xs md:text-sm px-3 py-1 rounded-full font-medium shadow-sm">
            {categoryName}
          </span>
        )}
        <span className="absolute top-3 right-3 z-10 bg-caramel text-white text-xs md:text-sm px-3 py-1 rounded-full">
          {formatNgn(product.priceNgn)}
        </span>
        <div className="absolute inset-x-0 bottom-0 z-0 bg-gradient-to-t from-black/50 to-transparent p-3 text-white pointer-events-none">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm md:text-base truncate max-w-[85%]">{product.name}</span>
          </div>
        </div>
      </Link>
      <div className="p-4 space-y-3 flex-1 flex flex-col">
        <p className="text-sm md:text-base text-cocoa/70 line-clamp-2">{product.description}</p>
        <div className="flex items-center gap-1 text-caramel">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.402 8.167L12 18.897l-7.336 4.168 1.402-8.167L.132 9.211l8.2-1.193z"/></svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.402 8.167L12 18.897l-7.336 4.168 1.402-8.167L.132 9.211l8.2-1.193z"/></svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.402 8.167L12 18.897l-7.336 4.168 1.402-8.167L.132 9.211l8.2-1.193z"/></svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.402 8.167L12 18.897l-7.336 4.168 1.402-8.167L.132 9.211l8.2-1.193z"/></svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.402 8.167L12 18.897l-7.336 4.168 1.402-8.167L.132 9.211l8.2-1.193z"/></svg>
          <span className="ml-2 text-xs text-cocoa/60">Popular</span>
        </div>
        <div className="pt-1 mt-auto">
          {onAdd ? (
            <button 
              className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed" 
              onClick={() => onAdd(product.id)}
              disabled={isOutOfStock}
            >
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>
          ) : (
            <AddToCartButton product={product} />
          )}
        </div>
      </div>
    </div>
  )
}

function AddToCartButton({ product }: { product: { id: number; name: string; priceNgn: number; imageUrl: string; stock?: number } }) {
  const { add } = useCart()
  const isOutOfStock = (product.stock ?? 0) <= 0
  
  return (
    <button
      className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={() => add({ productId: product.id, name: product.name, priceNgn: product.priceNgn, imageUrl: product.imageUrl }, 1)}
      disabled={isOutOfStock}
    >
      {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
    </button>
  )
}
