import { Schema, models, model } from "mongoose";

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parents: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    path: {
      type: String,
      required: true,
    },
    subCategoryImage: {
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

const SubCategory = models.SubCategory || model("SubCategory", subCategorySchema);

export default SubCategory;
