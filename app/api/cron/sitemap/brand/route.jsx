import fs from "fs";
import path from "path";
import connectToDataBase from "@/utils/connectToDataBase";
import Brand from "@/models/brandModel";

export async function GET(request) {
  try {
    await connectToDataBase();
    // const brands = await Brand.find();
    // const brandCount = await Brand.countDocuments();
    // const totalPages = Math.ceil(brandCount / 54);
    // const xml = generateSitemap(brands, totalPages);
    // const filePath = path.resolve("./public", "sitemap-brand.xml");

    // fs.writeFileSync(filePath, xml, "utf8");

    return Response.json({
      status: 200,
      message: "Sitemap generated for brand successfully.",
    });
  } catch (error) {
    // console.error("Error generating sitemap:", error);
    return Response.json({
      status: 500,
      message: "Error generating brand sitemap.",
    });
  }
}

function generateSitemap(brands, totalPages) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (let i = 1; i <= totalPages; i++) {
    xml += `<url>\n`;
    xml += `  <loc>https://discoveringbrands.com/brands/${i}</loc>\n`;
    xml += `  <lastmod>${new Date().toISOString()}</lastmod>\n`;
    xml += `  <changefreq>daily</changefreq>\n`;
    xml += `  <priority>0.8</priority>\n`;
    xml += `</url>\n`;
  }

  brands.forEach((item) => {
    xml += `<url>\n`;
    xml += `  <loc>https://discoveringbrands.com/brand/${item.path}</loc>\n`;
    xml += `  <lastmod>${new Date().toISOString()}</lastmod>\n`;
    xml += `  <changefreq>weekly</changefreq>\n`;
    xml += `  <priority>0.8</priority>\n`;
    xml += `</url>\n`;
  });

  xml += "</urlset>";
  return xml;
}
