import { getDB, saveDB } from "./db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "veenode_secret_123";

/**
 * Monolithic API Handler
 * Optimized for Bun locally and Vercel Serverless/Edge.
 */

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const path = url.pathname;
  const method = req.method;

  // CORS Headers
  const headers: Record<string, string> = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Content-Type": "application/json",
  };

  if (method === "OPTIONS") {
    return new Response(null, { headers });
  }

  try {
    // --- ROOT ---
    if (path === "/" || path === "/api") {
      return new Response(JSON.stringify({ message: "Veenode Monolithic API is running." }), { headers });
    }

    // --- PUBLIC READ ROUTES ---
    if (path === "/api/blog" && method === "GET") {
      const db = await getDB();
      return new Response(JSON.stringify(db.blogPosts), { headers });
    }

    if (path === "/api/services" && method === "GET") {
      const db = await getDB();
      return new Response(JSON.stringify(db.services), { headers });
    }

    // --- AUTH ---
    if (path === "/api/auth/login" && method === "POST") {
      const { email, password } = await req.json();
      const db = await getDB();
      const admin = db.admins.find((a) => a.email === email);

      if (admin && (admin.password === password || await bcrypt.compare(password, admin.password))) {
        const token = jwt.sign({ email: admin.email }, JWT_SECRET, { expiresIn: "24h" });
        return new Response(JSON.stringify({ token, user: { email: admin.email } }), { headers });
      }
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401, headers });
    }

    // --- PROTECTED ADMIN ROUTES ---
    const authHeader = req.headers.get("Authorization");
    if (path.startsWith("/api/admin")) {
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers });
      }
      const token = authHeader.split(" ")[1];
      try {
        jwt.verify(token, JWT_SECRET);
      } catch {
        return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401, headers });
      }

      // 1. Manage Blog
      if (path === "/api/admin/blog" && method === "POST") {
        const data = await req.json();
        const db = await getDB();
        const newPost = {
          ...data,
          id: crypto.randomUUID(),
          publishedAt: new Date().toISOString(),
          readTime: parseInt(data.readTime || "5"),
          featured: !!data.featured,
          tags: Array.isArray(data.tags) ? data.tags : []
        };
        db.blogPosts.unshift(newPost);
        await saveDB(db);
        return new Response(JSON.stringify(newPost), { headers });
      }

      if (path.startsWith("/api/admin/blog/") && method === "DELETE") {
        const id = path.split("/").pop();
        const db = await getDB();
        db.blogPosts = db.blogPosts.filter(p => p.id !== id);
        await saveDB(db);
        return new Response(JSON.stringify({ success: true }), { headers });
      }

      // 2. Manage Services
      if (path === "/api/admin/services" && method === "POST") {
        const data = await req.json();
        const db = await getDB();
        const newService = {
          ...data,
          id: crypto.randomUUID()
        };
        db.services.push(newService);
        await saveDB(db);
        return new Response(JSON.stringify(newService), { headers });
      }

      if (path.startsWith("/api/admin/services/") && method === "DELETE") {
        const id = path.split("/").pop();
        const db = await getDB();
        db.services = db.services.filter(s => s.id !== id);
        await saveDB(db);
        return new Response(JSON.stringify({ success: true }), { headers });
      }
    }

    // --- DEFAULT 404 ---
    return new Response(JSON.stringify({ error: `Path ${path} not found` }), { status: 404, headers });

  } catch (error: any) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers });
  }
}

// Local Bun Server entry point
if (import.meta.main || process.env.BUN_ENV === 'development') {
  const port = process.env.PORT || 3001;
  Bun.serve({
    port,
    fetch: handler
  });
  console.log(`Bun Monolithic API running at http://localhost:${port}`);
}
