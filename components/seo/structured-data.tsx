import Script from "next/script"

interface StructuredDataProps {
  type: "article" | "community" | "cryptocurrency"
  data: any
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case "article":
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: data.title,
          description: data.description,
          author: {
            "@type": "Person",
            name: data.author,
          },
          datePublished: data.publishedDate,
          dateModified: data.modifiedDate,
          publisher: {
            "@type": "Organization",
            name: "코인네임",
            logo: {
              "@type": "ImageObject",
              url: "https://coinname.kr/logo.png",
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": data.url,
          },
        }

      case "community":
        return {
          "@context": "https://schema.org",
          "@type": "DiscussionForumPosting",
          headline: data.title,
          text: data.content,
          author: {
            "@type": "Person",
            name: data.author,
          },
          dateCreated: data.createdDate,
          interactionStatistic: [
            {
              "@type": "InteractionCounter",
              interactionType: "https://schema.org/LikeAction",
              userInteractionCount: data.likes,
            },
            {
              "@type": "InteractionCounter",
              interactionType: "https://schema.org/CommentAction",
              userInteractionCount: data.comments,
            },
          ],
        }

      case "cryptocurrency":
        return {
          "@context": "https://schema.org",
          "@type": "FinancialProduct",
          name: data.name,
          description: data.description,
          category: "Cryptocurrency",
          provider: {
            "@type": "Organization",
            name: "코인네임",
          },
          offers: {
            "@type": "Offer",
            price: data.price,
            priceCurrency: "USD",
          },
        }

      default:
        return {}
    }
  }

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  )
}
