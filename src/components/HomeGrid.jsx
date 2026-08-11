import { useMemo } from 'react'
import PageCard from './PageCard'
import { pages } from '../data/pages'
import './HomeGrid.css'

export default function HomeGrid({ query, onOpen }) {
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return pages
    return pages.filter((p) => {
      const initials = p.en
        .split(/\s+/)
        .map((w) => w[0])
        .join('')
        .toLowerCase()
      return (
        p.en.toLowerCase().includes(q) ||
        p.cn.includes(query.trim()) ||
        initials.includes(q)
      )
    })
  }, [query])

  return (
    <div className="home-grid">
      {filtered.map((p) => (
        <PageCard key={p.key} page={p} onClick={() => onOpen?.(p)} />
      ))}
    </div>
  )
}
