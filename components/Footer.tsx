import { InstagramIcon, TwitterIcon, WhatsAppIcon } from './SocialIcons'

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-peach">
      <div className="container py-8 text-sm text-cocoa/80 flex flex-col items-center justify-center gap-6 text-center">
        <div className="flex items-center gap-6">
          <a href="https://instagram.com/honey_fabrics123" target="_blank" rel="noreferrer" className="text-cocoa hover:text-caramel transition-colors" aria-label="Instagram">
            <InstagramIcon className="w-6 h-6" />
          </a>
          <a href="https://twitter.com/honey_fabrics123" target="_blank" rel="noreferrer" className="text-cocoa hover:text-caramel transition-colors" aria-label="Twitter">
            <TwitterIcon className="w-6 h-6" />
          </a>
          <a href="https://wa.me/23409065160088" target="_blank" rel="noreferrer" className="text-cocoa hover:text-caramel transition-colors" aria-label="WhatsApp">
            <WhatsAppIcon className="w-6 h-6" />
          </a>
        </div>
        <div className="flex gap-4">
          <a href="/track" className="hover:text-caramel underline">Track Order</a>
        </div>
        <p>© {new Date().getFullYear()} Honey Fabrics · Lagos, Nigeria</p>
      </div>
    </footer>
  )
}
