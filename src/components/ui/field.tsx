import { type InputHTMLAttributes } from "react";

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
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-[0.65rem] font-bold tracking-widest uppercase"
        style={{ color: "rgba(15,31,69,0.4)" }}
      >
        {label} {required && <span style={{ color: "#F0A500" }}>*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full text-sm bg-transparent outline-none transition-colors duration-200 pb-2"
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
    </div>
  );
}
