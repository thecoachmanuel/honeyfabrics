import Header from '@components/Header'
import Footer from '@components/Footer'
import AdminDashboard from '@components/AdminDashboard'
import { prisma } from '@lib/db'
import { isAdmin } from '@lib/auth'
import { redirect } from 'next/navigation'
import { Category, Product, Slide, Order, Message, Notification, Review, DeliverySetting, SiteSetting, User, OrderItem } from '@prisma/client'

export const dynamic = 'force-dynamic'

export default async function Admin({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const { tab } = await searchParams
  if (!await isAdmin()) redirect('/admin/login')

  let settings: SiteSetting | null = null
  let categories: Category[] = []
  let products: (Product & { category: Category })[] = []
  let slides: Slide[] = []
  let orders: (Order & { items: (OrderItem & { product: Product })[] })[] = []
  let messages: Message[] = []
  let notifications: Notification[] = []
  let reviews: (Review & { user: User, product: Product })[] = []
  let deliverySettings: DeliverySetting | null = null

  try {
    settings = await prisma.siteSetting.findFirst()
    categories = await prisma.category.findMany()
    products = await prisma.product.findMany({ include: { category: true } })
    slides = await prisma.slide.findMany()
    orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' }, take: 200, include: { items: { include: { product: true } } } })
    messages = await prisma.message.findMany({ orderBy: { createdAt: 'desc' }, take: 200 })
    notifications = await prisma.notification.findMany({ orderBy: { createdAt: 'desc' }, take: 200 })
    reviews = await prisma.review.findMany({ include: { user: true, product: true }, orderBy: { createdAt: 'desc' } })
    deliverySettings = await prisma.deliverySetting.findFirst()
  } catch (error) {
    console.error('Error loading admin dashboard:', error)
  }

  return (
    <div>
      <Header />
      <section className="container py-12 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display font-bold text-cocoa">Admin Dashboard</h1>
          <form action="/api/admin/logout" method="POST">
             <button className="text-sm text-red-600 hover:underline">Logout</button>
          </form>
        </div>
        <AdminDashboard
          settings={settings}
          categories={categories}
          products={products}
          slides={slides}
          orders={orders}
          messages={messages}
          notifications={notifications}
          reviews={reviews}
          deliverySettings={deliverySettings}
          initialTab={tab}
        />
      </section>
      <Footer />
    </div>
  )
}
