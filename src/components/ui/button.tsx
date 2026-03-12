import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "cta" | "cta-light";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
  to?: string;
  external?: string;
}

type ButtonProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps>;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-[#162a5e] active:bg-[#0a1530] border border-[#0f1f45] hover:border-[#162a5e] rounded-full",
  secondary:
    "bg-white text-[#0f1f45] border border-[#0f1f45]/30 hover:border-[#0f1f45]/60 hover:bg-[#f5f7fb] active:bg-[#edf0f8] rounded-full",
  ghost:
    "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 border border-transparent rounded-lg",
  cta: "bg-transparent text-[#0f1f45] hover:opacity-75 rounded-full",
  "cta-light": "bg-transparent text-white hover:opacity-75 rounded-full",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-sm px-4 py-3",
  md: "text-sm px-6 py-3.5",
  lg: "text-base px-8 py-4",
};

const ctaSizeClasses: Record<ButtonSize, string> = {
  sm: "text-sm py-1.5 gap-2",
  md: "text-[0.9375rem] py-1.5 gap-2.5",
  lg: "text-base py-1.5 gap-3",
};

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  fullWidth = false,
  children,
  className = "",
  to,
  external,
  ...rest
}: ButtonProps) {
  const isCta = variant === "cta" || variant === "cta-light";

  const classes = [
    "group inline-flex items-center justify-center gap-2.5 font-medium transition-all duration-200 whitespace-nowrap cursor-pointer leading-snug",
    variantClasses[variant],
    isCta ? ctaSizeClasses[size] : sizeClasses[size],
    fullWidth ? "w-full" : "",
    "disabled:opacity-40 disabled:pointer-events-none",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const arrowCircleClasses =
    variant === "cta"
      ? "flex items-center justify-center w-7 h-7 rounded-full border border-[#0f1f45]/20 transition-all duration-200 group-hover:border-[#0f1f45]/40 group-hover:translate-x-0.5"
      : "flex items-center justify-center w-7 h-7 rounded-full border border-white/25 transition-all duration-200 group-hover:border-white/50 group-hover:translate-x-0.5";

  const content = (
    <>
      <span>{children}</span>
      {icon && !isCta && <span className="shrink-0">{icon}</span>}
      {isCta && (
        <span className={arrowCircleClasses}>
          <ArrowRight weight="bold" className="w-3.5 h-3.5" />
        </span>
      )}
    </>
  );

  if (external) {
    return (
      <a
        href={external}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  );
}
