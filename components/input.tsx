import React from "react";

interface InputProps {
  id: string;
  onChange: any;
  value: string;
  placeholder: string;
  type: string;
}

const Input: React.FC<InputProps> = ({
  id,
  onChange,
  value,
  placeholder,
  type,
}) => {
  return (
    <input
      id={id}
      className="block rounded-md px-6 py-2 w-full text-md
    text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0"
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
