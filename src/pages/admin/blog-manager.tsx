import { useEffect, useState } from "react";
import { blogApi, apiRequest } from "../../services/api";
import Button from "../../components/ui/button";
import Field from "../../components/ui/field";

declare global {
  interface Window {
    cloudinary: any;
  }
}

export default function BlogManager() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    slug: "",
    excerpt: "",
    body: "",
    category: "Engineering",
    coverImage: "",
    author: "Victor Akinode",
    tags: "",
    readTime: "5",
    featured: false
  });

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

  const openWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "desbso8v8",
        uploadPreset: "ml_default", // You might need to create this in Cloudinary settings
        sources: ["local", "url", "camera"],
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          setNewPost({ ...newPost, coverImage: result.info.secure_url });
        }
      }
    );
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

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await blogApi.create({
        ...newPost,
        tags: newPost.tags.split(",").map(t => t.trim()),
        readTime: parseInt(newPost.readTime)
      });
      setIsCreating(false);
      fetchPosts();
      setNewPost({ title: "", slug: "", excerpt: "", body: "", category: "Engineering", coverImage: "", author: "Victor Akinode", tags: "", readTime: "5", featured: false });
    } catch (err) {
      alert("Failed to create post");
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
          <Button variant="cta" size="sm" onClick={() => setIsCreating(!isCreating)}>
            {isCreating ? "Cancel" : "New Post"}
          </Button>
        </header>

        {isCreating && (
          <form onSubmit={handleCreate} className="bg-white p-10 border border-[rgba(15,31,69,0.08)] mb-12 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Title" id="title" value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} required />
              <Field label="Slug" id="slug" value={newPost.slug} onChange={e => setNewPost({...newPost, slug: e.target.value.toLowerCase().replace(/ /g, '-')})} required />
            </div>
            <Field label="Excerpt" id="excerpt" value={newPost.excerpt} onChange={e => setNewPost({...newPost, excerpt: e.target.value})} required />
            
            <div className="flex flex-col gap-2">
              <label className="text-[0.65rem] font-bold tracking-widest uppercase text-[rgba(15,31,69,0.4)]">Body (Markdown/HTML Support)</label>
              <textarea 
                className="w-full text-sm bg-transparent outline-none border-b border-[rgba(15,31,69,0.15)] pb-2 min-h-[200px]"
                value={newPost.body}
                onChange={e => setNewPost({...newPost, body: e.target.value})}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <Field label="Category" id="cat" value={newPost.category} onChange={e => setNewPost({...newPost, category: e.target.value})} />
               <Field label="Tags" id="tags" value={newPost.tags} onChange={e => setNewPost({...newPost, tags: e.target.value})} />
               <Field label="Read Time (min)" id="rt" type="number" value={newPost.readTime} onChange={e => setNewPost({...newPost, readTime: e.target.value})} />
               <div className="flex flex-col gap-2">
                  <label className="text-[0.65rem] font-bold tracking-widest uppercase text-[rgba(15,31,69,0.4)]">Cover Image</label>
                  {newPost.coverImage ? (
                    <div className="flex items-center gap-4">
                      <img src={newPost.coverImage} className="w-12 h-12 object-cover" alt="Preview" />
                      <button type="button" onClick={openWidget} className="text-[10px] font-bold uppercase text-[#F0A500]">Change</button>
                    </div>
                  ) : (
                    <Button type="button" variant="secondary" size="sm" className="py-2" onClick={openWidget}>Upload Image</Button>
                  )}
               </div>
            </div>

            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="feat" 
                checked={newPost.featured} 
                onChange={e => setNewPost({...newPost, featured: e.target.checked})} 
              />
              <label htmlFor="feat" className="text-xs font-bold text-[#0f1f45]">Feature this post on home/listing</label>
            </div>

            <Button type="submit" variant="cta" size="lg" className="mt-4">Publish Post</Button>
          </form>
        )}

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
