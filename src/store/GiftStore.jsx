import { createContext, useContext, useEffect, useState } from 'react'
import { SEED_GIFTS } from '../data/gifts'
import { autoTranslate } from '../data/autoTranslate'

// v6: 移除气泡贴纸配置 (bubbleSticker / bubbleStickerUrl / stickerAnchor)。
const KEY = 'tipsy.gifts.v6'

// 仅这三种途径有效，旧数据里的 task/event/lottery/exchange/gift 会被过滤掉。
const VALID_WAYS = new Set(['drop', 'checkin', 'gempack'])
const GiftContext = createContext(null)

// Seed gifts ship with empty `names`; fill them from the mock dictionary once
// so the edit page shows real translations without a manual "translate" click.
function hydrateSeed() {
  return Promise.all(
    SEED_GIFTS.map(async (g) => ({
      ...g,
      names: Object.keys(g.names).length ? g.names : await autoTranslate(g.nameEn),
    })),
  )
}

// Backfill switch flags for gifts saved before hasEffect/hasPlay existed.
function normalize(gift) {
  // Migrate legacy flat playName into the structured play object.
  const play = gift.play || (gift.playName
    ? { name: gift.playName, intro: '', buttonText: '', target: '', cardImageUrl: '' }
    : { name: '', intro: '', buttonText: '', target: '', cardImageUrl: '' })
  return {
    ...gift,
    play,
    hasEffect: gift.hasEffect ?? Boolean(gift.effectUrl || gift.effect),
    hasPlay: gift.hasPlay ?? Boolean(gift.playName || play.name),
    // 库存（用户背包攒礼物）。途径收敛到 drop / checkin / gempack 三种。
    hasStock: gift.hasStock ?? false,
    obtainWays: (gift.obtainWays || []).filter((w) => VALID_WAYS.has(w)),
    dropConfig: { rate: 0, amount: 1, ...(gift.dropConfig || {}) },
    checkinConfig: { times: 1, amount: 1, startAt: '', endAt: '', ...(gift.checkinConfig || {}) },
    stockExpireDays: gift.stockExpireDays ?? 0,
    stockMaxHold: gift.stockMaxHold ?? 0,
    // 活动时间
    eventStartAt: gift.eventStartAt || '',
    eventEndAt: gift.eventEndAt || '',
  }
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw).map(normalize)
  } catch {
    // ignore corrupt storage; fall back to seed
  }
  return null
}

export function GiftProvider({ children }) {
  const [gifts, setGifts] = useState(() => load() || SEED_GIFTS)

  // First run (no saved state): hydrate seed translations, then persist.
  useEffect(() => {
    if (load()) return
    let alive = true
    hydrateSeed().then((seeded) => {
      if (alive) setGifts(seeded)
    })
    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(gifts))
  }, [gifts])

  const api = {
    gifts,
    get: (id) => gifts.find((g) => g.id === id),
    upsert: (gift) =>
      setGifts((prev) => {
        const i = prev.findIndex((g) => g.id === gift.id)
        if (i === -1) return [...prev, gift]
        const next = [...prev]
        next[i] = gift
        return next
      }),
    remove: (id) => setGifts((prev) => prev.filter((g) => g.id !== id)),
    setStatus: (id, status) =>
      setGifts((prev) => prev.map((g) => (g.id === id ? { ...g, status } : g))),
    setPrice: (id, price) =>
      setGifts((prev) => prev.map((g) => (g.id === id ? { ...g, price } : g))),
    reorder: (fromId, toId) =>
      setGifts((prev) => {
        const arr = [...prev]
        const from = arr.findIndex((g) => g.id === fromId)
        const to = arr.findIndex((g) => g.id === toId)
        if (from === -1 || to === -1 || from === to) return prev
        const [moved] = arr.splice(from, 1)
        arr.splice(to, 0, moved)
        return arr.map((g, idx) => ({ ...g, order: idx }))
      }),
    reset: () => {
      localStorage.removeItem(KEY)
      hydrateSeed().then(setGifts)
    },
  }

  return <GiftContext.Provider value={api}>{children}</GiftContext.Provider>
}

export function useGifts() {
  const ctx = useContext(GiftContext)
  if (!ctx) throw new Error('useGifts must be used within GiftProvider')
  return ctx
}
