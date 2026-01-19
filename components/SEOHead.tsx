
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  schema?: Record<string, any>;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "DUHAVA - Thống Trị Thị Trường Số | Digital Marketing Agency",
  description = "DUHAVA Agency cung cấp giải pháp Digital Marketing tổng thể: SEO, Quảng cáo đa kênh, Branding và Thiết kế Website cao cấp. Giúp doanh nghiệp bứt phá doanh thu.",
  keywords = "Digital Marketing Agency, Dịch vụ SEO, Quảng cáo Facebook, Google Ads, Thiết kế Website, Branding, DUHAVA",
  image = "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200",
  url = typeof window !== 'undefined' ? window.location.href : 'https://duhava.com',
  type = 'website',
  schema
}) => {
  const siteTitle = title.includes("DUHAVA") ? title : `${title} | DUHAVA Agency`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
