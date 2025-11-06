// Ensure that window has the dataLayer property
if (typeof window !== "undefined") {
  window.dataLayer = window.dataLayer || [];
}

// GTM ID from environment variables
export const GTM_ID = "GTM-K7Z3JNT";

// Function to track page views
export const pageview = function (url) {
  if (
    typeof window !== "undefined" &&
    typeof window.dataLayer !== "undefined"
  ) {
    window.dataLayer.push({
      event: "pageview",
      page: url,
    });
  } else {
    console.log({
      event: "pageview",
      page: url,
    });
  }
};
