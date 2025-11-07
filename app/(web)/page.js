import DataCardComponent from "@/FCOMPS/DataCardComponent";
import FAQs from "@/FCOMPS/FAQs";
import FeaturedBrandSpotlight from "@/FCOMPS/FeaturedBrandSpotlight";
import HeroBanner from "@/FCOMPS/HeroBanner";
import HomeSection1 from "@/FCOMPS/HomeSection1";
import Subscriber from "@/FCOMPS/Subscriber";
import USPSection from "@/FCOMPS/USPSection";
import { getHomeMetaData } from "@/functions/meta-functions";
import {
  getBrandForHomePage,
  getBlogForHomePage,
  getCategoryForHomePage,
  getFeaturedBrandForHomePage
} from "@/helpers/frontend/functions";
import BrandListingButton from "@/FCOMPS/BrandListingButton";

export const revalidate = 0;

export default async function Home() {
  // const brandData = await getBrandForHomePage();
  const featuredBrandData = await getFeaturedBrandForHomePage();
  const categoryData = await getCategoryForHomePage();
  const blogData = await getBlogForHomePage();
  const test_data= [
    {
      id: "6581ec74afcb1c431f30e72b", 
      name: "BoAt Lifestyle",
      path: "boat-lifestyle",
      image: "https://www.boat-lifestyle.com/cdn/shop/files/boAt_logo_small_3067da8c-a83b-46dd-b28b-6ef1e16ccd17_small.svg",
      description1: "Welcome to Boat Lifestyle, where sound meets style! Specializing in innovative audio solutions like Bluetooth Earphones, Dolby Soundbars, and powerful Power Banks, Boat Lifestyle is your ultimate destination for enhancing entertainment experiences. With a commitment to quality and affordability, our diverse range includes everything from Noise Cancellation Earbuds to Portable Speakers, catering to music lovers, gamers, and on-the-go adventurers alike. Discover the perfect blend of technology and modern design, and elevate your lifestyle with Boat. Dive into our collection today and embrace the rhythm of life with 20% off your first purchase!"
    },
    {
      id: "6581ec74afcb1c431f30e793",
      name: "Bella Vita Organic",
      path: "bellavitaorganic",
      image: "https://bellavitaorganic.com/cdn/shop/files/Asset_3_00aea36a-9db4-49ad-a274-f7a93de4aa3c.png",
      description1: "Add flavor and nutrition to daily meals with Bhavnagaris' quality ingredients. From nuts and mithai to masalas and more, their fresh Maharashtrian specialties bring authentic tastes to your kitchen. Shop traditional essentials online."
    },
    {
      id: "6581ec74afcb1c431f30f3c3",
      name: "Blue Tokai Coffee",
      path: "blue-tokai-coffee",
      image: "https://bluetokaicoffee.com/cdn/shop/t/80/assets/bt-logo.svg",
      description1: "Find the rich heritage of Bluetokaicoffee, where exceptional coffee meets artisanal craftsmanship. Sourced from the lush landscapes of Karnataka, our selection of single estate coffees, like the Chikmagalur and Tamil Nadu blends, promises a delightful taste experience whether you prefer it black or with milk. From our best-selling brew bags and convenient capsules to unique subscriptions, Bluetokaicoffee caters to all coffee enthusiasts. Embrace the vibrant flavors fruity, nutty, or chocolatey and elevate your coffee ritual today. Explore our products and indulge in the remarkable journey of coffee with Bluetokaicoffee!"
    },
    {
      id: "68d12f9ab79fa7cce3cea1e0",
      name: "Dot and Key",
      path: "dot-and-key",
      image: "https://www.dotandkey.com/cdn/shop/files/Vector_5.svg?v=1720438003&width=600",
      description1: ""
    },
    {
      id: "6581ec74afcb1c431f30f43c",
      name: "Nicobar",
      path: "nicobar",
      image: "https://www.nicobar.com/cdn/shop/files/Group_888_2x_2fb95207-d8f6-4b1e-8d9e-ca25f0d61ab0.png",
      description1: "Find the essence of modern Indian craftsmanship with Nicobar, a brand that beautifully intertwines tradition and contemporary design. Celebrated for its unique, sustainable fashion and home decor, Nicobar caters to discerning shoppers who value ethical luxury. Each piece reflects an authentic narrative, making it perfect for those who seek to express their individuality. Embrace the art of mindful living with Nicobar, and explore our exquisite collection today because style is not just what you wear; it's a lifestyle. Visit us to find a gift card that embodies your commitment to quality and sustainability!"
    },
    {
      id: "68ff5f013cabc45b2ce58a97",
      name: "ROYCE’ India",
      path: "royce-india",
      image: "https://royceindia.com/cdn/shop/files/Group_1_348792a0-2704-4960-882b-680eef6c0fc3.svg?v=1706515697&width=280",
      description1: "ROYCE’ Chocolate India brings the art of Japanese luxury chocolate to your doorstep. Known for its rich texture, refined taste, and premium presentation, ROYCE’ offers an exquisite range of chocolate gift hampers — from silky Nama chocolates to curated gift boxes perfect for every celebration. Whether it’s a festive surprise or a heartfelt gesture, ROYCE’ turns every moment into a truly indulgent experience."
    }

  ];
  const test = JSON.stringify(test_data);
  return (
    <>
      <HeroBanner />
      <DataCardComponent
        title="Trending Brands"
        cta_text="View All"
        cta_url="/brands"
        slug="brand"
        data={test}
        content="Discover and shop best direct-to-consumer (D2C) brands in India across skincare, clothing, gifting, home appliances, baby care, and more. Explore handpicked collections featuring high-quality, innovative, and unique products from trusted homegrown D2C brands. Enjoy a seamless, all-in-one platform that empowers you to compare, discover, and buy top-rated brands, exclusive launches, and trending offerings—making it easy to find perfect products for any need, occasion, or lifestyle."
        layout={1}
      />
      <BrandListingButton />

      <DataCardComponent
        title="Get Your D2C Brand in Front of Thousands of Buyers"
        cta_text="View All"
        cta_url="/brands"
        slug="brand"
        data={featuredBrandData}
        content="Join our D2C brands list and showcase your products directly to engaged buyers visiting our homepage."
        layout={3}
      />
      <FeaturedBrandSpotlight />
      <DataCardComponent
        title="Trending Category"
        cta_text="View All"
        cta_url="/category"
        slug="category"
        data={categoryData}
        content="Shop with ease on Discovering Brands. Explore leading D2C brands in grocery, health & beauty, women’s fashion, kids’ fashion, books, electronics, skincare, clothing, gifting, home appliances, and baby care products."
        layout={1}
      />
      <USPSection />
      <DataCardComponent
        title="Discovering Blogs"
        cta_text="View All"
        cta_url="/blog"
        slug="blog"
        data={blogData}
        content="Discover in-depth product reviews, inspiring brand journeys, D2C business insights, gifting ideas, lifestyle inspiration, fashion trends, and expert shopping guides. From emerging homegrown D2C brands to the latest in beauty, wellness, fashion, and home "
        layout={6}
      />
      <Subscriber />
      <FAQs />
    </>
  );
}

export async function generateMetadata() {
  try {
    const response = await getHomeMetaData();
    if (response.error) {
      throw new Error(`Metadata fetch error: ${response.error}`);
    }

    const title = response[0]?.homeMetaTitle || "Discovering Brands";
    const description =
      response[0]?.homeMetaDescription ||
      "Discovering Brands is a B2B company that provides a platform for stores to list and showcase their products to a wider audience";

    return {
      title,
      description,
    };
  } catch (error) {
    console.error("Error in generateMetadata:", error.message);
    return {
      title: "Discovering Brands",
      description:
        "Discovering Brands is a B2B company that provides a platform for stores to list and showcase their products to a wider audience",
    };
  }
}
