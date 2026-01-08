'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AINavigator() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: 'Hi! I can help you navigate. Try asking "Where are the products?" or "Contact info".' }
  ])
  const [input, setInput] = useState('')
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMsg = input.trim()
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setInput('')

    // Simulate AI processing delay
    setTimeout(() => {
      const lower = userMsg.toLowerCase()
      let response = "I'm not sure about that. Try 'Shop', 'Contact', or 'About'."
      
      if (lower.includes('cake') || lower.includes('shop') || lower.includes('buy') || lower.includes('product') || lower.includes('fabric')) {
        response = "I'll take you to the Shop!"
        setTimeout(() => router.push('/shop'), 1000)
      } else if (lower.includes('contact') || lower.includes('phone') || lower.includes('whatsapp') || lower.includes('email') || lower.includes('address')) {
        response = "Scrolling to contact info..."
        setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 1000)
      } else if (lower.includes('admin') || lower.includes('login')) {
        response = "Navigating to Admin Login..."
        setTimeout(() => router.push('/admin/login'), 1000)
      } else if (lower.includes('about') || lower.includes('who')) {
        response = "We are Honey Fabrics, offering the best quality fabrics and products."
      } else if (lower.includes('help')) {
        response = "I can take you to the Shop, Contact section, or Admin Login. Just ask!"
      }

      setMessages(prev => [...prev, { role: 'bot', text: response }])
    }, 500)
  }

  return (
    <div className="fixed bottom-24 right-6 z-50 font-sans">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-cocoa text-cream p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center gap-2 animate-bounce"
        >
          <span className="text-xl">🤖</span>
          <span className="font-bold text-sm hidden md:inline">AI Help</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col border border-cocoa/10 animate-fade-in-up">
          <div className="bg-cocoa text-cream p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold flex items-center gap-2">
              <span>🤖</span> AI Navigator
            </h3>
            <button onClick={() => setIsOpen(false)} className="hover:text-caramel">✕</button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-cream/20" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-2 rounded-lg text-sm shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-caramel text-white rounded-br-none' 
                    : 'bg-white text-cocoa border border-cocoa/10 rounded-bl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-3 border-t bg-white rounded-b-lg flex gap-2">
            <input 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask me..."
              className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:border-caramel focus:ring-1 focus:ring-caramel"
            />
            <button className="bg-cocoa text-white px-4 py-2 rounded text-sm hover:bg-cocoa/90 transition-colors">Send</button>
          </form>
        </div>
      )}
    </div>
  )
}
