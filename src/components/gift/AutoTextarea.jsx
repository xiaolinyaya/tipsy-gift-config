import { useEffect, useRef } from 'react'

// Textarea that grows to fit its content (no inner scrollbar until maxHeight).
export default function AutoTextarea({ value, onChange, minRows = 1, maxHeight = 320, className = '', ...rest }) {
  const ref = useRef(null)

  function resize(el) {
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`
  }

  useEffect(() => {
    resize(ref.current)
  }, [value])

  return (
    <textarea
      ref={ref}
      className={className}
      rows={minRows}
      value={value}
      onChange={(e) => {
        onChange(e.target.value)
        resize(e.target)
      }}
      style={{ overflowY: 'hidden', resize: 'none' }}
      {...rest}
    />
  )
}
