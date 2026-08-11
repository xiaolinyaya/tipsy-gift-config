import './SearchBar.css'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="searchbar-wrap">
      <div className="searchbar">
        <svg viewBox="0 0 24 24" width="20" height="20" className="searchbar-icon">
          <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="m20 20-3.2-3.2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder='按英文名或首字母搜索页面，如 "sm"'
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  )
}
