import { cookies } from 'next/headers'
import crypto from 'crypto'

const COOKIE_NAME = 'admin_session'

function sign(payload: string) {
  const secret = process.env.ADMIN_SECRET || 'change-me'
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(payload)
  return `${payload}.${hmac.digest('hex')}`
}

function verify(token: string) {
  const [payload, signature] = token.split('.')
  const secret = process.env.ADMIN_SECRET || 'change-me'
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(payload)
  return signature === hmac.digest('hex')
}

export async function setAdminSession() {
  const payload = `${Date.now()}`
  const token = sign(payload)
  try {
    const cookieStore = await cookies()
    cookieStore.set(COOKIE_NAME, token, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 })
  } catch (e) {
    console.error('Error setting admin session:', e)
  }
}

export async function isAdmin() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(COOKIE_NAME)?.value
    if (!token) return false
    return verify(token)
  } catch (e) {
    console.error('Error checking admin status:', e)
    return false
  }
}

export async function clearAdmin() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete(COOKIE_NAME)
  } catch (e) {
    console.error('Error clearing admin session:', e)
  }
}
