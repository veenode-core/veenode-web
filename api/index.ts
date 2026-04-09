import { supabase, applyFilters } from "./db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "veenode_secret_123";

function mapPost(post: any) {
  if (!post) return null;
  return {
    ...post,
    coverImage: post.cover_image,
    readTime: post.read_time,
    publishedAt: post.published_at,
  };
}

export default async function handler(req: any, res: any) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;
  const method = req.method;
  const params = url.searchParams;

  const standardHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Content-Type": "application/json",
  };

  const send = (data: any, status = 200) => {
    Object.entries(standardHeaders).forEach(([k, v]) => res.setHeader(k, v));
    res.statusCode = status;
    res.end(JSON.stringify(data));
  };

  if (method === "OPTIONS") {
    Object.entries(standardHeaders).forEach(([k, v]) => res.setHeader(k, v));
    res.statusCode = 204;
    return res.end();
  }

  try {
    const segments = path.split("/").filter(Boolean);
    const isAdmin = segments.includes("admin");
    const isBlog = segments.includes("blog");
    const isServices = segments.includes("services");
    const isAuth = segments.includes("auth");

    if (segments.length === 0 || (segments.length === 1 && segments[0] === "api")) {
      const dbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "Not Set";
      return send({ 
        message: "Veenode API (Supabase) is active.",
        version: "1.0.1",
        db: dbUrl
      });
    }

    if (!isAdmin && !isAuth) {
      if (isBlog && method === "GET") {
        let query = supabase.from('blog_posts').select('*', { count: 'exact' });
        query = applyFilters(query, params);
        const { data, error, count } = await query;
        if (error) throw error;
        return send({ data: (data || []).map(mapPost), count });
      }

      if (isServices && method === "GET") {
        const { data, error } = await supabase.from('services').select('*').order('title');
        if (error) throw error;
        return send(data);
      }
    }

    if (isAuth && method === "POST") {
      const { email, password } = req.body;
      const { data: admin, error: dbError } = await supabase.from('admins').select('*').eq('email', email).single();
      if (dbError && dbError.code !== 'PGRST116') throw dbError;

      const isValid = admin && await bcrypt.compare(password, admin.password);
      if (isValid) {
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "24h" });
        return send({ token, user: { email } });
      }
      return send({ error: "Invalid credentials" }, 401);
    }

    if (isAdmin) {
      const authHeader = req.headers["authorization"];
      if (!authHeader?.startsWith("Bearer ")) return send({ error: "Unauthorized" }, 401);
      try {
        jwt.verify(authHeader.split(" ")[1], JWT_SECRET);
      } catch {
        return send({ error: "Invalid token" }, 401);
      }

      if (isBlog) {
        const lastSegment = segments[segments.length - 1];
        const id = lastSegment !== "blog" ? lastSegment : null;

        if (!id && method === "GET") {
          const { data, error, count } = await supabase.from('blog_posts').select('*', { count: 'exact' }).order('published_at', { ascending: false });
          if (error) throw error;
          return send({ data: (data || []).map(mapPost), count });
        }

        if (method === "POST") {
          const body = req.body;
          const { data, error } = await supabase.from('blog_posts').insert([{
            title: body.title, slug: body.slug, excerpt: body.excerpt, body: body.body,
            category: body.category, cover_image: body.coverImage || body.cover_image,
            author: body.author, read_time: parseInt(body.readTime || "5"),
            tags: body.tags, featured: !!body.featured, published_at: new Date().toISOString()
          }]).select().single();
          if (error) throw error;
          return send(mapPost(data));
        }

        if (id && method === "GET") {
          const { data, error } = await supabase.from('blog_posts').select('*').eq('id', id).single();
          if (error) throw error;
          return send(mapPost(data));
        }

        if (id && method === "PUT") {
          const body = req.body;
          const { data, error } = await supabase.from('blog_posts').update({
            title: body.title, slug: body.slug, excerpt: body.excerpt, body: body.body,
            category: body.category, cover_image: body.coverImage || body.cover_image,
            author: body.author, read_time: parseInt(body.readTime || "5"),
            tags: body.tags, featured: !!body.featured
          }).eq('id', id).select().single();
          if (error) throw error;
          return send(mapPost(data));
        }

        if (id && method === "DELETE") {
          const { error } = await supabase.from('blog_posts').delete().eq('id', id);
          if (error) throw error;
          return send({ success: true });
        }
      }

      if (isServices) {
        const lastSegment = segments[segments.length - 1];
        const id = lastSegment !== "services" ? lastSegment : null;

        if (!id && method === "GET") {
          const { data, error } = await supabase.from('services').select('*').order('title');
          if (error) throw error;
          return send(data);
        }

        if (method === "POST") {
          const body = req.body;
          const { data, error } = await supabase.from('services').insert([body]).select().single();
          if (error) throw error;
          return send(data);
        }

        if (id && method === "DELETE") {
          const { error } = await supabase.from('services').delete().eq('id', id);
          if (error) throw error;
          return send({ success: true });
        }
      }
    }

    return send({ error: `Path ${path} not found` }, 404);
  } catch (error: any) {
    console.error("API Error:", error);
    return send({ error: error.message }, 500);
  }
}

if (import.meta.main || process.env.BUN_ENV === 'development') {
  const port = process.env.PORT || 3001;
  Bun.serve({ port, fetch: handler });
  console.log(`Bun (Supabase Resilient) API running at http://localhost:${port}`);
}
