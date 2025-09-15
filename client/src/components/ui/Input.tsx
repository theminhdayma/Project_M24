import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export default function Input({
  className = "",
  label,
  hint,
  error,
  ...rest
}: InputProps) {
  return (
    <label className="flex flex-col gap-1">
      {label && <span className="text-sm text-ink-600">{label}</span>}
      <input
        className={`rounded-md border border-ink-200 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-400 ${className}`}
        {...rest}
      />
      {hint && !error && (
        <span className="text-xs text-ink-500">{hint}</span>
      )}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}


