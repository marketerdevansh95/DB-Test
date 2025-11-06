import { Schema, models, model } from "mongoose";

const categorySubcategorySchema = new Schema(
  {
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    subcategoryId: { type: Schema.Types.ObjectId, ref: "SubCategory", required: true },
  },
  { timestamps: true }
);

const CategorySubcategory = models.CategorySubcategory || model("CategorySubcategory", categorySubcategorySchema);

export default CategorySubcategory;
