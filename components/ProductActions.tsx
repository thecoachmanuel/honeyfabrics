"use client"
import { useState } from 'react'
import { useCart } from './CartProvider'
import { useRouter } from 'next/navigation'

export default function ProductActions({ product }: { product: { id: number; name: string; priceNgn: number; imageUrl: string; stock?: number } }) {
  const [qty, setQty] = useState(1)
  const { add } = useCart()
  const router = useRouter()
  const [added, setAdded] = useState(false)
  const isOutOfStock = (product.stock ?? 0) <= 0

  if (isOutOfStock) {
    return (
      <div className="w-full bg-gray-100 border border-gray-200 text-gray-500 px-6 py-4 rounded-xl text-center font-bold text-lg shadow-sm">
        Currently Out of Stock
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center border border-peach rounded-full overflow-hidden">
          <button className="px-4 py-2 hover:bg-peach/20 transition-colors" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
          <span className="px-4 py-2 font-medium w-12 text-center">{qty}</span>
          <button className="px-4 py-2 hover:bg-peach/20 transition-colors" onClick={() => setQty(Math.min((product.stock ?? 999), qty + 1))}>+</button>
        </div>
        <button 
          className="btn btn-primary flex-1 transition-transform active:scale-95"
          onClick={() => {
            add({ productId: product.id, name: product.name, priceNgn: product.priceNgn, imageUrl: product.imageUrl }, qty)
            setAdded(true)
            setTimeout(() => setAdded(false), 2000)
          }}
        >
          {added ? 'Added to Cart!' : 'Add to Cart'}
        </button>
      </div>
      <button 
        className="btn bg-accent text-white hover:bg-red-700 w-full shadow-md hover:shadow-lg transition-all" 
        onClick={() => {
           add({ productId: product.id, name: product.name, priceNgn: product.priceNgn, imageUrl: product.imageUrl }, qty)
           router.push('/cart')
        }}
      >
        Buy Now
      </button>
    </div>
  )
}
