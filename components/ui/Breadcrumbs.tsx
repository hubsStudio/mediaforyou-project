'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react' // ⚠️ อย่าลืมลง: bun add lucide-react

interface BreadcrumbItem {
  label: string
  href?: string
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="w-full py-gr-2 overflow-x-auto whitespace-nowrap">
      <ol className="flex items-center space-x-2 text-sm text-gray-500">
        
        {/* Home Icon */}
        <li className="flex items-center">
          <Link href="/" className="hover:text-black transition-colors flex items-center gap-1 p-1 rounded-md hover:bg-gray-100">
            <Home className="w-4 h-4" />
          </Link>
        </li>

        {/* Items Loop */}
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="w-4 h-4 text-gray-300 mx-1" />
            {item.href ? (
              <Link 
                href={item.href} 
                className="hover:text-black transition-colors hover:underline underline-offset-4 decoration-glass-border"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-black px-2 py-0.5 bg-gray-50 rounded-md border border-gray-100">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>

      {/* 🧠 Smart SEO Data (Hidden) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": items.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 2,
              "name": item.label,
              "item": item.href ? `https://media4you.com${item.href}` : undefined
            }))
          })
        }}
      />
    </nav>
  )
}