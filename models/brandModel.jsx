import { Schema, models, model } from "mongoose";

const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    subCategory: [
      {
        type: Schema.Types.ObjectId,
        ref: "SubCategory",
      },
    ],
    url: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description1: {
      type: String,
    },
    description2: {
      type: String,
    },
    tags: {
      type: String,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    order: {
      type: Number,
      default: 0,
    },
    insta: {
      type: String,
      default: null,
    },
    youtube: {
      type: String,
      default: null,
    },
    facebook: {
      type: String,
      default: null,
    },
    twitter: {
      type: String,
      default: null,
    },
    active: {
      type: String,
      default: "Y",
      required: true,
    },
  },
  { timestamps: true }
);

const Brand = models.Brand || model("Brand", brandSchema);

export default Brand;
