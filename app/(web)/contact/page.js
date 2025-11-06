import ContactForm from "@/FCOMPS/ContactForm";
import { allCategoryData } from "@/functions/frontend";
import React from "react";

const Contact = async () => {
  const category = await allCategoryData();

  return (
    <>
      <ContactForm category={category} />
    </>
  );
};

export default Contact;
