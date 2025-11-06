import Link from "next/link";

const BrandListingButton = () => {
  return (
    <div className="brand-listing-button-wrapper">
      <Link href="/contact">
        <button
          className="brand-listing-button"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontWeight: 500, textDecoration: "underline" }}>
            List Your Brand
          </span>
          <span>and Get Featured in 48 Hours</span>
        </button>
      </Link>
    </div>
  );
};

export default BrandListingButton;
