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

/**
 * The core API logic using Web Standard Request/Response.
 */
async function unifiedHandler(req: any): Promise<Response> {
  const url = new URL(req.url, `http://${req.headers?.host || 'localhost'}`);
  const path = url.pathname;
  const method = req.method;
  const params = url.searchParams;

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Content-Type": "application/json",
  };

  if (method === "OPTIONS") return new Response(null, { status: 204, headers });

  try {
    const segments = path.split("/").filter(Boolean);
    const isAdmin = segments.includes("admin");
    const isBlog = segments.includes("blog");
    const isServices = segments.includes("services");
    const isAuth = segments.includes("auth");

    // Helper to extract body safely
    const getBody = async (r: any) => {
      try {
        if (typeof r.json === 'function') {
          return await r.json();
        }
        return r.body || {};
      } catch (err) {
        return r.body || {};
      }
    };

    // --- DIAGNOSTIC ROOT ---
    if (segments.length === 0 || (segments.length === 1 && segments[0] === "api")) {
      const dbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "Not Set";
      return new Response(JSON.stringify({ 
        message: "Veenode API is active.",
        db: dbUrl
      }), { status: 200, headers });
    }

    // --- AUTH ROUTES ---
    if (isAuth && method === "POST") {
      const body = await getBody(req);
      const { email, password } = body;
      const { data: admin, error: dbError } = await supabase.from('admins').select('*').eq('email', email).single();
      
      if (dbError && dbError.code !== 'PGRST116') throw dbError;

      if (!admin) {
          return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401, headers });
      }

      const isValid = bcrypt.compareSync(password, admin.password);

      if (isValid) {
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "24h" });
        return new Response(JSON.stringify({ token, user: { email } }), { status: 200, headers });
      }
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401, headers });
    }

    // --- PUBLIC READ ROUTES ---
    if (!isAdmin && !isAuth) {
      if (isBlog && method === "GET") {
        let query = supabase.from('blog_posts').select('*', { count: 'exact' });
        query = applyFilters(query, params);
        const { data, error, count } = await query;
        if (error) throw error;
        return new Response(JSON.stringify({ data: (data || []).map(mapPost), count }), { status: 200, headers });
      }

      if (isServices && method === "GET") {
        const { data, error } = await supabase.from('services').select('*').order('title');
        if (error) throw error;
        return new Response(JSON.stringify(data), { status: 200, headers });
      }
    }

    // --- ADMIN ROUTES (Requires Auth) ---
    if (isAdmin) {
      const authHeader = req.headers?.authorization || req.headers?.get?.("Authorization");
      if (!authHeader?.startsWith("Bearer ")) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers });
      }
      try {
        jwt.verify(authHeader.split(" ")[1], JWT_SECRET);
      } catch {
        return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401, headers });
      }

      // Admin Management
      if (segments.includes("users")) {
        if (method === "GET") {
          const { data, error } = await supabase.from('admins').select('id, email, created_at').order('created_at', { ascending: false });
          if (error) throw error;
          return new Response(JSON.stringify(data), { status: 200, headers });
        }
        if (method === "POST") {
          const body = await getBody(req);
          const hashedPassword = bcrypt.hashSync(body.password, 10);
          const { data, error } = await supabase.from('admins').insert([{
            email: body.email,
            password: hashedPassword
          }]).select('id, email, created_at').single();
          if (error) throw error;
          return new Response(JSON.stringify(data), { status: 200, headers });
        }
      }

      // Blog Management
      if (isBlog) {
        const lastSegment = segments[segments.length - 1];
        const id = lastSegment !== "blog" ? lastSegment : null;

        if (!id && method === "GET") {
          const { data, error, count } = await supabase.from('blog_posts').select('*', { count: 'exact' }).order('published_at', { ascending: false });
          if (error) throw error;
          return new Response(JSON.stringify({ data: (data || []).map(mapPost), count }), { status: 200, headers });
        }

        if (method === "POST") {
          const body = await getBody(req);
          const { data, error } = await supabase.from('blog_posts').insert([{
            title: body.title, slug: body.slug, excerpt: body.excerpt, body: body.body,
            category: body.category, cover_image: body.coverImage || body.cover_image,
            author: body.author, read_time: parseInt((body.readTime || body.read_time || "5").toString()),
            tags: body.tags, featured: body.featured === true || body.featured === 'true',
            published_at: new Date().toISOString()
          }]).select().single();
          if (error) throw error;
          return new Response(JSON.stringify(mapPost(data)), { status: 200, headers });
        }

        if (id && method === "GET") {
          const { data, error } = await supabase.from('blog_posts').select('*').eq('id', id).single();
          if (error) throw error;
          return new Response(JSON.stringify(mapPost(data)), { status: 200, headers });
        }

        if (id && method === "PUT") {
          const body = await getBody(req);
          const updateData: any = {};
          if (body.title !== undefined) updateData.title = body.title;
          if (body.slug !== undefined) updateData.slug = body.slug;
          if (body.excerpt !== undefined) updateData.excerpt = body.excerpt;
          if (body.body !== undefined) updateData.body = body.body;
          if (body.category !== undefined) updateData.category = body.category;
          if (body.author !== undefined) updateData.author = body.author;
          const coverImg = body.coverImage || body.cover_image;
          if (coverImg !== undefined) updateData.cover_image = coverImg;
          const rdTime = body.readTime || body.read_time;
          if (rdTime !== undefined) updateData.read_time = parseInt(rdTime.toString());
          if (body.tags !== undefined) updateData.tags = body.tags;
          if (body.featured !== undefined) updateData.featured = body.featured === true || body.featured === 'true';

          const { data, error } = await supabase.from('blog_posts').update(updateData).eq('id', id).select();
          if (error) throw error;
          return new Response(JSON.stringify(mapPost(data[0])), { status: 200, headers });
        }

        if (id && method === "DELETE") {
          const { error } = await supabase.from('blog_posts').delete().eq('id', id);
          if (error) throw error;
          return new Response(JSON.stringify({ success: true }), { status: 200, headers });
        }
      }

      // Services Management
      if (isServices) {
        const lastSegment = segments[segments.length - 1];
        const id = lastSegment !== "services" ? lastSegment : null;

        if (!id && method === "GET") {
          const { data, error } = await supabase.from('services').select('*').order('title');
          if (error) throw error;
          return new Response(JSON.stringify(data), { status: 200, headers });
        }

        if (method === "POST") {
          const body = await getBody(req);
          const { data, error } = await supabase.from('services').insert([{
            title: body.title || body.name, headline: body.headline, description: body.description,
            cta_text: body.ctaText || body.cta_text, cta_href: body.ctaHref || body.cta_href,
            image: body.image, icon: body.icon
          }]).select().single();
          if (error) throw error;
          return new Response(JSON.stringify(data), { status: 200, headers });
        }

        if (id && method === "DELETE") {
          const { error } = await supabase.from('services').delete().eq('id', id);
          if (error) throw error;
          return new Response(JSON.stringify({ success: true }), { status: 200, headers });
        }
      }
    }

    return new Response(JSON.stringify({ error: `Path ${path} not found` }), { status: 404, headers });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers });
  }
}

export default async function handler(req: any, res: any) {
  if (res && typeof res.setHeader === 'function') {
    const response = await unifiedHandler(req);
    res.statusCode = response.status;
    response.headers.forEach((v, k) => res.setHeader(k, v));
    res.end(await response.text());
  } else {
    return unifiedHandler(req);
  }
}

if (typeof Bun !== 'undefined' && (import.meta.main || process.env.BUN_ENV === 'development')) {
  const port = process.env.PORT || 3001;
  Bun.serve({ port, fetch: unifiedHandler });
  console.log(`Bun (Universal) API running at http://localhost:${port}`);
}
