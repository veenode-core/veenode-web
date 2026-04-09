import { supabase, applyFilters } from "./db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "veenode_secret_123";

/**
 * Helper to map Supabase snake_case back to Frontend camelCase
 */
function mapPost(post: any) {
  if (!post) return null;
  return {
    ...post,
    coverImage: post.cover_image,
    readTime: post.read_time,
    publishedAt: post.published_at,
  };
}

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const path = url.pathname;
  const method = req.method;
  const params = url.searchParams;

  const headers: Record<string, string> = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Content-Type": "application/json",
  };

  if (method === "OPTIONS") return new Response(null, { headers });

  try {
    const segments = path.split("/").filter(Boolean);
    const isAdmin = segments.includes("admin");
    const isBlog = segments.includes("blog");
    const isServices = segments.includes("services");
    const isAuth = segments.includes("auth");

    // --- DIAGNOSTIC ROOT ---
    if (segments.length === 0 || (segments.length === 1 && segments[0] === "api")) {
      const dbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "Not Set";
      return new Response(JSON.stringify({ 
        message: "Veenode API (Supabase) is active.",
        version: "1.0.1",
        db: dbUrl
      }), { headers });
    }

    // --- PUBLIC READ ROUTES ---
    if (!isAdmin && !isAuth) {
      if (isBlog && method === "GET") {
        let query = supabase.from('blog_posts').select('*', { count: 'exact' });
        query = applyFilters(query, params);
        const { data, error, count } = await query;
        if (error) throw error;
        return new Response(JSON.stringify({ data: (data || []).map(mapPost), count }), { headers });
      }

      if (isServices && method === "GET") {
        const { data, error } = await supabase.from('services').select('*').order('title');
        if (error) throw error;
        return new Response(JSON.stringify(data), { headers });
      }
    }

    // --- AUTH ROUTES ---
    if (isAuth && method === "POST") {
      const { email, password } = await req.json();
      const envEmail = process.env.ADMIN_EMAIL || 'veenodetech@gmail.com';
      const envPass = process.env.ADMIN_PASSWORD || 'VictorAkinode@10';

      let isValid = (email === envEmail && password === envPass);
      if (!isValid) {
        const { data: admin } = await supabase.from('admins').select('*').eq('email', email).single();
        if (admin && await bcrypt.compare(password, admin.password)) isValid = true;
      }

      if (isValid) {
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "24h" });
        return new Response(JSON.stringify({ token, user: { email } }), { headers });
      }
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401, headers });
    }

    // --- ADMIN ROUTES (Requires Auth) ---
    if (isAdmin) {
      const authHeader = req.headers.get("Authorization");
      if (!authHeader?.startsWith("Bearer ")) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers });
      }
      try {
        jwt.verify(authHeader.split(" ")[1], JWT_SECRET);
      } catch {
        return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401, headers });
      }

      // BLOG
      if (isBlog) {
        const lastSegment = segments[segments.length - 1];
        const id = lastSegment !== "blog" ? lastSegment : null;

        if (!id && method === "GET") {
          const { data, error, count } = await supabase.from('blog_posts').select('*', { count: 'exact' }).order('published_at', { ascending: false });
          if (error) throw error;
          return new Response(JSON.stringify({ data: (data || []).map(mapPost), count }), { headers });
        }

        if (method === "POST") {
          const body = await req.json();
          const { data, error } = await supabase.from('blog_posts').insert([{
            title: body.title, slug: body.slug, excerpt: body.excerpt, body: body.body,
            category: body.category, cover_image: body.coverImage || body.cover_image,
            author: body.author, read_time: parseInt(body.readTime || "5"),
            tags: body.tags, featured: !!body.featured, published_at: new Date().toISOString()
          }]).select().single();
          if (error) throw error;
          return new Response(JSON.stringify(mapPost(data)), { headers });
        }

        if (id && method === "GET") {
          const { data, error } = await supabase.from('blog_posts').select('*').eq('id', id).single();
          if (error) throw error;
          return new Response(JSON.stringify(mapPost(data)), { headers });
        }

        if (id && method === "PUT") {
          const body = await req.json();
          const { data, error } = await supabase.from('blog_posts').update({
            title: body.title, slug: body.slug, excerpt: body.excerpt, body: body.body,
            category: body.category, cover_image: body.coverImage || body.cover_image,
            author: body.author, read_time: parseInt(body.readTime || "5"),
            tags: body.tags, featured: !!body.featured
          }).eq('id', id).select().single();
          if (error) throw error;
          return new Response(JSON.stringify(mapPost(data)), { headers });
        }

        if (id && method === "DELETE") {
          const { error } = await supabase.from('blog_posts').delete().eq('id', id);
          if (error) throw error;
          return new Response(JSON.stringify({ success: true }), { headers });
        }
      }

      // SERVICES
      if (isServices) {
        const lastSegment = segments[segments.length - 1];
        const id = lastSegment !== "services" ? lastSegment : null;

        if (!id && method === "GET") {
          const { data, error } = await supabase.from('services').select('*').order('title');
          if (error) throw error;
          return new Response(JSON.stringify(data), { headers });
        }

        if (method === "POST") {
          const body = await req.json();
          const { data, error } = await supabase.from('services').insert([body]).select().single();
          if (error) throw error;
          return new Response(JSON.stringify(data), { headers });
        }

        if (id && method === "DELETE") {
          const { error } = await supabase.from('services').delete().eq('id', id);
          if (error) throw error;
          return new Response(JSON.stringify({ success: true }), { headers });
        }
      }
    }

    return new Response(JSON.stringify({ error: `Path ${path} not found` }), { status: 404, headers });
  } catch (error: any) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers });
  }
}

if (import.meta.main || process.env.BUN_ENV === 'development') {
  const port = process.env.PORT || 3001;
  Bun.serve({ port, fetch: handler });
  console.log(`Bun (Supabase Resilient) API running at http://localhost:${port}`);
}
