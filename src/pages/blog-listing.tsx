import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, Tag } from "@phosphor-icons/react";
import { blogPosts } from "../data/blog";
import type { BlogPost } from "../types/blog";

const categories = [
  "All",
  ...Array.from(new Set(blogPosts.map((p) => p.category))),
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group relative flex flex-col md:flex-row overflow-hidden rounded-2xl"
      style={{ border: "1px solid rgba(15,31,69,0.08)" }}
    >
      {/* Image */}
      <div
        className="w-full md:w-1/2 relative overflow-hidden"
        style={{ minHeight: "320px" }}
      >
        <img
          src={post.coverImage}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-[1.04] group-hover:scale-100"
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(15,31,69,0.2)" }}
        />
        {/* Featured badge */}
        <div className="absolute top-5 left-5">
          <span
            className="text-[0.6rem] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(240,165,0,0.9)",
              color: "#0f1f45",
            }}
          >
            Featured
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-between p-8 md:p-12 bg-white">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <span
              className="text-[0.6rem] font-bold tracking-widest uppercase"
              style={{ color: "rgba(240,165,0,0.9)" }}
            >
              {post.category}
            </span>
            <span
              className="w-1 h-1 rounded-full"
              style={{ background: "rgba(15,31,69,0.2)" }}
            />
            <span
              className="flex items-center gap-1 text-[0.6rem] font-medium"
              style={{ color: "rgba(15,31,69,0.4)" }}
            >
              <Clock size={10} />
              {post.readTime} min read
            </span>
          </div>

          <h2
            className="font-bold text-[#0f1f45] leading-[1.1] tracking-tight group-hover:opacity-70 transition-opacity"
            style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
          >
            {post.title}
          </h2>

          <p
            className="text-sm leading-relaxed"
            style={{ color: "rgba(15,31,69,0.5)" }}
          >
            {post.excerpt}
          </p>
        </div>

        <div
          className="flex items-center justify-between mt-8 pt-6"
          style={{ borderTop: "1px solid rgba(15,31,69,0.07)" }}
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold text-[#0f1f45]">
              {post.author}
            </span>
            <span
              className="text-[0.65rem]"
              style={{ color: "rgba(15,31,69,0.4)" }}
            >
              {formatDate(post.publishedAt)}
            </span>
          </div>
          <span
            className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{
              border: "1px solid rgba(15,31,69,0.15)",
              background: "rgba(15,31,69,0.03)",
            }}
          >
            <ArrowUpRight size={15} weight="bold" className="text-[#0f1f45]" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col bg-white overflow-hidden hover:bg-[#f5f7fb] transition-colors duration-200"
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <img
          src={post.coverImage}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-[1.03] group-hover:scale-100"
        />
        <div
          className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
          style={{ background: "rgba(15,31,69,0.15)" }}
        />
        <div
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-y-1 group-hover:translate-y-0"
          style={{ background: "rgba(255,255,255,0.9)" }}
        >
          <ArrowUpRight size={13} weight="bold" className="text-[#0f1f45]" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-6 flex-1">
        <div className="flex items-center justify-between">
          <span
            className="text-[0.6rem] font-bold tracking-widest uppercase"
            style={{ color: "rgba(240,165,0,0.9)" }}
          >
            {post.category}
          </span>
          <span
            className="flex items-center gap-1 text-[0.6rem] font-medium"
            style={{ color: "rgba(15,31,69,0.35)" }}
          >
            <Clock size={10} />
            {post.readTime} min
          </span>
        </div>

        <h3
          className="font-bold text-[#0f1f45] leading-snug group-hover:opacity-70 transition-opacity"
          style={{ fontSize: "0.9375rem" }}
        >
          {post.title}
        </h3>

        <p
          className="text-xs leading-relaxed flex-1"
          style={{ color: "rgba(15,31,69,0.5)" }}
        >
          {post.excerpt}
        </p>

        <div
          className="flex items-center justify-between pt-4 mt-auto"
          style={{ borderTop: "1px solid rgba(15,31,69,0.07)" }}
        >
          <span
            className="text-xs font-medium"
            style={{ color: "rgba(15,31,69,0.4)" }}
          >
            {post.author}
          </span>
          <span
            className="text-[0.6rem]"
            style={{ color: "rgba(15,31,69,0.3)" }}
          >
            {formatDate(post.publishedAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = blogPosts.find((p) => p.featured);
  const filtered = blogPosts
    .filter((p) => !p.featured || activeCategory !== "All")
    .filter((p) => activeCategory === "All" || p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 pt-32 md:pt-48 pb-16">
        <div
          className="w-full mb-10"
          style={{ height: "1px", background: "rgba(15,31,69,0.1)" }}
        />
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p
              className="text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-5"
              style={{ color: "rgba(240,165,0,0.85)" }}
            >
              Blog Posts
            </p>
            <h1
              className="font-bold leading-[1.05] tracking-tight text-[#0f1f45]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Thinking From{" "}
              <span style={{ color: "rgba(15,31,69,0.22)" }}>
                the Front Lines.
              </span>
            </h1>
          </div>
          <p
            className="text-sm leading-relaxed max-w-xs md:text-right"
            style={{ color: "rgba(15,31,69,0.45)" }}
          >
            Technical perspectives from practitioners who do the work. No
            filler.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200"
              style={{
                border: `1px solid ${activeCategory === cat ? "#1A3C6E" : "rgba(15,31,69,0.15)"}`,
                background: activeCategory === cat ? "#1A3C6E" : "transparent",
                color:
                  activeCategory === cat ? "#ffffff" : "rgba(15,31,69,0.55)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured post */}
      {featured && activeCategory === "All" && (
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <FeaturedCard post={featured} />
        </section>
      )}

      {/* Posts grid */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        {filtered.length > 0 ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden"
            style={{ background: "rgba(15,31,69,0.08)" }}
          >
            {filtered.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Tag size={32} style={{ color: "rgba(15,31,69,0.15)" }} />
            <p
              className="text-sm font-medium"
              style={{ color: "rgba(15,31,69,0.4)" }}
            >
              No posts in this category yet.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}