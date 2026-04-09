/**
 * Simple Cloudinary Upload Service
 * Uses the standard REST API to upload files.
 * 
 * IMPORTANT: You must create an "Unsigned" upload preset in your Cloudinary Dashboard.
 * 1. Go to Cloudinary Settings (cog icon) -> Upload.
 * 2. Scroll down to "Upload presets" and click "Add upload preset".
 * 3. Set "Signing Mode" to "Unsigned".
 * 4. Use the name "veenode_uploads" or update the constant below.
 */

const CLOUD_NAME = "desbso8v8";
const UPLOAD_PRESET = "ml_default";

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Cloudinary Error Data:", errorData);
      throw new Error(errorData.error?.message || "Cloudinary Upload Failed");
    }

    const data = await response.json();
    console.log("Cloudinary Upload Success:", data.secure_url);
    return data.secure_url;
  } catch (error: any) {
    console.error("Cloudinary Upload Exception:", error);
    throw error;
  }
};
