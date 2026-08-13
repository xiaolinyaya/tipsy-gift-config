import { Icons } from './Icons'
import './PageCard.css'

export default function PageCard({ page, onClick }) {
  return (
    <button className="page-card" data-prd={`home-card-${page.key}`} onClick={onClick}>
      <span className="page-card-icon" style={{ background: page.bg, color: page.fg }}>
        {Icons[page.icon]}
      </span>
      <span className="page-card-text">
        <span className="page-card-cn">{page.cn}</span>
        <span className="page-card-en">{page.en}</span>
      </span>
      <svg className="page-card-arrow" viewBox="0 0 24 24" width="22" height="22">
        <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
