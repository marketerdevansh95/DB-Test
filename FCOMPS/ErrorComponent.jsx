"use client";
import Image from "next/image";
import Link from "next/link";

const ErrorComponent = () => {
  return (
    <div className="error-component">
      <div className="container">
        <div className="error-wrapper">
          <h1>Whoa! You’ve Stumbled</h1>
          <div>
            <Image
              className="img-fluid"
              alt="404 Image"
              src="https://cdn.shopify.com/s/files/1/0654/9887/4110/files/404.svg?v=1703420574"
              width={500}
              height={500}
              quality={50}
            />
          </div>
          <h2>Let’s get you back Home</h2>
          <Link className="home-cta" href={"/"} prefetch={false}>
            Take Me Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent;
