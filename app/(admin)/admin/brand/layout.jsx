import { Suspense } from "react";

export default function BrandLayout({ children }) {
  return (
    <>
      <Suspense>{children}</Suspense>
    </>
  );
}