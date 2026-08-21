// 活动时间与倒计时。活动礼物的标签在临近结束时切换为倒计时形态。
export const COUNTDOWN_DAYS = 3

// 返回距结束的毫秒数；缺少 endAt 或格式非法时返回 null。
export function msLeft(endAt, now = Date.now()) {
  if (!endAt) return null
  const end = new Date(endAt).getTime()
  if (Number.isNaN(end)) return null
  return end - now
}

// 活动标签状态：
//   none      —— 非活动礼物 / 未填活动时间
//   upcoming  —— 还没开始
//   normal    —— 进行中，距结束 > 3 天，展示普通「活动」标签
//   countdown —— 进行中，距结束 ≤ 3 天，展示倒计时标签
//   ended     —— 已结束
export function eventBadgeState(gift, now = Date.now()) {
  if (gift?.category !== 'event') return { kind: 'none' }
  const { eventStartAt, eventEndAt } = gift
  const left = msLeft(eventEndAt, now)
  if (left === null) return { kind: 'normal', text: '活动' }
  if (left <= 0) return { kind: 'ended', text: '已结束' }

  if (eventStartAt) {
    const start = new Date(eventStartAt).getTime()
    if (!Number.isNaN(start) && now < start) {
      return { kind: 'upcoming', text: '未开始', left }
    }
  }

  if (left <= COUNTDOWN_DAYS * 24 * 3600 * 1000) {
    return { kind: 'countdown', text: formatCountdown(left), left }
  }
  return { kind: 'normal', text: '活动', left }
}

// 倒计时文案：>1 天显示「剩 2天3小时」，<1 天显示「剩 5:04:11」。
export function formatCountdown(ms) {
  const total = Math.max(0, Math.floor(ms / 1000))
  const d = Math.floor(total / 86400)
  const h = Math.floor((total % 86400) / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  if (d > 0) return `剩 ${d}天${h}小时`
  return `剩 ${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

// datetime-local 输入需要 "YYYY-MM-DDTHH:mm" 格式。
export function toLocalInput(value) {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}
