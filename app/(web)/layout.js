import "../../styles/bootstrap.min.css";
import "../../styles/globals.css";
import "../../styles/dashboard.css";
import { Suspense } from "react";
import Analytics from "@/utils/Analytics";
import Header from "@/FCOMPS/Header";
import Footer from "@/FCOMPS/Footer";
import Loading from "./loading";

export default function RootLayout({ children }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": "https://discoveringbrands.com",
    "logo": "https://discoveringbrands.com/_next/image?url=%2Flogo-db.svg&w=64&q=75",
    "name": "Discovering Brands",
    "description": "Discovering Brands is a B2B platform for stores to list and showcase products, reach wider audiences, and grow their business.",
    // "address": {
    //   "@type": "PostalAddress",
    //   "addressLocality": "Mumbai",
    //   "addressRegion": "MH",
    //   "postalCode": "400001",
    //   "streetAddress": "123 Business Street"
    // },
    "email": "hello@discoveringbrands.com",
    // "telephone": "+91 9876543210",
    // "sameAs": [
    //   "https://www.facebook.com/discoveringbrands",
    //   "https://www.instagram.com/discoveringbrands",
    //   "https://www.linkedin.com/company/discoveringbrands",
    //   "https://twitter.com/discoveringbrands"
    // ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://discoveringbrands.com/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://discoveringbrands.com/search?q={query}",
      "query-input": "required name=query"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <Header />
        <Suspense fallback={<Loading />}>
          <Analytics />
          {children}
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
