"use client";
import React, { useState } from "react";

const FAQs = () => {
  const faqData = [
  {
    question: "What is Discovering Brands?",
    answer:
      "Discovering Brands is a platform dedicated to giving D2C brands the visibility they deserve. We help homegrown businesses showcase their unique products across various categories, including gifting, lifestyle, wellness, home appliances, fashion, and more. Our goal is to connect D2C brands with high-intent shoppers who are actively seeking premium, curated products.",
  },
  {
    question: "How can my D2C brand get listed on Discovering Brands?",
    answer:
      (
      <>
        <a className="faq-link" href="/contact">Listing your D2C brand</a> is simple. You can submit your brand details through our website. Our team reviews submissions, after which your products can go live for shoppers to discover.
      </>
    ),
  },
  {
    question: "What are the benefits of showcasing my brand on Discovering Brands?",
    answer:
      "By showcasing your brand, you gain exposure to a highly engaged audience looking for curated D2C products. Benefits include increased visibility, opportunities to feature in blogs.",
  },
  {
    question: "How does Discovering Brands help increase visibility for my D2C brand?",
    answer:
      (
      <>
        We increase visibility through multiple channels: featured placements across categories and <a className="faq-link" href="/blog">blog features</a>. Our platform connects your brand to users actively searching for specific products, helping generate higher engagement and potential sales.
      </>
    ),
  },
  {
    question: "Can I promote specific product categories or collections through the platform?",
    answer:
      "Yes, Discovering Brands allows you to showcase products across relevant categories, whether it’s gifting, home essential, wellness, fashion, or festive collections.",
  },
  {
    question: "How does Discovering Brands connect my brand with high-intent shoppers?",
    answer:
      "Our platform attracts users specifically looking for curated, premium D2C products. Through strategic category placements and blog features, your brand reaches an audience already interested in purchasing high-quality products, whether it’s for gifting, lifestyle, or personal use.",
  },
  {
    question: "What makes Discovering Brands different from other marketplaces for D2C brands?",
    answer:
      "Discovering Brands focuses exclusively on D2C brands, helping you stand out rather than competing with mass-market products. We offer curated exposure, targeted visibility, and opportunities to connect with shoppers who value unique, homegrown, and premium products.",
  },
  {
    question: "Can I showcase my brand across multiple categories or just one?",
    answer:
      "You can showcase your brand across multiple categories. This is particularly beneficial if your D2C brand offers diverse products, such as gifting, wellness, fashion, or home essentials. Multiple category visibility helps increase discoverability and reach a wider audience.",
  },
  {
    question: "How quickly can my brand go live after submission?",
    answer:
      "Once your submission is reviewed and approved, your brand can go live within a few business days. Our team ensures all listings are optimised, and category placement is accurate before publishing.",
  },
  {
    question: "Why choose Discovering Brands?",
    answer:
      "Discovering Brands is the ideal platform for D2C brands looking to grow their visibility and reach. We provide curated exposure, access to high-intent shoppers, opportunities for seasonal and festival campaigns, and dedicated support to help your brand thrive. Unlike marketplaces, we focus exclusively on D2C brands, ensuring your products get the attention.",
  },
  {
    question: "Can I request personalised marketing support for my brand?",
    answer:
      "Absolutely, our team works with D2C brands to provide personalised marketing support, including blog features and curated collection placements. We aim to highlight your brand’s unique value and ensure it reaches the right audience.",
  },
];


  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Generate FAQPage Schema from faqData
  const faqSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="faq-section">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
            >
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                {faq.question}
                <span className="indicator">
                  {activeIndex === index ? "-" : "+"}
                </span>
              </div>
              {activeIndex === index && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FAQs;
