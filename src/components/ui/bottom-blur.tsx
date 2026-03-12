import { type ReactNode } from "react";

interface BottomBlurProps {
  left?: ReactNode;
  right?: ReactNode;
  className?: string;
}

export default function BottomBlur({
  left,
  right,
  className = "",
}: BottomBlurProps) {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 pointer-events-none ${className}`}
      style={{
        height: "220px",
        // This is the magic part
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 100%)",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
      }}
    >
      {/* Optional: Keep your white tint overlay if you want that milky look */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(255,255,255,0.4))",
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 pointer-events-auto">
        {/* ... rest of your content ... */}
      </div>
    </div>
  );
}

export function BottomBlurTag({ children }: { children: ReactNode }) {
  return (
    <span className="text-[0.6875rem] font-semibold tracking-widest uppercase text-[#0f1f45]/50">
      {children}
    </span>
  );
}