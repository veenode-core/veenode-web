import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { blogApi } from "../../services/api";
import Button from "../../components/ui/button";
import Modal from "../../components/ui/modal";
import { toast } from "sonner";

export default function BlogManager() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [postToDelete, setPostToDelete] = useState<any>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await blogApi.adminGetAll();
      setPosts(response.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch posts");
    }
  };

  const openDeleteModal = (post: any) => {
    setPostToDelete(post);
    setIsDeleting(true);
  };

  const confirmDelete = async () => {
    if (!postToDelete) return;

    const toastId = toast.loading("Deleting post...");
    try {
      await blogApi.delete(postToDelete.id);
      toast.success("Post deleted successfully", { id: toastId });
      fetchPosts();
    } catch (err: any) {
      toast.error("Delete failed: " + err.message, { id: toastId });
    } finally {
      setIsDeleting(false);
      setPostToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#0f1f45]">Manage Blog</h1>
            <p className="text-sm text-[rgba(15,31,69,0.45)]">Create, edit, or remove articles</p>
          </div>
          <Link to="/admin/blog/new">
            <Button variant="cta" size="sm">
              New Post
            </Button>
          </Link>
        </header>

        <div className="bg-white border border-[rgba(15,31,69,0.06)] overflow-hidden">
          {posts.length === 0 ? (
            <div className="p-20 text-center text-[rgba(15,31,69,0.3)] italic">No posts found. Start by creating one.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[rgba(15,31,69,0.06)] bg-[rgba(15,31,69,0.01)]">
                  <th className="px-6 py-4 text-[0.65rem] font-bold tracking-widest uppercase text-[rgba(15,31,69,0.4)]">Title</th>
                  <th className="px-6 py-4 text-[0.65rem] font-bold tracking-widest uppercase text-[rgba(15,31,69,0.4)]">Date</th>
                  <th className="px-6 py-4 text-[0.65rem] font-bold tracking-widest uppercase text-[rgba(15,31,69,0.4)]">Category</th>
                  <th className="px-6 py-4 text-right text-[0.65rem] font-bold tracking-widest uppercase text-[rgba(15,31,69,0.4)]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => {
                  const date = post.published_at || post.publishedAt;
                  return (
                    <tr key={post.id} className="border-b border-[rgba(15,31,69,0.03)] last:border-0 hover:bg-[rgba(15,31,69,0.01)] transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-sm text-[#0f1f45]">{post.title}</div>
                        <div className="text-[10px] text-[rgba(15,31,69,0.4)] mt-0.5 truncate max-w-xs">{post.slug}</div>
                      </td>
                      <td className="px-6 py-4 text-xs text-[rgba(15,31,69,0.5)]">
                        {date ? new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold text-[#F0A500] uppercase tracking-tighter bg-[#F0A500]/10 px-2 py-0.5 rounded">
                          {post.category}
                        </span>
                        {post.featured && <span className="ml-2 text-blue-500 text-xs">★</span>}
                      </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-4">
                        <Link 
                          to={`/admin/blog/edit/${post.id}`}
                          className="text-[10px] font-bold uppercase text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          Edit
                        </Link>
                        <button 
                          onClick={() => openDeleteModal(post)}
                          className="text-[10px] font-bold uppercase text-[rgba(15,31,69,0.3)] hover:text-red-500 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        title="Confirm Deletion"
        description="This action cannot be undone."
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setIsDeleting(false)}>Cancel</Button>
            <Button variant="danger" size="sm" onClick={confirmDelete}>Delete Post</Button>
          </>
        }
      >
        <p>Are you sure you want to delete <span className="font-bold text-[#0f1f45]">"{postToDelete?.title}"</span>? This will permanently remove it from the database.</p>
      </Modal>
    </div>
  );
}
