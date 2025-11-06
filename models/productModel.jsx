import { Schema, models, model } from "mongoose";

const productSchema = new Schema(
  {
    handle: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    brand: {
      type: String,
    },
    url: {
      type: String,
    },
    active: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", productSchema);

export default Product;
