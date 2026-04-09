import { useState, useRef, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { blogApi, servicesApi } from "../../services/api";
import { uploadImage } from "../../services/cloudinary";
import Button from "../../components/ui/button";
import Field from "../../components/ui/field";
import { toast } from "sonner";

export default function BlogCreate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const initialFormState = {
    title: "",
    excerpt: "",
    body: "",
    category: "Engineering",
    coverImage: "",
    author: "Victor Akinode",
    tags: "",
    featured: false
  };

  const [newPost, setNewPost] = useState(initialFormState);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetchServices();
    if (isEdit) {
      fetchPost();
    }
  }, [id]);

  const fetchServices = async () => {
    try {
      const data = await servicesApi.getAll();
      setServices(data || []);
    } catch (err) {
      console.error("Failed to load services for categories", err);
    }
  };

  const fetchPost = async () => {
    try {
      const post = await blogApi.getById(id!);
      setNewPost({
        ...post,
        tags: post.tags?.join(", ") || ""
      });
    } catch (err: any) {
      toast.error("Failed to load post details: " + err.message);
      navigate("/admin/blog");
    } finally {
      setLoading(false);
    }
  };

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
    const toastId = toast.loading("Uploading image...");
    try {
      const url = await uploadImage(file);
      setNewPost({ ...newPost, coverImage: url });
      toast.success("Image uploaded successfully!", { id: toastId });
    } catch (err: any) {
      toast.error("Upload failed: " + err.message, { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.body) {
      toast.error("Title and body are required");
      return;
    }
    
    const toastId = toast.loading(isEdit ? "Updating post..." : "Publishing post...");
    
    try {
      const slug = generateSlug(newPost.title);
      const readTime = calculateReadTime(newPost.body);

      const payload = {
        ...newPost,
        slug,
        readTime: readTime.toString(),
        tags: newPost.tags.split(",").map(t => t.trim()).filter(Boolean),
      };

      let result;
      if (isEdit) {
        result = await blogApi.update(id!, payload);
        toast.success(`Post updated!`, { id: toastId });
      } else {
        result = await blogApi.create(payload);
        toast.success(`Post published! (ID: ${result.id?.substring(0,8)}...)`, { id: toastId });
      }

      if (result) {
        navigate("/admin/blog");
      }
    } catch (err: any) {
      toast.error("Action failed: " + err.message, { id: toastId });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc]">
        <div className="text-[rgba(15,31,69,0.3)] font-medium animate-pulse uppercase tracking-widest text-xs">Loading Post Details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#0f1f45]">
              {isEdit ? "Edit Post" : "Create Post"}
            </h1>
            <p className="text-sm text-[rgba(15,31,69,0.45)]">
              {isEdit ? "Update your existing article" : "Draft your next insight"}
            </p>
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
             <div className="flex flex-col gap-2">
                <label className="text-[0.65rem] font-bold tracking-widest uppercase text-[rgba(15,31,69,0.4)]">Category</label>
                <select 
                  className="w-full text-sm bg-transparent outline-none border-b border-[rgba(15,31,69,0.15)] pb-2 appearance-none cursor-pointer"
                  value={newPost.category}
                  onChange={e => setNewPost({...newPost, category: e.target.value})}
                  required
                >
                  <optgroup label="Core Categories">
                    <option value="Engineering">Engineering</option>
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="Enterprise Mobility">Enterprise Mobility</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                  </optgroup>
                  
                  {services.length > 0 && (
                    <optgroup label="Our Services">
                      {services.map(s => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                    </optgroup>
                  )}

                  <optgroup label="Others">
                    <option value="Product Strategy">Product Strategy</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Digital Transformation">Digital Transformation</option>
                    <option value="Blockchain">Blockchain</option>
                    <option value="Others">Others</option>
                  </optgroup>
                </select>
             </div>
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
                    <span className="text-[10px] text-green-600 font-bold uppercase">Ready</span>
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

          <Button type="submit" variant="cta" size="lg" className="mt-4">
            {isEdit ? "Update Changes" : "Publish Post"}
          </Button>
        </form>
      </div>
    </div>
  );
}
