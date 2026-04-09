import { put, list, del } from '@vercel/blob';

/**
 * Simple Database Wrapper for Vercel Blob
 * We store our data as JSON files in the blob storage.
 */

const DATA_PATH = 'data/db.json';

interface AppData {
  blogPosts: any[];
  services: any[];
  admins: any[];
}

const initialData: AppData = {
  blogPosts: [],
  services: [],
  admins: [
    {
      email: process.env.ADMIN_EMAIL || 'veenodetech@gmail.com',
      password: process.env.ADMIN_PASSWORD || 'VictorAkinode@10', // In production, this should be hashed
    }
  ]
};

export async function getDB(): Promise<AppData> {
  try {
    const { blobs } = await list();
    const dbBlob = blobs.find(b => b.pathname === DATA_PATH);
    
    if (!dbBlob) {
      await saveDB(initialData);
      return initialData;
    }

    const response = await fetch(dbBlob.url, {
      headers: {
        Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
      },
    });
    
    if (!response.ok) {
       throw new Error(`Failed to fetch private blob: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch DB:", error);
    return initialData;
  }
}

export async function saveDB(data: AppData) {
  try {
    await put(DATA_PATH, JSON.stringify(data), {
      access: 'private',
      addRandomSuffix: false, // Keep the same filename
    });
  } catch (error) {
    console.error("Failed to save DB:", error);
  }
}
