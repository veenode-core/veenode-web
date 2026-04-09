import { useEffect, useState } from "react";
import { servicesApi, apiRequest } from "../../services/api";
import Button from "../../components/ui/button";
import Field from "../../components/ui/field";

export default function ServicesManager() {
  const [services, setServices] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newService, setNewService] = useState({
    name: "",
    headline: "",
    description: "",
    ctaText: "Learn More",
    ctaHref: "/services/",
    image: "",
    icon: "Brain", 
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await servicesApi.getAll();
      setServices(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await apiRequest(`/admin/services/${id}`, { method: 'DELETE' });
      fetchServices();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const openWidget = () => {
    (window as any).cloudinary.openUploadWidget(
      {
        cloudName: "desbso8v8",
        uploadPreset: "ml_default",
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          setNewService({ ...newService, image: result.info.secure_url });
        }
      }
    );
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await servicesApi.create(newService);
      setIsCreating(false);
      fetchServices();
      setNewService({ name: "", headline: "", description: "", ctaText: "Learn More", ctaHref: "/services/", image: "", icon: "Brain" });
    } catch (err) {
      alert("Failed to create service");
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#0f1f45]">Manage Services</h1>
            <p className="text-sm text-[rgba(15,31,69,0.45)]">Define your service offerings</p>
          </div>
          <Button variant="cta" size="sm" onClick={() => setIsCreating(!isCreating)}>
            {isCreating ? "Cancel" : "New Service"}
          </Button>
        </header>

        {isCreating && (
          <form onSubmit={handleCreate} className="bg-white p-10 border border-[rgba(15,31,69,0.08)] mb-12 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Service Name" id="name" value={newService.name} onChange={e => setNewService({...newService, name: e.target.value})} required />
              <Field label="Headline" id="headline" value={newService.headline} onChange={e => setNewService({...newService, headline: e.target.value})} required />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-[0.65rem] font-bold tracking-widest uppercase text-[rgba(15,31,69,0.4)]">Description</label>
              <textarea 
                className="w-full text-sm bg-transparent outline-none border-b border-[rgba(15,31,69,0.15)] pb-2 min-h-[100px]"
                value={newService.description}
                onChange={e => setNewService({...newService, description: e.target.value})}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Field label="CTA Text" id="ctaT" value={newService.ctaText} onChange={e => setNewService({...newService, ctaText: e.target.value})} />
              <Field label="CTA Link" id="ctaH" value={newService.ctaHref} onChange={e => setNewService({...newService, ctaHref: e.target.value})} />
              <div className="flex flex-col gap-2">
                  <label className="text-[0.65rem] font-bold tracking-widest uppercase text-[rgba(15,31,69,0.4)]">Image</label>
                  {newService.image ? (
                    <div className="flex items-center gap-4">
                      <img src={newService.image} className="w-12 h-12 object-cover" alt="Preview" />
                      <button type="button" onClick={openWidget} className="text-[10px] font-bold uppercase text-[#F0A500]">Change</button>
                    </div>
                  ) : (
                    <Button type="button" variant="secondary" size="sm" className="py-2" onClick={openWidget}>Upload Image</Button>
                  )}
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[0.65rem] font-bold tracking-widest uppercase text-[rgba(15,31,69,0.4)]">Icon</label>
                <select 
                  className="bg-transparent border-b border-[rgba(15,31,69,0.15)] text-sm py-2"
                  value={newService.icon}
                  onChange={e => setNewService({...newService, icon: e.target.value})}
                >
                  <option value="Brain">Brain (AI)</option>
                  <option value="ShieldCheck">Shield (Security)</option>
                  <option value="Code">Code (Software)</option>
                  <option value="ChartLineUp">Chart (ML)</option>
                  <option value="Gavel">Gavel (Governance)</option>
                </select>
              </div>
            </div>

            <Button type="submit" variant="cta" size="lg" className="mt-4">Save Service</Button>
          </form>
        )}

        <div className="bg-white border border-[rgba(15,31,69,0.06)]">
          {services.length === 0 ? (
            <div className="p-20 text-center text-[rgba(15,31,69,0.3)] italic">No services listed yet.</div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[rgba(15,31,69,0.06)]">
                  <th className="px-6 py-4 text-[0.65rem] font-bold tracking-widest uppercase text-[rgba(15,31,69,0.4)]">Name</th>
                  <th className="px-6 py-4 text-[0.65rem] font-bold tracking-widest uppercase text-[rgba(15,31,69,0.4)]">Description</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {services.map((svc: any) => (
                  <tr key={svc.id} className="border-b border-[rgba(15,31,69,0.03)] last:border-0">
                    <td className="px-6 py-4 font-medium text-sm">{svc.name}</td>
                    <td className="px-6 py-4 text-xs text-[rgba(15,31,69,0.5)] truncate max-w-xs">{svc.description}</td>
                    <td className="px-6 py-4 text-right">
                       <button 
                        onClick={() => handleDelete(svc.id)}
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
