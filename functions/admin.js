import BlogCategory from "@/models/blogCategoryModel";
import Blog from "@/models/blogModel";
import Brand from "@/models/brandModel";
import Category from "@/models/categoryModel";
import Query from "@/models/queryModel";
import Subscriber from "@/models/subscriberModel";
import connectToDataBase from "@/utils/connectToDataBase";

// Admin First Page Data
export const getAdminHomeData = async () => {
  try {
    await connectToDataBase();
    const brand = await Brand.countDocuments({ active: "Y" });
    const category = await Category.countDocuments();
    const blog = await Blog.countDocuments();
    const blogCategory = await BlogCategory.countDocuments();
    const query = await Query.countDocuments();

    return {
      brand,
      category,
      blog,
      blogCategory,
      query,
      status: 200,
    };
  } catch (error) {
    console.error("Error fetching admin home data:", error);
    return { message: "Failed to retrieve admin home data.", status: 400 };
  }
};

// Get All Subscriber List
export const getAllSubscriber = async () => {
  try {
    await connectToDataBase();
    const subscribers = await Subscriber.find();
    const data = JSON.stringify(subscribers);
    return { data, status: 200 };
  } catch (error) {
    console.error("Error fetching sunscriber data:", error);
    return { message: "Failed to retrieve subscriber data.", status: 400 };
  }
};

// Get All Query List
export const getAllQuery = async () => {
  try {
    await connectToDataBase();
    const query = await Query.find().sort({ createdAt: "desc" });
    const data = JSON.stringify(query);
    return { data, status: 200 };
  } catch (error) {
    console.error("Error fetching query data:", error);
    return { message: "Failed to retrieve query data.", status: 400 };
  }
};
