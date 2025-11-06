import { Schema, models, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    categoryImage: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    description1: {
      type: String,
    },
    description2: {
      type: String,
    },
    metaTitle: {
      type: String,
      required: true,
    },
    metaDescription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Category = models.Category || model("Category", categorySchema);

export default Category;
