import React from 'react'

const Label = ({ placeholder, htmlFor, className }) => {
  return (
    <label
      className={className}
      htmlFor={htmlFor}
    >
      {placeholder}
    </label>
  )
}

export default Label