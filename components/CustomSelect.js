import React from "react";
import Select from "react-select";

export default ({ onChange, options, value, className, name }) => {
  const defaultValue = (options, value) => {
    return options ? options.find((option) => option.value === value) : "";
  };
  const capitalizedVariable = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className={className}>
      <label htmlFor={name}>{capitalizedVariable}</label>
      <Select
        name={name}
        value={defaultValue(options, value)}
        onChange={(value) => {
          onChange(value);
        }}
        options={options}
      />
    </div>
  );
};
