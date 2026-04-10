import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../services/api";
import Button from "../../components/ui/button";
import Field from "../../components/ui/field";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);
  const formBoxRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1 } });
    gsap.set(formBoxRef.current, { opacity: 0, y: 20 });
    tl.to(formBoxRef.current, { opacity: 1, y: 0, delay: 0.1 });
  }, { scope: containerRef });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await authApi.login({ email, password });
      localStorage.setItem("vn_admin_token", data.token);
      navigate("/admin/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-primary flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Branding Elements */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <span 
          className="absolute top-0 right-0 font-black text-white/[0.03]"
          style={{ fontSize: '30vw', transform: 'translate(30%, -20%)' }}
        >
          VN
        </span>
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div ref={formBoxRef} className="relative z-10 w-full max-w-[420px]">

        <div className="bg-white p-10 md:p-14 border border-white/10 rounded-xl">
          <header className="mb-10 text-center">
             <p className="text-[0.6rem] font-bold tracking-[0.3em] uppercase text-[#F0A500] mb-3">Veenode Systems</p>
             <h1 className="text-2xl font-bold text-primary tracking-tight">Admin Access</h1>
          </header>

          <form onSubmit={handleLogin} className="flex flex-col gap-8">
            {error && (
              <div className="text-[10px] text-red-600 bg-red-50 border border-red-100 p-4 rounded-lg font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                {error}
              </div>
            )}

            <div className="flex flex-col gap-6">
              <Field 
                label="Corporate Email" 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@veenode.com"
                required 
              />
              
              <div className="flex flex-col gap-1">
                <Field 
                  label="System Password" 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required 
                />
              </div>
            </div>

            <Button 
                type="submit" 
                variant="primary" 
                size="md" 
                className="w-full group" 
                disabled={loading}
            >
              <div className="flex items-center gap-2">
                {loading ? "Authenticating..." : (
                  <>
                    <span>Enter Dashboard</span>
                  </>
                )}
              </div>
            </Button>

            <p className="text-[10px] text-center text-primary/25 mt-4 leading-relaxed font-bold uppercase tracking-tighter">
              Authorized Access Only
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
