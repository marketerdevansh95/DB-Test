import DataCardComponent from "@/FCOMPS/DataCardComponent";
import Subscriber from "@/FCOMPS/Subscriber";
import HomeSection1 from "./HomeSection1";
import USPSection from "./USPSection";
import FAQs from "./FAQs";

const HomePage = (props) => {
  const { brandData, categoryData, blogData } = props;

  return (
    <>
      <HomeSection1 />
      <DataCardComponent
        title="Trending Brands"
        cta_text="View All"
        cta_url="/brands"
        slug="brand"
        data={brandData}
        content="Explore and shop from the most popular brands that are adored by millions, now at Discovering Brands."
        layout={1}
      />
      <DataCardComponent
        title="Top Categories"
        cta_text="View All"
        cta_url="/category"
        slug="category"
        data={categoryData}
        content="Online Shopping Simplified. Dive into the categories to explore the most popular brands, and their products to make a firm buying decision."
        layout={2}
      />
      <USPSection />
      <DataCardComponent
        title="Discovering Blogs"
        cta_text="View All"
        cta_url="/blog"
        slug="blog"
        data={blogData}
        content="Stay up-to-date! Get the latest updates, Product reviews, Brand reviews and insights, and more information at Discovering Blogs - Official Blog of Discovering Brands."
        layout={6}
      />
      <Subscriber />
      <FAQs />
    </>
  );
};

export default HomePage;
