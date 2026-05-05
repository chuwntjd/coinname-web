import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "Yeti", // 네이버 검색봇
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: "https://coinname.kr/sitemap.xml",
  }
}
