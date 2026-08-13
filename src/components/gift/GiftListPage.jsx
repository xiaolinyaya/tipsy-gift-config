import { useMemo, useState } from 'react'
import { useGifts } from '../../store/GiftStore'
import './GiftListPage.css'

const TABS = [
  { key: 'all', label: '全部' },
  { key: 'daily', label: '日常礼物' },
  { key: 'event', label: '活动礼物' },
]

export default function GiftListPage({ onBack, onEdit, onCreate }) {
  const { gifts, reorder } = useGifts()
  const [tab, setTab] = useState('all')
  const [dragId, setDragId] = useState(null)
  const [overId, setOverId] = useState(null)

  const rows = useMemo(() => {
    // 已下架统一沉底；组内按 order 排。
    const sorted = [...gifts].sort((a, b) => {
      const offA = a.status === 'off' ? 1 : 0
      const offB = b.status === 'off' ? 1 : 0
      if (offA !== offB) return offA - offB
      return a.order - b.order
    })
    if (tab === 'all') return sorted
    return sorted.filter((g) => g.category === tab)
  }, [gifts, tab])

  return (
    <div className="gift-page">
      <div className="gift-breadcrumb">
        <button className="crumb-link" onClick={onBack}>Home</button>
        <span className="crumb-sep">/</span>
        <span className="crumb-current">礼物配置</span>
      </div>

      <div className="gift-header" data-prd="list-header">
        <div>
          <h1 className="gift-title">礼物配置</h1>
          <p className="gift-subtitle">管理礼物的上架、排序与定价，定价与上下架在编辑页调整</p>
        </div>
        <button className="btn-primary" data-prd="list-create" onClick={onCreate}>+ 新建礼物</button>
      </div>

      <div className="gift-tabs" data-prd="list-tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`gift-tab ${tab === t.key ? 'active' : ''}`}
            data-prd={`list-tab-${t.key}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
            <span className="gift-tab-count">
              {t.key === 'all' ? gifts.length : gifts.filter((g) => g.category === t.key).length}
            </span>
          </button>
        ))}
      </div>

      <div className="gift-table" data-prd="list-table">
        <div className="gift-row gift-row-head">
          <span className="col-drag" data-prd="list-col-drag" />
          <span className="col-gift" data-prd="list-col-gift">礼物样式</span>
          <span className="col-cat" data-prd="list-col-cat">分类</span>
          <span className="col-price" data-prd="list-col-price">定价 (Gems)</span>
          <span className="col-int" data-prd="list-col-int">亲密度</span>
          <span className="col-flag" data-prd="list-col-bubble">特殊气泡</span>
          <span className="col-flag" data-prd="list-col-reply">角色回复</span>
          <span className="col-effect" data-prd="list-col-effect">动效</span>
          <span className="col-play" data-prd="list-col-play">玩法</span>
          <span className="col-status" data-prd="list-col-status">状态</span>
          <span className="col-act" data-prd="list-col-act">操作</span>
        </div>

        {rows.map((g) => {
          // 只有「全部」Tab 下的上架礼物可拖拽排序；已下架恒定沉底不参与。
          const canDrag = tab === 'all' && g.status === 'on'
          const dragTitle = g.status === 'off'
            ? '已下架礼物固定排在最下方'
            : canDrag ? '拖拽排序' : '仅在「全部」下可拖拽排序'
          return (
          <div
            key={g.id}
            className={`gift-row ${g.status === 'off' ? 'is-off' : ''} ${overId === g.id && dragId !== g.id ? 'drag-over' : ''} ${dragId === g.id ? 'dragging' : ''}`}
            draggable={canDrag}
            onDragStart={() => canDrag && setDragId(g.id)}
            onDragOver={(e) => {
              if (!canDrag) return
              e.preventDefault()
              setOverId(g.id)
            }}
            onDrop={() => {
              if (!canDrag) return
              if (dragId && dragId !== g.id) reorder(dragId, g.id)
              setDragId(null)
              setOverId(null)
            }}
            onDragEnd={() => {
              setDragId(null)
              setOverId(null)
            }}
          >
            <span className="col-drag" title={dragTitle} data-prd="list-col-drag">
              <span className={`drag-handle ${canDrag ? '' : 'disabled'}`}>⠿</span>
            </span>

            <span className="col-gift">
              {g.iconUrl ? (
                <img className="gift-icon-img" src={g.iconUrl} alt="" />
              ) : (
                <span className="gift-emoji">{g.emoji}</span>
              )}
              <span className="gift-names">
                <span className="gift-name-en">{g.nameEn}</span>
                <span className="gift-name-zh">{g.names?.zh || '—'}</span>
              </span>
            </span>

            <span className="col-cat">
              {g.category === 'event' ? (
                <span className="badge-event">活动</span>
              ) : (
                <span className="badge-daily">日常</span>
              )}
            </span>

            <span className="col-price">
              <span className="price-value">{g.price}</span>
            </span>

            <span className="col-int">+{g.intimacy}</span>

            <span className="col-flag">
              {g.specialBubble
                ? <span className="cap-pill on">已开启</span>
                : <span className="cap-pill off">未开启</span>}
            </span>
            <span className="col-flag">
              {g.charReply
                ? <span className="cap-pill on">已开启</span>
                : <span className="cap-pill off">未开启</span>}
            </span>

            <span className="col-effect">
              {g.hasEffect
                ? <span className="cap-pill on">已开启</span>
                : <span className="cap-pill off">未开启</span>}
            </span>
            <span className="col-play">
              {g.hasPlay && g.play?.name
                ? <span className="play-chip">{g.play.name}</span>
                : g.hasPlay
                  ? <span className="cap-pill on">已开启</span>
                  : <span className="cap-pill off">未开启</span>}
            </span>

            <span className="col-status" data-prd="list-col-status">
              <span className={`status-pill ${g.status === 'on' ? 'on' : 'off'}`}>
                <span className="dot" />
                {g.status === 'on' ? '已上架' : '已下架'}
              </span>
            </span>

            <span className="col-act" data-prd="list-col-act">
              <button className="link-edit" data-prd="list-edit-btn" onClick={() => onEdit(g.id)}>编辑</button>
            </span>
          </div>
          )
        })}

        {rows.length === 0 && <div className="gift-empty">该分类下暂无礼物</div>}
      </div>
    </div>
  )
}
