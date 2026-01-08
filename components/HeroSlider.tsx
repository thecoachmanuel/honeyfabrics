"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type Slide = {
  id: string
  imageUrl: string
  headline: string
  subtext: string
  ctaText?: string
  ctaLink?: string
}

const DEFAULT_SLIDES: Slide[] = [
  {
    id: 's1',
    imageUrl:
      'https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg',
    headline: 'Elegance in Every Thread',
    subtext: 'Premium fabrics and textiles for your unique style'
  },
  {
    id: 's2',
    imageUrl:
      'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg',
    headline: 'Step Up Your Game',
    subtext: 'Trendy shoes that combine comfort and class'
  },
  {
    id: 's3',
    imageUrl:
      'https://images.pexels.com/photos/298865/pexels-photo-298865.jpeg',
    headline: 'Accessorize with Grace',
    subtext: 'Bags and jewelry to complete your perfect look'
  }
]

export default function HeroSlider({ slides = DEFAULT_SLIDES }: { slides?: Slide[] }) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000)
    return () => clearInterval(id)
  }, [slides.length])

  const [form, setForm] = useState({ location: '', note: '', timing: 'today', date: '' })

  const locations = [
    'Ikeja',
    'Lekki',
    'Victoria Island',
    'Ikoyi',
    'Surulere',
    'Yaba',
    'Maryland',
    'Magodo',
    'Ajah',
    'Ikorodu',
    'Festac',
    'Gbagada',
    'Oshodi',
    'Ogba'
  ]

  function submitRequest(e: React.FormEvent) {
    e.preventDefault()
    const text = `Delivery Request — Luxe Fabrics & Fashion\nLocation: ${form.location}\nTiming: ${form.timing === 'today' ? 'Today' : form.date}\nNotes: ${form.note}`
    const url = `https://wa.me/2348123456789?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  return (
    <section className="flex flex-col md:block relative">
      <div className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image src={s.imageUrl} alt={s.headline} fill className="object-cover" priority={i === 0} />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0 w-full px-4 md:px-0 md:w-auto md:max-w-4xl text-white text-center md:text-left pointer-events-none">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold drop-shadow">{s.headline}</h1>
              <p className="mt-4 text-lg md:text-xl lg:text-2xl drop-shadow">{s.subtext}</p>
              {s.ctaText && s.ctaLink && (
                <div className="mt-6 pointer-events-auto">
                  <Link href={s.ctaLink} className="btn btn-primary inline-block md:px-8 md:py-3 md:text-xl">
                    {s.ctaText}
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((s, i) => (
            <button
              key={s.id}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 w-2 rounded-full ${i === index ? 'bg-caramel' : 'bg-white/60'}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>

      <div className="w-full bg-cream/30 py-8 px-4 md:absolute md:top-0 md:right-0 md:h-full md:bg-transparent md:py-0 md:px-0 md:pointer-events-none flex justify-center md:items-center md:justify-end md:pr-12 z-20">
        <form
          className="card p-4 md:p-6 bg-white/95 backdrop-blur max-w-md w-full md:w-[28rem] pointer-events-auto shadow-xl"
          onSubmit={submitRequest}
        >
          <h3 className="font-display font-bold text-cocoa text-lg">Looking for Custom Fabrics or Delivery?</h3>
          <div className="mt-3 grid grid-cols-1 gap-3">
            <select
              className="w-full p-2 border border-peach rounded bg-white text-cocoa"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              required
            >
              <option value="">Select Location</option>
              {locations.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
            <div className="flex gap-4 text-sm text-cocoa">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="timing"
                  value="today"
                  checked={form.timing === 'today'}
                  onChange={() => setForm({ ...form, timing: 'today', date: '' })}
                />
                Deliver Today
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="timing"
                  value="later"
                  checked={form.timing === 'later'}
                  onChange={() => setForm({ ...form, timing: 'later' })}
                />
                Schedule Later
              </label>
            </div>
            {form.timing === 'later' && (
              <input
                type="date"
                className="w-full p-2 border border-peach rounded"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            )}
            <textarea
              placeholder="What do you need?"
              className="w-full p-2 border border-peach rounded h-20"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
            ></textarea>
            <button className="btn btn-primary w-full">Request via WhatsApp</button>
          </div>
        </form>
      </div>
    </section>
  )
}
