import { useState, type InputHTMLAttributes } from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Field({
  label,
  id,
  type = "text",
  placeholder,
  required,
  ...props
}: FieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-[0.65rem] font-bold tracking-widest uppercase"
        style={{ color: "rgba(15,31,69,0.4)" }}
      >
        {label} {required && <span style={{ color: "#F0A500" }}>*</span>}
      </label>
      <div className="relative flex items-center">
        <input
          id={id}
          type={inputType}
          required={required}
          placeholder={placeholder}
          className="w-full text-sm bg-transparent outline-none transition-colors duration-200 pb-2 pr-10"
          style={{
            borderBottom: "1px solid rgba(15,31,69,0.15)",
            color: "#0f1f45",
          }}
          onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#1A3C6E")}
          onBlur={(e) =>
            (e.currentTarget.style.borderBottomColor = "rgba(15,31,69,0.15)")
          }
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 bottom-2 text-[rgba(15,31,69,0.3)] hover:text-primary transition-colors"
          >
            {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}
