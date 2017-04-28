import React, { PropTypes } from 'react'

const Checkbox = ({ checked, label, onClick }) => {
  const onChange = (event) => {
    onClick(event.target.checked)
  }

  return (
    <label className={`styled-checkbox ${checked && 'checked'}`}>
      <input type='checkbox' onChange={onChange} checked={checked} />
      <span>{label}</span>
    </label>
  )
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Checkbox
