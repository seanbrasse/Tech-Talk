import React from 'react';

const TextInput = ({className, rows, maxChar, placeholder, onChange, value}) => {

  return (
    <textarea 
      placeholder = {placeholder} 
      rows={rows} 
      value={value} 
      onChange={onChange} 
      maxLength={maxChar} 
      className={className}
    />
  );
}

export default TextInput;
