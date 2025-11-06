import fs from "fs";
import path from "path";
import connectToDataBase from "@/utils/connectToDataBase";
import BlogCategory from "@/models/blogCategoryModel";

export async function GET(request) {
  try {
    await connectToDataBase();
    const blogCategory = await BlogCategory.find();
    const xml = generateSitemap(blogCategory);
    const filePath = path.resolve("./public", "sitemap-blog-category.xml");

    fs.writeFileSync(filePath, xml, "utf8");

    return Response.json({
      status: 200,
      message: "Sitemap generated for blog category successfully.",
    });
  } catch (error) {
    // console.error("Error generating category sitemap:", error);
    return Response.json({
      status: 500,
      message: "Error generating blog category sitemap.",
    });
  }
}

function generateSitemap(blogCategory) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  blogCategory.forEach((item) => {
    xml += `<url>\n`;
    xml += `  <loc>https://discoveringbrands.com/blog/${item.path}</loc>\n`;
    xml += `  <lastmod>${new Date().toISOString()}</lastmod>\n`;
    xml += `  <changefreq>weekly</changefreq>\n`;
    xml += `  <priority>0.9</priority>\n`;
    xml += `</url>\n`;
  });

  xml += "</urlset>";
  return xml;
}
