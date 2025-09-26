import { useState } from 'react'
import './Checkbox.css'

interface CheckboxProps {
  id?: string
  label?: string
  checked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
  className?: string
}

export default function Checkbox({
  id,
  label,
  checked = false,
  disabled = false,
  onChange,
  className = ''
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked)

  const handleChange = () => {
    if (disabled) return

    const newChecked = !isChecked
    setIsChecked(newChecked)
    onChange?.(newChecked)
  }

  return (
    <div className={`checkbox-container ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
        className="checkbox-input"
      />
      <label
        htmlFor={id}
        className={`checkbox-label ${disabled ? 'disabled' : ''}`}
      >
        <span className="checkbox-custom">
          {isChecked && <span className="checkbox-checkmark">✓</span>}
        </span>
        {label && <span className="checkbox-text">{label}</span>}
      </label>
    </div>
  )
}