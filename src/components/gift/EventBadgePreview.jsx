import { useEffect, useState } from 'react'
import { eventBadgeState, COUNTDOWN_DAYS } from '../../data/eventTime'
import './EventBadgePreview.css'

// 活动标签实时预览。进入倒计时(≤3天)后每秒刷新，便于在后台直接看到标签形态。
export default function EventBadgePreview({ gift }) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  const state = eventBadgeState(gift, now)
  if (state.kind === 'none') return null

  const hint = {
    upcoming: '活动还没开始，商城暂不展示该礼物。',
    normal: `距结束超过 ${COUNTDOWN_DAYS} 天，标签展示为普通「活动」样式。`,
    countdown: `已进入最后 ${COUNTDOWN_DAYS} 天，标签自动切换为倒计时形式。`,
    ended: '活动已结束，礼物会自动从活动位移除。',
  }[state.kind]

  return (
    <div className="evp">
      <div className="evp-row">
        <span className="evp-label">标签预览</span>
        <span className={`evp-badge kind-${state.kind}`}>
          {state.kind === 'countdown' && <span className="evp-clock">⏱</span>}
          {state.text}
        </span>
      </div>
      <p className="evp-hint">{hint}</p>
    </div>
  )
}
