import React from "react";

const FieldSelect = ({
  name,
  value,
  error,
  type,
  onChange,
  placeholder,
  selectList,
  title,
  className,
}) => {
  return (
    <div className="form-group mb-3">
      <select
        className={`shadow-none form-control ${className ? className : ""} ${
          error ? "is-invalid" : ""
        }`}
        type={type || "text"}
        name={name}
        value={value}
        placeholder={placeholder || ""}
        onChange={onChange}
      >
        <option value="">{title}</option>
        {selectList.map((data, index) => (
          <option value={data} key={index}>
            {data}
          </option>
        ))}
      </select>

      {error && <span className="invalid-feedback">{error[0]}</span>}
    </div>
  );
};

export default FieldSelect;
