const nextConfig = {
  async redirects() {
    return [
      // {
      //   source: "/brands",
      //   destination: "/brands",
      //   permanent: false,
      // },
      {
        source: "/brands/0",
        destination: "/brands",
        permanent: false,
      },
      {
        source: "/brands/1",
        destination: "/brands",
        permanent: false,
      },
      {
        source: "/brand",
        destination: "/brands",
        permanent: false,
      },
      {
        source: "/blog/tagged-by",
        destination: "/blog",
        permanent: false,
      },
      {
        source: "/brands/tagged-by",
        destination: "/brands",
        permanent: true,
      },
      {
        source: "/page",
        destination: "/",
        permanent: true,
      },
    ];
  },

  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
      // Common e-commerce platforms
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "*.myshopify.com",
      },
      {
        protocol: "https",
        hostname: "*.shopify.com",
      },
      // Allow all subdomains
      {
        protocol: "https",
        hostname: "*.com",
      },
      {
        protocol: "https",
        hostname: "*.in",
      },
      {
        protocol: "https",
        hostname: "*.co",
      },
      {
        protocol: "https",
        hostname: "*.us",
      },
    ],
    imageSizes: [128, 256, 384],
    deviceSizes: [625, 1024, 1400, 2048, 3840],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    unoptimized: false,
  },
  env: {
    BASE_URL: "http://localhost:3000",
    // BASE_URL: "https://discoveringbrands.com",
    HASH: "JNXSJNOJQDND*H#B^BX&G*HS*HUICuieh982hsy(*H&HWUHSO*H8hs8h2u3hdui2h",
  },
};

module.exports = nextConfig;
