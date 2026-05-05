import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  name: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
      <Link href="/" className="flex items-center hover:text-blue-600">
        <Home className="h-4 w-4" />
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4" />
          {index === items.length - 1 ? (
            <span className="text-gray-900 font-medium">{item.name}</span>
          ) : (
            <Link href={item.href} className="hover:text-blue-600">
              {item.name}
            </Link>
          )}
        </div>
      ))}

      {/* 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "홈",
                item: "https://coinname.kr",
              },
              ...items.map((item, index) => ({
                "@type": "ListItem",
                position: index + 2,
                name: item.name,
                item: `https://coinname.kr${item.href}`,
              })),
            ],
          }),
        }}
      />
    </nav>
  )
}
