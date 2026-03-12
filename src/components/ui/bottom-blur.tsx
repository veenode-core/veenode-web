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
        // 1. Apply the blur to the container itself
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        // 2. Use a mask to fade the blur effect out at the top
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 100%)",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
      }}
    >
      <div className="absolute bottom-0 left-0 right-0 pointer-events-auto">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
          {left && (
            <span className="text-[#0f1f45] font-semibold text-base truncate">
              {left}
            </span>
          )}
          {right && (
            <div className="flex items-center gap-4 shrink-0">{right}</div>
          )}
        </div>
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