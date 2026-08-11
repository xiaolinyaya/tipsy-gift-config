import { useRef, useState } from 'react'
import './ImageUpload.css'

// Local image upload. demo has no backend, so the file is read as a data URL
// and previewed inline; wiring to a real upload endpoint later only replaces
// the reader in handleFile.
export default function ImageUpload({ value, onChange, size = 88, accept = 'image/png,image/webp,image/gif,image/svg+xml' }) {
  const inputRef = useRef(null)
  const [error, setError] = useState('')

  function handleFile(file) {
    setError('')
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('请上传图片文件')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setError('文件不能超过 2MB')
      return
    }
    const reader = new FileReader()
    reader.onload = () => onChange(reader.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className="img-upload">
      <button
        type="button"
        className="img-drop"
        style={{ width: size, height: size }}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          handleFile(e.dataTransfer.files?.[0])
        }}
      >
        {value ? (
          <img src={value} alt="preview" className="img-preview" />
        ) : (
          <span className="img-placeholder">
            <span className="img-plus">+</span>
            <span className="img-hint">上传</span>
          </span>
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        hidden
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      <div className="img-actions">
        <button type="button" className="img-btn" onClick={() => inputRef.current?.click()}>
          {value ? '替换' : '选择文件'}
        </button>
        {value && (
          <button type="button" className="img-btn danger" onClick={() => onChange('')}>
            移除
          </button>
        )}
      </div>

      {error && <p className="img-error">{error}</p>}
    </div>
  )
}
