import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { blogApi } from "../../services/api";
import { uploadImage } from "../../services/cloudinary";
import Button from "../../components/ui/button";
import Field from "../../components/ui/field";

export default function BlogCreate() {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [newPost, setNewPost] = useState({
    title: "",
    excerpt: "",
    body: "",
    category: "Engineering",
    coverImage: "",
    author: "Victor Akinode",
    tags: "",
    featured: false
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const calculateReadTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImage(file);
      setNewPost({ ...newPost, coverImage: url });
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.coverImage) {
      alert("Please upload a cover image first.");
      return;
    }
    
    try {
      const slug = generateSlug(newPost.title);
      const readTime = calculateReadTime(newPost.body);

      await blogApi.create({
        ...newPost,
        slug,
        readTime,
        tags: newPost.tags.split(",").map(t => t.trim()),
      });
      navigate("/admin/blog");
    } catch (err) {
      alert("Failed to create post");
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#0f1f45]">Create Post</h1>
            <p className="text-sm text-[rgba(15,31,69,0.45)]">Draft your next insight</p>
          </div>
          <Link to="/admin/blog">
            <Button variant="secondary" size="sm">Cancel</Button>
          </Link>
        </header>

        <form onSubmit={handleSubmit} className="bg-white p-10 border border-[rgba(15,31,69,0.08)] mb-12 flex flex-col gap-6">
          <Field 
            label="Post Title" 
            id="title" 
            value={newPost.title} 
            onChange={e => setNewPost({...newPost, title: e.target.value})} 
            required 
          />
          
          <div className="flex flex-col gap-2">
            <label className="text-[0.65rem] font-bold tracking-widest uppercase text-[rgba(15,31,69,0.4)]">Excerpt (Summary)</label>
            <textarea 
              className="w-full text-sm bg-transparent outline-none border-b border-[rgba(15,31,69,0.15)] pb-2"
              value={newPost.excerpt}
              onChange={e => setNewPost({...newPost, excerpt: e.target.value})}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[0.65rem] font-bold tracking-widest uppercase text-[rgba(15,31,69,0.4)]">Body Content (Use line breaks for paragraphs)</label>
            <textarea 
              className="w-full text-sm bg-transparent outline-none border-b border-[rgba(15,31,69,0.15)] pb-2 min-h-[300px]"
              value={newPost.body}
              onChange={e => setNewPost({...newPost, body: e.target.value})}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
             <Field label="Category" id="cat" value={newPost.category} onChange={e => setNewPost({...newPost, category: e.target.value})} />
             <Field label="Tags (commas)" id="tags" value={newPost.tags} onChange={e => setNewPost({...newPost, tags: e.target.value})} />
             <div className="flex flex-col gap-2">
                <label className="text-[0.65rem] font-bold tracking-widest uppercase text-[rgba(15,31,69,0.4)]">Cover Image</label>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept="image/*"
                />
                
                {newPost.coverImage ? (
                  <div className="flex items-center gap-4">
                    <div className="relative group">
                      <img src={newPost.coverImage} className="w-16 h-12 object-cover rounded shadow-sm" alt="Preview" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded">
                         <button type="button" onClick={() => fileInputRef.current?.click()} className="text-[10px] text-white font-bold uppercase">Change</button>
                      </div>
                    </div>
                    <span className="text-[10px] text-green-600 font-bold uppercase">Ready to Publish</span>
                  </div>
                ) : (
                  <Button 
                    type="button" 
                    variant="secondary" 
                    size="sm" 
                    className="py-2" 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? "Uploading..." : "Select Image"}
                  </Button>
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
      </div>
    </div>
  );
}
