"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from './AuthProvider'

type Review = {
  id: number
  rating: number
  comment: string
  createdAt: Date
  user: { name: string | null }
}

export default function ReviewsSection({ productId, reviews }: { productId: number; reviews: Review[] }) {
  const { isLoggedIn } = useAuth()
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function submitReview(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/product/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, rating, comment })
      })
      if (!res.ok) throw new Error('Failed to submit review')
      setComment('')
      router.refresh()
    } catch {
      alert('Error submitting review. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-display font-bold text-primary mb-8 border-b border-peach pb-4">Customer Reviews</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <p className="text-gray-500 italic">No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map((r) => (
              <div key={r.id} className="border-b border-peach/50 pb-6 last:border-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-accent">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={i < r.rating ? "currentColor" : "none"} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.385a.563.563 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                    ))}
                  </div>
                  <span className="font-bold text-primary text-sm">{r.user.name || 'Anonymous'}</span>
                  <span className="text-xs text-gray-500 ml-auto">{new Date(r.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{r.comment}</p>
              </div>
            ))
          )}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-peach h-fit">
          <h3 className="text-lg font-bold text-primary mb-4">Write a Review</h3>
          {isLoggedIn ? (
            <form onSubmit={submitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-2xl transition-colors ${rating >= star ? 'text-accent' : 'text-gray-300'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border border-peach rounded-lg p-3 h-32 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                  placeholder="Share your thoughts about this product..."
                  required
                ></textarea>
              </div>
              <button disabled={loading} className="btn btn-primary w-full">
                {loading ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Please log in to leave a review.</p>
              <a href="/login" className="btn btn-secondary inline-block">Log In</a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
