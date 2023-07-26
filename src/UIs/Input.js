import React from "react";

export default function Input({
  label,
  id,
  type,
  className,
  placeholder,
  invalidFeedback,
  onChange,
  onBlur,
  value,
}) {
  return (
    <div className="form-floating mb-3 w-100">
      <input
        type={type}
        className={`form-control ${className}`}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label htmlFor={id} className="text-secondary">{label}</label>
      <div className="invalid-feedback">{invalidFeedback}</div>
    </div>
  );
}