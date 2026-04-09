/**
 * Simple Cloudinary Upload Service
 * Uses the standard REST API to upload files.
 */

const CLOUD_NAME = "desbso8v8";
const UPLOAD_PRESET = "ml_default"; 

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "Cloudinary Upload Failed");
  }

  const data = await response.json();
  return data.secure_url;
};
