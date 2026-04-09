import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { blogApi, servicesApi } from "../../services/api";
import Button from "../../components/ui/button";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ blogCount: 0, serviceCount: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("vn_admin_token");
    if (!token) navigate("/admin/login");

    const fetchStats = async () => {
      try {
        const [blogs, services] = await Promise.all([
          blogApi.getAll(),
          servicesApi.getAll()
        ]);
        setStats({ blogCount: blogs.length, serviceCount: services.length });
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };
    fetchStats();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("vn_admin_token");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#0f1f45]">
      {/* Header */}
      <nav className="bg-white border-b border-[rgba(15,31,69,0.06)] px-8 py-4 flex justify-between items-center">
        <div className="font-bold text-xl tracking-tighter">
          VN<span className="text-[#F0A500]">.</span>ADMIN
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

          {/* Quick Action */}
          <div className="bg-primary p-8 flex flex-col justify-between items-start">
             <div>
               <p className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-[rgba(255,255,255,0.4)] mb-3">Direct Action</p>
               <h2 className="text-2xl font-bold text-white mb-4">Post New Content</h2>
             </div>
             <Button variant="cta" size="sm" onClick={() => navigate('/admin/blog')}>
               Create Post
             </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
