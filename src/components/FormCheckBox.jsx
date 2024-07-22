import React from 'react'

const FormCheckBox = ({ name, label, defaultValue, size }) => {
  return (
    <div className="form-control items-center">
      <label htmlFor={name} className="cursor-point label">
        <span className="label-text capitalize">{label}</span>
      </label>

      <input
        type="checkbox"
        name={name}
        id={name}
        className={`checkbox checkbox-primary ${size}`}
        defaultChecked={defaultValue}
      />
    </div>
  )
}

export default FormCheckBox
