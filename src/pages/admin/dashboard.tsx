import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { blogApi, servicesApi, adminUsersApi } from "../../services/api";
import Button from "../../components/ui/button";
import Field from "../../components/ui/field";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ blogCount: 0, serviceCount: 0 });
  const [admins, setAdmins] = useState<any[]>([]);
  const [fetchingAdmins, setFetchingAdmins] = useState(true);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [blogs, services] = await Promise.all([
        blogApi.getAll(),
        servicesApi.getAll()
      ]);
      setStats({ 
        blogCount: blogs.data?.length || blogs.length || 0, 
        serviceCount: services.length || 0 
      });
    } catch (err) {
      console.error("Stats fetch failed", err);
    }

    try {
      setFetchingAdmins(true);
      const users = await adminUsersApi.getAll();
      setAdmins(users || []);
    } catch (err) {
      console.error("Admin fetch failed", err);
    } finally {
      setFetchingAdmins(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("vn_admin_token");
    if (!token) navigate("/admin/login");
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("vn_admin_token");
    navigate("/admin/login");
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdmin.email || !newAdmin.password) return;
    
    setLoading(true);
    try {
      await adminUsersApi.create(newAdmin);
      toast.success("New administrator added");
      setNewAdmin({ email: "", password: "" });
      setShowAddAdmin(false);
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#0f1f45]">
      {/* Header */}
      <nav className="bg-white border-b border-[rgba(15,31,69,0.06)] px-8 py-4 flex justify-between items-center">
        <div className="font-bold text-xl tracking-tighter">
          VeeNode<span className="text-[#F0A500]">.</span>Admin
        </div>
        <button 
          onClick={handleLogout}
          className="text-xs font-bold uppercase tracking-widest text-[rgba(15,31,69,0.4)] hover:text-[#0f1f45] transition-colors"
        >
          Logout
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-16">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Dashboard</h1>
          <p className="text-[rgba(15,31,69,0.45)] text-sm">Welcome back, administer your content below.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Blog Stat */}
          <Link to="/admin/blog" className="bg-white p-8 border border-[rgba(15,31,69,0.08)] hover:border-[#F0A500] transition-colors group">
            <p className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-[#F0A500] mb-3">Insights</p>
            <h2 className="text-2xl font-bold mb-1">Blog Posts</h2>
            <p className="text-3xl font-light text-[rgba(15,31,69,0.3)] group-hover:text-[#0f1f45] transition-colors">{stats.blogCount}</p>
          </Link>

          {/* Services Stat */}
          <Link to="/admin/services" className="bg-white p-8 border border-[rgba(15,31,69,0.08)] hover:border-[#F0A500] transition-colors group">
            <p className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-[#F0A500] mb-3">Portfolio</p>
            <h2 className="text-2xl font-bold mb-1">Services</h2>
            <p className="text-3xl font-light text-[rgba(15,31,69,0.3)] group-hover:text-[#0f1f45] transition-colors">{stats.serviceCount}</p>
          </Link>

          {/* Admin Management */}
          <div className="bg-white p-8 border border-[rgba(15,31,69,0.08)] flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-[#F0A500] mb-3">Security</p>
                <h2 className="text-2xl font-bold">Administrators</h2>
              </div>
              <button 
                onClick={() => setShowAddAdmin(!showAddAdmin)}
                className="text-[10px] font-bold uppercase text-blue-600 hover:text-blue-800"
              >
                {showAddAdmin ? "View List" : "Add New"}
              </button>
            </div>
            
            <div className="flex-1 overflow-auto max-h-[160px] pr-2 custom-scrollbar">
              {showAddAdmin ? (
                <form onSubmit={handleAddAdmin} className="flex flex-col gap-6">
                  <Field 
                    label="Admin Email" 
                    id="admin_email" 
                    type="email"
                    value={newAdmin.email}
                    onChange={e => setNewAdmin({...newAdmin, email: e.target.value})}
                    required
                  />
                  <Field 
                    label="Set Password" 
                    id="admin_pass" 
                    type="password"
                    value={newAdmin.password}
                    onChange={e => setNewAdmin({...newAdmin, password: e.target.value})}
                    required
                  />
                  <Button variant="primary" size="sm" className="w-full" disabled={loading}>
                    {loading ? "Adding..." : "Finalize Admin Account"}
                  </Button>
                </form>
              ) : (
                <div className="flex flex-col gap-2">
                  {fetchingAdmins ? (
                    <p className="text-xs text-[rgba(15,31,69,0.3)] italic border-t border-[rgba(15,31,69,0.03)] pt-4">Retrieving system admins...</p>
                  ) : admins.length === 0 ? (
                    <p className="text-xs text-[rgba(15,31,69,0.3)] italic border-t border-[rgba(15,31,69,0.03)] pt-4">No other admins found.</p>
                  ) : (
                    admins.map(admin => (
                      <div key={admin.id} className="flex justify-between items-center text-xs border-b border-[rgba(15,31,69,0.03)] py-2 last:border-0 hover:bg-[#f9fafb] px-1 rounded transition-colors">
                        <span className="font-medium text-[rgba(15,31,69,0.7)] truncate max-w-[150px]">{admin.email}</span>
                        <span className="text-[9px] text-[rgba(15,31,69,0.3)] font-bold uppercase tracking-wider">Active</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
