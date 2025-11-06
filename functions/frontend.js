"use server";
import BlogCategory from "@/models/blogCategoryModel";
import Blog from "@/models/blogModel";
import Brand from "@/models/brandModel";
import Category from "@/models/categoryModel";
import SubCategory from "@/models/subCategoryModel";
import Page from "@/models/pageModel";
import connectMongoDB from "@/utils/connectToDataBase";
import { Types } from "mongoose";
import mongoose from "mongoose";

export const getHomeData = async () => {
  try {
    await connectMongoDB();
    const [brandData, categoryData, blogData] = await Promise.all([
      Brand.aggregate([
        {
          $project: {
            _id: 0,
            id: "$_id",
            name: 1,
            path: "$path",
            image: "$imageUrl",
            description1: 1,
          },
        },
        { $sample: { size: 10 } },
      ]),
      Category.aggregate([
        {
          $project: {
            _id: 0,
            id: "$_id",
            name: 1,
            path: 1,
            image: "$categoryImage",
          },
        },
        { $sample: { size: 10 } },
      ]),
      Blog.find().sort({ createdAt: -1 }).limit(10),
    ]);

    const brandDataString = JSON.stringify(brandData);
    const categoryDataString = JSON.stringify(categoryData);
    const blogDataString = JSON.stringify(blogData);

    return {
      brandDataString: brandDataString,
      categoryDataString: categoryDataString,
      blogDataString: blogDataString,
    };
  } catch (error) {
    // console.error("Error fetching home data:", error);
    return {
      brandData: "",
      categoryData: "",
      blogData: "",
      error: "Failed to fetch home data",
    };
  }
};

export const allCategoryData = async () => {
  try {
    await connectMongoDB();
    const data = await Category.aggregate([
      {
        $project: {
          _id: 0,
          id: "$_id",
          name: 1,
          path: 1,
          image: "$categoryImage",
        },
      },
    ]);

    const categoryString = JSON.stringify(data);
    return { categoryString: categoryString };
  } catch (error) {
    return {
      categoryString: categoryString,
      error: "Error getting all category",
    };
  }
};

export const getAllBrandsPaginate = async (pageNo) => {
  try {
    await connectMongoDB();
    const brandCount = await Brand.countDocuments();
    const page = parseInt(pageNo) || 1;
    const pageSize = 54;
    const skipCount = (page - 1) * pageSize;
    const totalPages = Math.ceil(brandCount / pageSize);
    if (isNaN(page) || page <= 0) {
      return { error: "Invalid page parameter" };
    }
    if (page > totalPages) {
      return {
        error: "Page number exceeds total pages",
      };
    }
    const paginatedBrands = await Brand.aggregate([
      {
        $match: { active: "Y" },
      },
      {
        $project: {
          _id: 0,
          id: "$_id",
          name: 1,
          path: "$path",
          image: "$imageUrl",
        },
      },
      {
        $sort: { name: 1 },
      },
      {
        $skip: skipCount,
      },
      {
        $limit: pageSize,
      },
    ]);

    // Clean up image URLs by trimming whitespace and filtering invalid URLs
    const cleanedBrands = paginatedBrands.map(brand => {
      let cleanImage = brand.image ? brand.image.trim() : null;
      
      // Check if the image URL is valid
      if (cleanImage && cleanImage.length > 0) {
        try {
          new URL(cleanImage);
          // If it's a valid URL, keep it
        } catch (e) {
          // If it's not a valid URL, set to null
          cleanImage = null;
        }
      } else {
        cleanImage = null;
      }
      
      return {
        ...brand,
        image: cleanImage
      };
    });

    const brandDataString = JSON.stringify(cleanedBrands);
    return { brandDataString: brandDataString, totalPages };
  } catch (error) {
    return {
      brandDataString: "",
      totalPages: 1,
      error: "Failed to fetch all brands",
    };
  }
};

export const getBrandAndProducts = async (path) => {
  try {
    await connectMongoDB();
    const brandData = await Brand.findOne({ path: path }).populate("category");

    if (!brandData) {
      return { error: "Brand not Found" };
    }

    try {
      const currency_request = await fetch(`${brandData.url}/cart.json`);
      if (!currency_request.ok) {
        throw new Error("Failed to fetch currency data");
      }
      const currency_response = await currency_request.json();

      const response = await fetch(`${brandData.url}/products.json?limit=50`);
      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }

      const data = await response.json();
      data.currency = currency_response;

      const brandDataString = JSON.stringify(brandData);
      const productDataString = JSON.stringify(data);

      return {
        brandDataString: brandDataString,
        productDataString: productDataString,
      };
    } catch (fetchError) {
      // console.error("Fetch error:", fetchError);
      return {
        brandDataString: "",
        productDataString: "",
        error: "Failed to fetch data from brand URL",
      };
    }
  } catch (error) {
    // console.error("Database error:", dbError);
    return {
      brandDataString: "",
      productDataString: "",
      error: "Brand not Found in Database",
    };
  }
};

export const getBrandAndSingleProduct = async (path, handle) => {
  try {
    await connectMongoDB();

    const brand = await Brand.findOne({ path }).select("name url path");

    if (!brand) {
      return { error: "Brand not found" };
    }

    const currency_request = await fetch(`${brand.url}/cart.json`);
    const currency_response = await currency_request.json();
    const product = await fetch(
      `${brand.url}/products/${handle}.json`
    ).then((res) => res.json());

    if (!product) {
      return { error: "Product Not Found" };
    }

    const moreProducts = await fetch(
      `${brand.url}/products.json?limit=20`
    ).then((res) => res.json());

    moreProducts.currency = currency_response;

    const brandString = JSON.stringify(brand);
    const productString = JSON.stringify(product.product);
    const currencyString = JSON.stringify(currency_response.currency);
    const moreString = JSON.stringify(moreProducts);

    return {
      brandString: brandString,
      productString: productString,
      currencyString: currencyString,
      moreString: moreString,
    };
  } catch (error) {
    return { error: "No Data Found" };
  }
};

export const getCategoryAndBrands = async (path) => {
  try {
    await connectMongoDB();

    const category = await Category.findOne({ path });

    if (!category) {
      return Response.json({ error: "Category not found", status: 400 });
    }

    const categoryId = category._id;

    const brands = await Brand.aggregate([
      {
        $match: {
          category: { $in: [categoryId] },
        },
      },
      {
        $unwind: "$category",
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoriesData",
        },
      },
      {
        $unwind: "$categoriesData",
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          id: { $first: "$_id" },
          path: { $first: "$path" },
          image: { $first: "$imageUrl" },
        },
      },
      {
        $project: {
          _id: 0,
          id: 1,
          name: 1,
          path: 1,
          image: 1,
        },
      },
    ]);

    const categoryDataString = JSON.stringify(category);
    const brandDataString = JSON.stringify(brands);
    return {
      categoryDataString: categoryDataString,
      brandDataString: brandDataString,
    };
  } catch (error) {
    return { brandDataString: "", brandDataString: "", error: "No Data Found" };
  }
};

export const allSubCategoryData = async () => {
  try {
    await connectMongoDB();
    const data = await SubCategory.aggregate([
      {
        $project: {
          _id: 0,
          id: "$_id",
          name: 1,
          path: 1,
          image: "$subCategoryImage",
        },
      },
    ]);

    const subcategoryString = JSON.stringify(data);
    return { subcategoryString };
  } catch (error) {
    return {
      subcategoryString: "",
      error: "Error getting all subcategory",
    };
  }
};

export const getSubCategoryAndBrands = async (path) => {
  try {
    await connectMongoDB();

    const subCategory = await SubCategory.findOne({ path });

    if (!subCategory) {
      return Response.json({ error: "SubCategory not found", status: 400 });
    }

    const subCategoryId = subCategory._id;
    // Normalize subcategory to match Category component expectations
    const subCategoryObj = subCategory.toObject ? subCategory.toObject() : subCategory;
    if (!subCategoryObj.categoryImage && subCategoryObj.subCategoryImage) {
      subCategoryObj.categoryImage = subCategoryObj.subCategoryImage;
    }

    const brands = await Brand.aggregate([
      {
        $match: {
          subCategory: { $in: [subCategoryId] },
        },
      },
      { $unwind: "$subCategory" },
      {
        $lookup: {
          from: "subcategories",
          localField: "subCategory",
          foreignField: "_id",
          as: "subCategoriesData",
        },
      },
      { $unwind: "$subCategoriesData" },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          id: { $first: "$_id" },
          path: { $first: "$path" },
          image: { $first: "$imageUrl" },
        },
      },
      {
        $project: {
          _id: 0,
          id: 1,
          name: 1,
          path: 1,
          image: 1,
        },
      },
    ]);

    const subCategoryDataString = JSON.stringify(subCategoryObj);
    const brandDataString = JSON.stringify(brands);
    return {
      subCategoryDataString,
      brandDataString,
    };
  } catch (error) {
    return { subCategoryDataString: "", brandDataString: "", error: "No Data Found" };
  }
};

export const getSimilarBrands = async (path) => {
  try {
    await connectMongoDB();
    // Find the brand with the given path
    const brand = await Brand.findOne({ path });

    if (!brand) {
      return { error: "No Data Found" };
    }

    // Get the first category ID of the brand
    const categoryId = brand.category[0];

    // Fetch similar brands in the same category
    const similarBrands = await Brand.aggregate([
      {
        $match: { category: { $in: [categoryId] } },
      },
      {
        $project: {
          _id: 0,
          id: "$_id",
          name: 1,
          path: "$path",
          image: "$imageUrl",
          description1: 1,
        },
      },
      { $sample: { size: 30 } },
    ]);

    const similarBrandString = JSON.stringify(similarBrands);
    return { similarBrandString: similarBrandString };
  } catch (error) {
    console.error("Error fetching similar brands:", error);
    return {
      similarBrandString: "",
      error: "An error occurred while fetching data.",
    };
  }
};

export const getBlogCategory = async () => {
  try {
    await connectMongoDB();
    const blogCategory = await BlogCategory.find().select(
      "name path image description"
    );
    const blogCategoryString = JSON.stringify(blogCategory);
    return {
      blogCategoryString: blogCategoryString,
    };
  } catch (error) {
    return {
      blogCategoryString: "",
      error: "Server error while fetching blog category",
    };
  }
};

export const getBlogCategoryBlogs = async (category) => {
  try {
    await connectMongoDB();
    const blogCategory = await BlogCategory.findOne({ path: category });

    if (!blogCategory) {
      return Response.json({ status: 400, error: "Blog category not found" });
    }

    const blogCategoryId = blogCategory._id;

    const blogs = await Blog.find({
      blogCategory: { $in: [blogCategoryId] },
      active: "Y",
    }).sort({ updatedAt: -1 }); // -1 = descending

    const brands = await Brand.aggregate([
      {
        $project: {
          _id: 0,
          id: "$_id",
          name: 1,
          path: "$path",
          image: "$imageUrl",
          description1: 1,
        },
      },
      { $sample: { size: 40 } },
    ]);
    const categoryBlogsString = JSON.stringify(blogs);
    const brandString = JSON.stringify(brands);
    return {
      categoryBlogsString: categoryBlogsString,
      brandString: brandString,
    };
  } catch (error) {
    return {
      categoryBlogsString: "",
      brandString: "",
      error: "Server error while feching blogs",
    };
  }
};

export const getBlogTagged = async (tag) => {
  try {
    await connectMongoDB();
    const slug = tag.replaceAll("-", " ");
    const blogs = await Blog.find({
      tags: { $regex: new RegExp(slug, "i") },
      active: "Y",
    });
    const blogString = JSON.stringify(blogs);
    return { blogString: blogString };
  } catch (error) {
    return {
      blogString: "",
      error: "Server error while getting blog data",
    };
  }
};

export const getSingleBlog = async (handle) => {
  try {
    await connectMongoDB();
    const blog = await Blog.findOne({ path: handle, active: "Y" }).select(
      "name description1 description2 image active tags"
    );

    const brands = await Brand.aggregate([
      {
        $project: {
          _id: 0,
          id: "$_id",
          name: 1,
          path: "$path",
          image: "$imageUrl",
          description1: 1,
        },
      },
      { $sample: { size: 40 } },
    ]);

    const blogString = JSON.stringify(blog);
    const brandString = JSON.stringify(brands);
    return {
      blogString: blogString,
      brandString: brandString,
    };
  } catch (error) {
    return {
      blogString: "",
      brandString: "",
      error: "Server error while fetching blog data",
    };
  }
};

export const getPage = async (slug) => {
  try {
    await connectMongoDB();
    const page = await Page.findOne({ path: slug });
    if (!page) {
      return { error: "Page not found" };
    }
    return { page };
  } catch (error) {
    return { error: "Server error" };
  }
};

export const getAllPagesPaginate = async (pageNo) => {
  try {
    await connectMongoDB();

    let pageCount = await Page.countDocuments({
      _id: { 
        $nin: [
          new mongoose.Types.ObjectId("65882992ecff8b140145ef0c"),
          new mongoose.Types.ObjectId("6593eb3db2eac73ae88663fc"),
          new mongoose.Types.ObjectId("665565afa6e8492abc5a4e29"),
        ],
      },
      active: "Y", // ✅ count only active pages
    });


    // let pageCount = await Page.countDocuments();
    // pageCount = pageCount - 3;
    console.log(pageCount);

    const page = parseInt(pageNo) || 1;
    const pageSize = 6;
    const skipCount = (page - 1) * pageSize;

    const totalPages = Math.ceil(pageCount / pageSize);

    if (isNaN(page) || page <= 0) {
      return { error: "Invalid page parameter" };
    }
    if (pageCount > 0 && page > totalPages) {
      return { error: "Page number exceeds total pages" };
    }
    const excludedIds = [
      "65882992ecff8b140145ef0c",
      "6593eb3db2eac73ae88663fc",
      "665565afa6e8492abc5a4e29",
    ].map((id) => new mongoose.Types.ObjectId(id));

    // const test = await Page.find({ _id: { $in: excludedIds } });
    // console.log("Should return excluded docs:", test);
    const paginatedPages = await Page.aggregate([
      { $match: { _id: { $nin: excludedIds }, active: "Y" } },
      {
        $project: {
          _id: 0,
          id: "$_id",
          name: 1,
          path: "$path",
          image: 1,
        },
      },
      { $sort: { name: 1 } },
      { $skip: skipCount },
      { $limit: pageSize },
    ]);

    const pageDataString = JSON.stringify(paginatedPages);
    return { pageDataString, totalPages: totalPages || 1 };
  } catch (error) {
    return {
      pageDataString: "",
      totalPages: 1,
      error: error.message || "Failed to fetch all pages",
    };
  }
};

export const checkIfPathExists = async (path) => {
  try {
    await connectMongoDB();
    const check = await Page.findOne({ path }); // only need one
    return !!check; // true if found, false if not
    // console.log(path);
    // console.log(!!check);
  } catch (err) {
    console.error("checkIfPathExists error:", err);
    return false;
  }
};

