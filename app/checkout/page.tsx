import Header from '@components/Header'
import Footer from '@components/Footer'
import CheckoutForm from '@components/CheckoutForm'
import { prisma } from '@lib/db'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export default async function CheckoutPage() {
  let settings = null
  let deliverySettings = null
  
  try {
    settings = await prisma.siteSetting.findFirst()
    deliverySettings = await prisma.deliverySetting.findFirst()
  } catch (e) {
    console.error('Error loading checkout settings:', e)
  }

  const cookieStore = await cookies()
  const session = cookieStore.get('user_session')
  let user = null

  if (session?.value) {
    try {
      user = await prisma.user.findUnique({
        where: { id: parseInt(session.value) },
        select: { name: true, email: true, phone: true }
      })
    } catch (e) {
      console.error('Error loading user for checkout:', e)
    }
  }

  return (
    <div>
      <Header name={settings?.businessName} logoUrl={settings?.logoUrl ?? undefined} />
      <section className="container py-12">
        <h1 className="text-3xl font-display font-bold text-cocoa mb-8">Checkout</h1>
        <CheckoutForm settings={deliverySettings} user={user} />
      </section>
      <Footer />
    </div>
  )
}
