"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Image from "next/image";
import Link from "next/link";

const HomeComponent = (props) => {
  const { brandsData, categoriesData } = props;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    brandName: "",
    contact: "",
    message: "",
  });

  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.BASE_URL}/api/query-routes/submit-query`,
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        toast.success("Request Submitted", {
          theme: "colored",
        });
        setIsSubmitSuccessful(true);
        setFormData({
          name: "",
          email: "",
          brandName: "",
          contact: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      setIsSubmitSuccessful(false);
    }
  }, [isSubmitSuccessful]);

  const categoryListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: categoriesData?.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@id": `https://discoveringbrands.com/category/${item.path}`,
        name: item.name,
        "@type": "Item",
        description: item.description1,
        image: item.categoryImage,
      },
    })),
  };

  const brandListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: brandsData?.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@id": `https://discoveringbrands.com/brand/${item.path}`,
        name: item.brandName,
        "@type": "Brand",
        description: item.description1,
        image: item.imageUrl,
      },
    })),
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="wrapper">
        <section className="component-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="home-heading">
                <h1>Best D2C brands in India</h1>
                <Link
                  className="home-cta d-des"
                  prefetch={false}
                  href={"/brand"}
                >
                  View All
                </Link>
              </div>
            </div>
            <div className="">
              <div className="row">
                {brandsData?.map((brand) => {
                  return (
                    <div className="col-lg-3" key={brand.path}>
                      <div className="card-new" key={brand.path}>
                        <Link prefetch={false} href={`/brand/${brand.path}`}>
                          <div className="home-image-wrapper">
                            <Image
                              itemProp="image"
                              className="img-fluid"
                              priority={true}
                              quality={50}
                              src={brand.imageUrl}
                              alt={brand.brandName}
                              width={300}
                              height={300}
                            />
                          </div>
                        </Link>
                        <div className="home-brand-card-content">
                          <div>
                            <h2>
                              <Link
                                prefetch={false}
                                href={`/brand/${brand.path}`}
                              >
                                {brand.brandName}
                              </Link>
                            </h2>
                            <ul>
                              {brand.categories.map((item) => {
                                return (
                                  <li key={item.path}>
                                    <Link
                                      prefetch={false}
                                      href={`/category/${item.path}`}
                                    >
                                      #{item.name}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          <div>
                            <Link
                              className="home-cta"
                              prefetch={false}
                              href={`/brand/${brand.path}`}
                            >
                              View Products
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <Link className="home-cta d-mob" prefetch={false} href={"/brand"}>
              View All Brands
            </Link>
          </div>
        </section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(brandListSchema),
          }}
        />
        <section className="component-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="home-heading">
                <h1>Categories</h1>
                <Link
                  className="home-cta d-des"
                  prefetch={false}
                  href={"/category"}
                >
                  View All
                </Link>
              </div>
            </div>
            <div className="">
              <div className="row">
                {categoriesData?.map((item) => {
                  return (
                    <div className="col-lg-3" key={item.path}>
                      <div className="card-new" key={item.name}>
                        <div className="card-image-wrapper">
                          <Link
                            prefetch={false}
                            href={`/category/${item.path}`}
                          >
                            <Image
                              itemProp="image"
                              className="img-fluid"
                              priority={true}
                              quality={50}
                              src={item.categoryImage}
                              alt={item.name}
                              width={300}
                              height={300}
                            />
                          </Link>
                        </div>
                        <div className="home-category-card-content">
                          <div>
                            <h2>
                              <Link
                                prefetch={false}
                                href={`/category/${item.path}`}
                              >
                                {item.name}
                              </Link>
                            </h2>
                          </div>
                          <div>
                            <Link
                              className="home-cta"
                              prefetch={false}
                              href={`/category/${item.path}`}
                            >
                              View Brands
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <Link
              className="home-cta d-mob"
              prefetch={false}
              href={"/category"}
            >
              View All Categories
            </Link>
          </div>
        </section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(categoryListSchema),
          }}
        />
        <div className="component-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="contact-form-heading">
                <h1>Any Query? Connect With Us</h1>
              </div>
            </div>
            <div className="row">
              <div className="form-wrap">
                <form id="survey-form" onSubmit={submitHandler}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="form-control"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="form-control"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="brandName">Brand Name</label>
                        <input
                          type="text"
                          name="brandName"
                          id="brandName"
                          className="form-control"
                          value={formData.brandName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="contact">Contact Number</label>
                        <input
                          type="tel"
                          name="contact"
                          id="contact"
                          className="form-control"
                          value={formData.contact}
                          onChange={handleChange}
                          pattern="^\d{10}$"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="message">Query</label>
                        <textarea
                          name="message"
                          id="message"
                          className="form-control"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <button
                        type="submit"
                        id="submit"
                        className="btn btn-primary btn-block"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeComponent;
