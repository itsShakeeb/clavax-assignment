import React from "react";

const InputFields = ({
  placeholder,
  type,
  name,
  onChange,
  onFocus,
  value,
  error,
  maxLength,
  pattern,
  max,
  disabled,
  min,
}) => {
  return (
    <div>
      <div className="form-group  mb-3 ">
        <input
          placeholder={placeholder}
          type={type || "text"}
          className={`form-control ${error ? "is-invalid" : ""}`}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          maxLength={maxLength}
          pattern={pattern}
          max={max}
          size="sm"
          disabled={disabled}
        />
        {error && <span className="invalid-feedback">{error[0]}</span>}
      </div>
    </div>
  );
};

export default InputFields;
