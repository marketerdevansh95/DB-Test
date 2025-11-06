import fs from "fs";
import path from "path";
import connectToDataBase from "@/utils/connectToDataBase";
import Brand from "@/models/brandModel";

export async function POST(request) {
    let allProducts = [];
  try {
    await connectToDataBase();
    // const brands = await Brand.find({ active: "Y" }).sort({ name: 1 });

    // for (const brand of brands) {
    //   try {
    //     const productDataReq = await fetch(
    //       `${brand.url}/products.json?limit=50`
    //     );

    //     if (!productDataReq.ok) {
    //       console.error(
    //         `Failed to fetch products for brand ${brand.name}: ${productDataReq.statusText}`
    //       );
    //       console.log(
    //         "Failed for brand ------------------------------------",
    //         brand.name
    //       );
    //       continue;
    //     }

    //     const productData = await productDataReq.json();

    //     for (const product of productData.products) {
    //       allProducts.push({
    //         url : `https://discoveringbrands.com/brand/${brand.path}/${product.handle}`
    //       });
    //     }

    //     console.log(
    //       "Done Brand ///////////////////////////////////////////////",
    //       brand.name
    //     );
    //   } catch (fetchError) {
    //     console.error(
    //       `Error fetching or processing products for brand ${brand.name}:`,
    //       fetchError
    //     );
    //   }
    // }

    // // Generate and save sitemaps
    // const sitemaps = generateSitemaps(allProducts);
    // sitemaps.forEach((xml, index) => {
    //   const filePath = path.resolve("./public", `sitemap-product-${index + 1}.xml`);
    //   fs.writeFileSync(filePath, xml, "utf8");
    // });

    return Response.json({
      status: 200,
      message: "Sitemaps generated successfully.",
    });
  } catch (error) {
    console.error("Error generating sitemaps:", error);
    return Response.json({
      status: 500,
      message: "Error generating sitemaps.",
    });
  }
}

function generateSitemaps(products) {
  const maxUrls = 50000;
  const sitemaps = [];
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  products.forEach((item, index) => {
    if (index > 0 && index % maxUrls === 0) {
      xml += "</urlset>";
      sitemaps.push(xml);
      xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    }

    xml += `<url>\n`;
    xml += `  <loc>${item.url}</loc>\n`;
    xml += `  <lastmod>${new Date().toISOString()}</lastmod>\n`;
    xml += `  <changefreq>weekly</changefreq>\n`;
    xml += `  <priority>0.8</priority>\n`;
    xml += `</url>\n`;
  });

  xml += "</urlset>";
  sitemaps.push(xml);
  return sitemaps;
}
