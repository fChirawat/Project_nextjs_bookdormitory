import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { image } = req.body;
  if (!image) {
    return res.status(400).json({ error: "No image provided" });
  }

  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "dormitory",
    });
    return res.status(200).json({ url: result.secure_url });
  } catch (error: any) {
    console.error("Upload Error:", error);
    return res.status(500).json({ error: "Upload failed", details: error.message });
  }
}
