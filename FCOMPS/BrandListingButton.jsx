import Link from "next/link";

const BrandListingButton = () => {
  return (
    <div className="brand-listing-button-wrapper">
      <Link href="/contact">
        <button className="brand-listing-button">
          List Your Brand
        </button>
      </Link>
      <p className="brand-listing-subtitle">
        Get featured in 48hours
      </p>
    </div>
  );
};

export default BrandListingButton;
