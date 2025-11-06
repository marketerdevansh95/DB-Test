import { Schema, models, model } from "mongoose";

const pageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    image: {
      type: String,
      default: "", 
    },
    active: {
      type: String,
      default: "Y",
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

const Page = models.Page || model("Page", pageSchema);

export default Page;
