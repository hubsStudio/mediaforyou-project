import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-50 pt-gr-5 pb-10 border-t border-gray-200">
      <div className="container mx-auto px-4">
        
        {/* Top: Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold text-lg mb-4">Media4You</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              We curate premium streetwear from global partners. 
              Elevating your style with sustainable, high-quality fashion.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/shop/new">New Arrivals</Link></li>
              <li><Link href="/shop/men">Men</Link></li>
              <li><Link href="/shop/women">Women</Link></li>
              <li><Link href="/shop/accessories">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Help</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/shipping">Shipping & Returns</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/track">Track Order</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Global Hubs</h4>
            <p className="text-sm text-gray-500 mb-2">Printing & Shipping from:</p>
            <ul className="text-sm text-gray-600 grid grid-cols-2 gap-2">
              <li>🇺🇸 USA</li><li>🇬🇧 UK</li>
              <li>🇪🇺 Europe</li><li>🇯🇵 Japan</li>
              <li>🇦🇺 Australia</li><li>🇧🇷 Brazil</li>
            </ul>
          </div>
        </div>

        {/* Middle: SEO Text (Important for 2026) */}
        <div className="border-t border-gray-200 py-8">
          <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Why Media4You?</h5>
          <p className="text-xs text-gray-400 leading-relaxed text-justify">
            Media4You utilizes a global network of production hubs to ensure your custom apparel is printed and shipped from a location nearest to you. 
            We partner with industry leaders like Champion, Adidas, and Gildan to bring you eco-friendly, high-quality fabrics combined with 
            state-of-the-art Direct-to-Garment (DTG) technology. Whether you are looking for vintage streetwear, minimalism design, or corporate swag, 
            our platform ensures fast delivery worldwide with a reduced carbon footprint.
          </p>
        </div>

        {/* Bottom: Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200 text-xs text-gray-400">
          <p>© 2026 Media4You Inc. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}