import { useState, useEffect } from "react";
import TextSplitReveal from "../ui/text-split-reveal";
import { ArrowRight, ArrowUpRight, CircleNotch } from "@phosphor-icons/react";
import { blogApi } from "../../services/api";
import type { BlogPost } from "../../types/blog";

export default function InsightsSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const response = await blogApi.getAll({ limit: 3 });
        setPosts(response.data || []);
      } catch (err) {
        console.error("Failed to load insights", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  return (
    <section className="bg-primary py-20 md:py-32 overflow-hidden relative">
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-lg">
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: "rgba(240,165,0,0.8)" }}
            >
              Insights
            </p>
            <TextSplitReveal
              text="Thinking From|the Front Lines"
              mobileText="Thinking|From the|Front Lines"
              className="text-3xl md:text-5xl font-bold text-white"
              tag="h2"
            />
          </div>
          <div className="flex flex-col items-start md:items-end gap-4">
            <p
              className="text-sm leading-relaxed max-w-xs md:text-right"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
                Our team publishes technical perspectives on AI, cybersecurity, and
                software engineering. No filler — just insight from
                practitioners who do the work every day.
            </p>
            <a
              href="/blog"
              className="group inline-flex items-center gap-2.5 text-sm font-semibold text-white hover:opacity-70 transition-opacity"
            >
              Read Our Insights
              <span
                className="flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 group-hover:translate-x-0.5"
                style={{ border: "1px solid rgba(255,255,255,0.25)" }}
              >
                <ArrowRight size={13} weight="bold" />
              </span>
            </a>
          </div>
        </div>

        {/* Cards */}
        {loading ? (
             <div className="flex items-center justify-center py-20">
                <CircleNotch size={32} className="animate-spin text-white/20" />
             </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
            {posts.map((post) => (
              <a
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                {/* Image */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    height: "220px",
                    background: "rgba(255,255,255,0.05)",
                  }}
                >
                  <img 
                    src={post.coverImage} 
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100" 
                    alt={post.title}
                  />
                  
                  {/* Hover arrow */}
                  <div
                    className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0 translate-x-1 -translate-y-1 group-hover:translate-y-0"
                    style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(4px)" }}
                  >
                    <ArrowUpRight size={14} weight="bold" color="white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 p-6 flex-1">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[0.65rem] font-bold tracking-widest uppercase"
                      style={{ color: "rgba(240,165,0,0.85)" }}
                    >
                      {post.category}
                    </span>
                    <span
                      className="text-[0.65rem] font-medium"
                      style={{ color: "rgba(255,255,255,0.25)" }}
                    >
                      {post.readTime} min read
                    </span>
                  </div>

                  <h3
                    className="font-bold text-base leading-snug group-hover:opacity-70 transition-opacity"
                    style={{ color: "rgba(255,255,255,0.9)" }}
                  >
                    {post.title}
                  </h3>

                  <p
                    className="text-sm leading-relaxed line-clamp-2"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    {post.excerpt}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
