import { Schema, models, model } from "mongoose";

const blogSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description1: {
      type: String,
      required: true,
    },
    description2: {
      type: String,
      default: "",
    },
    metaTitle: {
      type: String,
      required: true,
    },
    metaDescription: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
    },
    order: {
      type: Number,
      default: 0,
    },
    active: {
      type: String,
      default: "Y",
      required: true,
    },
    catpath: {
      type: String,
      required: true,
    },
    blogCategory: {
      type: Schema.Types.ObjectId,
      ref: "BlogCategory",
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = models.Blog || model("Blog", blogSchema);

export default Blog;
