
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
  title = "DUHAVA - Định Hình Tương Lai Số",
  description = "DUHAVA - Chuyên triển khai Chatbot AI, Tự động hóa quy trình, Hệ thống số hóa & Đào tạo AI cho doanh nghiệp tại TP.HCM. Giải pháp công nghệ tăng hiệu quả kinh doanh.",
  keywords = "Chatbot AI, Tự động hóa doanh nghiệp, Automation, Đào tạo AI, Chuyển đổi số, Digital Marketing, DUHAVA, Giải pháp công nghệ TP.HCM",
  image = "https://i.imgur.com/Gzu37oF.jpeg",
  url = typeof window !== 'undefined' ? window.location.href : 'https://duhava.com',
  type = 'website',
  schema
}) => {
  const siteTitle = title.includes("DUHAVA") ? title : `${title} | DUHAVA - Định Hình Tương Lai Số`;

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
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

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
