import React from "react";

export type InputProps = {
  type?: "text" | "password";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
};

export default function Input({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  disabled = false,
  ...rest
}: InputProps) {
  const baseClass =
    "w-full px-2 py-3 bg-neutral-900 outline-none transition-colors duration-100 border focus:border-neutral-600 border-neutral-800 rounded-md";
  const disabledClass = "cursor-not-allowed opacity-50";
  const classNames = `${baseClass} ${disabled && disabledClass} ${className}`;

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={classNames}
      role="textbox"
      disabled={disabled}
      {...rest}
    />
  );
}
