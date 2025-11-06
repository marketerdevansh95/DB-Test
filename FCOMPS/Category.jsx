"use client";
import Image from "next/image";
import DataCardComponent from "./DataCardComponent";

const Category = (props) => {
  const { categoryDataString, brandDataString, showDescription2 = true } = props;
  const category = JSON.parse(categoryDataString);
  return (
    <>
      <div className="category-heading">
        <div>
          <Image
            className="img-fluid"
            priority={true}
            quality={50}
            src={category.categoryImage}
            alt={category.name}
            width={100}
            height={100}
          />
          <h1>{category.name}</h1>
        </div>
        <div dangerouslySetInnerHTML={{ __html: category.description1 }}></div>
      </div>

      {brandDataString == "" ? (
        <div className="container text-center mt-lg-5">
          <svg className="icon" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              fill="#8D8D8D"
              d="M12 2C6.485 2 2 6.485 2 12s4.485 10 10 10 10-4.485 10-10S17.515 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm1-12h-2v6h2v-6zm0 8h-2v2h2v-2z"
            />
          </svg>
          <p className="message">No Data Available</p>
        </div>
      ) : (
        <DataCardComponent
          title={false}
          cta_text={false}
          cta_url="/brands"
          slug="brand"
          data={brandDataString}
          layout={3}
        />
      )}
      {showDescription2 && (
        <div className="container">
          <div className="row">
            <div
              className="col=12"
              dangerouslySetInnerHTML={{ __html: category.description2 }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Category;
