import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Clock, ArrowUpRight } from "@phosphor-icons/react";
import { blogPosts } from "../data/blog";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  // Split body on \n into paragraphs
  const paragraphs = post.body
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);

  // Related posts — same category, excluding current
  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Cover image — full bleed */}
      <div
        className="w-full relative overflow-hidden"
        style={{ height: "clamp(280px, 45vw, 560px)" }}
      >
        <img
          src={post.coverImage}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "grayscale(20%)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,31,69,0.35) 0%, rgba(15,31,69,0.6) 100%)",
          }}
        />

        {/* Back link */}
        <div className="absolute top-8 left-0 right-0 max-w-7xl mx-auto px-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-opacity hover:opacity-60"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            <ArrowLeft size={13} weight="bold" />
            All Blog Posts
          </Link>
        </div>

        {/* Hero text over image */}
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-10 md:pb-16">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-[0.6rem] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
              style={{ background: "rgba(240,165,0,0.9)", color: "#0f1f45" }}
            >
              {post.category}
            </span>
            <span
              className="flex items-center gap-1.5 text-[0.65rem] font-medium"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              <Clock size={11} />
              {post.readTime} min read
            </span>
          </div>
          <h1
            className="font-bold text-white leading-[1.05] tracking-tight max-w-3xl"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3.25rem)" }}
          >
            {post.title}
          </h1>
        </div>
      </div>

      {/* Article */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 py-16 md:py-24">
          {/* Sidebar */}
          <aside className="lg:col-span-3 flex flex-col gap-10 lg:sticky lg:top-28 lg:self-start order-2 lg:order-1">
            {/* Author */}
            <div className="flex flex-col gap-3">
              <p
                className="text-[0.6rem] font-bold tracking-widest uppercase"
                style={{ color: "rgba(15,31,69,0.3)" }}
              >
                Written by
              </p>
              <p className="text-sm font-bold text-[#0f1f45]">{post.author}</p>
              <p className="text-xs" style={{ color: "rgba(15,31,69,0.4)" }}>
                {formatDate(post.publishedAt)}
              </p>
            </div>

            {/* Gold rule */}
            <div className="w-8 h-px" style={{ background: "#F0A500" }} />

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-col gap-3">
                <p
                  className="text-[0.6rem] font-bold tracking-widest uppercase"
                  style={{ color: "rgba(15,31,69,0.3)" }}
                >
                  Tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[0.6rem] font-semibold px-3 py-1.5 rounded-full"
                      style={{
                        border: "1px solid rgba(15,31,69,0.12)",
                        color: "rgba(15,31,69,0.5)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Back link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-opacity hover:opacity-60 mt-2"
              style={{ color: "rgba(15,31,69,0.4)" }}
            >
              <ArrowLeft size={11} weight="bold" />
              All Blog Posts
            </Link>
          </aside>

          {/* Body */}
          <article className="lg:col-span-9 order-1 lg:order-2">
            {/* Excerpt — lead paragraph */}
            <p
              className="text-base md:text-lg leading-relaxed mb-10 font-medium"
              style={{ color: "rgba(15,31,69,0.7)" }}
            >
              {post.excerpt}
            </p>

            <div
              className="w-full mb-10"
              style={{ height: "1px", background: "rgba(15,31,69,0.07)" }}
            />

            {/* Body paragraphs */}
            <div className="flex flex-col gap-6">
              {paragraphs.map((para, i) => (
                <p
                  key={i}
                  className={`leading-relaxed ${i === 0 ? "text-base md:text-lg" : "text-sm md:text-base"}`}
                  style={{ color: "rgba(15,31,69,0.6)" }}
                >
                  {/* Drop cap on first paragraph */}
                  {i === 0 ? (
                    <>
                      <span
                        className="float-left mr-2 font-black text-[#0f1f45]"
                        style={{
                          fontSize: "clamp(3rem, 5vw, 3.75rem)",
                          lineHeight: 0.85,
                        }}
                      >
                        {para[0]}
                      </span>
                      {para.slice(1)}
                    </>
                  ) : (
                    para
                  )}
                </p>
              ))}
            </div>
          </article>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="bg-light-grey py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p
                  className="text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-3"
                  style={{ color: "rgba(240,165,0,0.85)" }}
                >
                  More Blog Posts
                </p>
                <h2
                  className="font-bold text-[#0f1f45] leading-tight tracking-tight"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
                >
                  Keep Reading
                </h2>
              </div>
              <Link
                to="/blog"
                className="hidden md:inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-opacity hover:opacity-60"
                style={{ color: "rgba(15,31,69,0.4)" }}
              >
                All Posts
                <ArrowUpRight size={11} weight="bold" />
              </Link>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden"
              style={{ background: "rgba(15,31,69,0.08)" }}
            >
              {related.map((p) => (
                <Link
                  key={p.id}
                  to={`/blog/${p.slug}`}
                  className="group flex flex-col bg-light-grey hover:bg-white transition-colors duration-200 overflow-hidden"
                >
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: "16/9" }}
                  >
                    <img
                      src={p.coverImage}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-[1.03] group-hover:scale-100"
                    />
                  </div>
                  <div className="p-6 flex flex-col gap-3">
                    <span
                      className="text-[0.6rem] font-bold tracking-widest uppercase"
                      style={{ color: "rgba(240,165,0,0.9)" }}
                    >
                      {p.category}
                    </span>
                    <h3 className="font-bold text-[#0f1f45] leading-snug text-sm group-hover:opacity-70 transition-opacity">
                      {p.title}
                    </h3>
                    <p
                      className="text-xs"
                      style={{ color: "rgba(15,31,69,0.4)" }}
                    >
                      {formatDate(p.publishedAt)} · {p.readTime} min read
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
