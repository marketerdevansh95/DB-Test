"use server";
import Blog from "@/models/blogModel";
import Brand from "@/models/brandModel";
import Category from "@/models/categoryModel";
import Meta from "@/models/metaModel";
import Page from "@/models/pageModel";
import Product from "@/models/productModel";
import SubCategory from "@/models/subCategoryModel";
import connectToDataBase from "@/utils/connectToDataBase";

export const getHomeMetaData = async () => {
  try {
    await connectToDataBase();
    const data = await Meta.find().select("homeMetaTitle homeMetaDescription");
    return data;
  } catch (error) {
    return { error: "Meta for Home Page Not Found" };
  }
};

export const getBrandsMetaData = async () => {
  try {
    await connectToDataBase();
    const data = await Meta.find().select(
      "brandMetaTitle brandMetaDescription"
    );
    return { data };
  } catch (error) {
    return { error: "Brands Page Meta Not Found" };
  }
};

export const getCategoryMeta = async (slug) => {
  try {
    await connectToDataBase()
    const data = await Category.findOne({ path: slug }).select(
      "metaTitle metaDescription"
    );

    if (data) {
      return data;
    } else {
      return { error: "No meta found" };
    }
  } catch (error) {
    // console.error("Error fetching category meta:", error);
    return { error: "No meta found" };
  }
};


export const getSingleBlogMeta = async (slug) => {
  try {
    const data = await Blog.findOne({ path: slug }).select(
      "metaTitle metaDescription"
    );
    return data;
  } catch (error) {
    return { error: "No meta found" };
  }
};

export const getBrandMeta = async (path) => {
  try {
    const data = await Brand.findOne({ path: path }).select(
      "metaTitle metaDescription"
    );
    return data;
  } catch (error) {
    return { error: "No meta found" };
  }
};

export const getSubCategoryMeta = async (slug) => {
  try {
    await connectToDataBase();
    const data = await SubCategory.findOne({ path: slug }).select(
      "metaTitle metaDescription"
    );
    if (data) {
      return data;
    } else {
      return { error: "No meta found" };
    }
  } catch (error) {
    return { error: "No meta found" };
  }
};

export const getPageMeta = async (slug) => {
  try {
    await connectToDataBase();
    const data = await Page.findOne({ path: slug }).select(
      "metaTitle metaDescription"
    );
    if (data) {
      return data;
    } else {
      return { error: "No meta found" };
    }
  } catch (error) {
    return { error: "No meta found" };
  }
};

export const getProductMeta = async (brandName, productHandle) => {
  try {
    await connectToDataBase();
    let product;

    // let product = await Product.findOne({ handle: handle });
    // if (product) {
    //   return { status: 201, product };
    // }

    const brand = await Brand.findOne({ path: brandName })
      .select("name url path")
      .populate("category");

    if (!brand) {
      return { error: "Brand not found", status: 400 };
    }

    const productResponse = await fetch(
      `${brand.url}/products/${productHandle}.json`,
      { cache: "no-cache" }
    );
    if (!productResponse.ok) {
      return { error: "Product not found", status: 400 };
    }

    product = await productResponse.json();
    product["brand"] = brand;
    return product;
  } catch (error) {
    return { error: "No meta found" };
  }
};

