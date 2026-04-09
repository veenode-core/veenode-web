import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { blogApi, apiRequest } from "../../services/api";
import Button from "../../components/ui/button";

export default function BlogManager() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await blogApi.getAll();
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await apiRequest(`/admin/blog/${id}`, { method: 'DELETE' });
      fetchPosts();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#0f1f45]">Manage Blog</h1>
            <p className="text-sm text-[rgba(15,31,69,0.45)]">Create and edit articles</p>
          </div>
          <Link to="/admin/blog/new">
            <Button variant="cta" size="sm">
              New Post
            </Button>
          </Link>
        </header>


        <div className="bg-white border border-[rgba(15,31,69,0.06)]">
          {posts.length === 0 ? (
            <div className="p-20 text-center text-[rgba(15,31,69,0.3)] italic">No posts found. Start by creating one.</div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[rgba(15,31,69,0.06)]">
                  <th className="px-6 py-4 text-[0.65rem] font-bold tracking-widest uppercase text-[rgba(15,31,69,0.4)]">Title</th>
                  <th className="px-6 py-4 text-[0.65rem] font-bold tracking-widest uppercase text-[rgba(15,31,69,0.4)]">Date</th>
                  <th className="px-6 py-4 text-[0.65rem] font-bold tracking-widest uppercase text-[rgba(15,31,69,0.4)]">Category</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post.id} className="border-b border-[rgba(15,31,69,0.03)] last:border-0">
                    <td className="px-6 py-4 font-medium text-sm">{post.title}</td>
                    <td className="px-6 py-4 text-xs text-[rgba(15,31,69,0.5)]">{new Date(post.publishedAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-xs font-bold text-[#F0A500] uppercase tracking-tighter">
                      {post.category} {post.featured && "★"}
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button 
                        onClick={() => handleDelete(post.id)}
                        className="text-[10px] font-bold uppercase text-[rgba(15,31,69,0.3)] hover:text-red-500 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
