import { Schema, model, models } from "mongoose";

const metaSchema = new Schema(
  {
    homeMetaTitle: {
      type: String,
      required: true,
    },
    homeMetaDescription: {
      type: String,
    },
    brandMetaTitle: {
      type: String,
      required: true,
    },
    brandMetaDescription: {
      type: String,
    },
    categoryMetaTitle: {
      type: String,
      required: true,
    },
    categoryMetaDescription: {
      type: String,
    },
    blogMetaTitle: {
      type: String,
      required: true,
    },
    blogMetaDescription: {
      type: String,
    },
    searchMetaTitle: {
      type: String,
      required: true,
    },
    searchMetaDescription: {
      type: String,
    },
    contactMetaTitle: {
      type: String,
      required: true,
    },
    contactMetaDescription: {
      type: String,
    },
  },
  { timestamps: true }
);

const Meta = models.Meta || model("Meta", metaSchema);
export default Meta;
