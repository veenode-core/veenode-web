import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables!");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper for search/filtering
export function applyFilters(query: any, params: URLSearchParams) {
  // Pagination
  const page = parseInt(params.get('page') || '1');
  const limit = parseInt(params.get('limit') || '10');
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let filteredQuery = query.range(from, to);

  // Search (e.g. ?q=title)
  const q = params.get('q');
  if (q) {
    filteredQuery = filteredQuery.ilike('title', `%${q}%`);
  }

  // Category filter
  const category = params.get('category');
  if (category && category !== 'All') {
    filteredQuery = filteredQuery.eq('category', category);
  }

  // Sorting
  const sort = params.get('sort') || 'published_at';
  const order = params.get('order') || 'desc';
  filteredQuery = filteredQuery.order(sort, { ascending: order === 'asc' });

  return filteredQuery;
}
