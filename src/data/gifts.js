// Gift data model for the 礼物配置 page.
//
// A gift has:
//   id            stable key
//   emoji         icon placeholder (real icon asset comes later)
//   nameEn        CORE name — source of truth, drives auto-translation
//   names         { [langCode]: string } localized names for all 27 languages
//   category      'daily' | 'event'   (event gifts show an 活动 badge)
//   eventStartAt  ISO-ish local datetime string — 活动开始 (event only)
//   eventEndAt    ISO-ish local datetime string — 活动结束; ≤3 天时标签转倒计时
//   price         number (Gems)
//   intimacy      number (+N intimacy added when sent)
//   hasStock      bool — when true, the gift is limited-quantity
//   stock         number — 库存总量 (only meaningful if hasStock)
//   specialBubble bool — when true, bubbleText is shown/used
//   bubbleText    string — 送礼气泡文案 (only meaningful if specialBubble)
//   bubbleSticker bool — when true, a sticker overlays (and overhangs) the bubble
//   bubbleStickerUrl  string — 气泡贴纸图片
//   stickerAnchor 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
//   charReply     bool — when true, replyPrompt is shown/used
//   replyPrompt   string — 角色回复Prompt (only meaningful if charReply)
//   effect        string — 聊天室动效 (text placeholder, e.g. "2s动效")
//   hasPlay       bool — when true, play card is configured
//   play          { name, intro, buttonText, target, cardImageUrl }
//   status        'on' | 'off'  (上架 / 下架)
//   order         sort weight (lower = higher in list); UI reorders via drag

export const SEED_GIFTS = [
  {
    id: 'heart', emoji: '💖', nameEn: 'Heart', category: 'daily',
    price: 1, intimacy: 1,
    specialBubble: false, bubbleText: '',
    charReply: false, replyPrompt: '',
    hasEffect: true, effect: '小气泡动画', hasPlay: false, play: {}, status: 'on', order: 0,
    names: {},
  },
  {
    id: 'glowstick', emoji: '🎇', nameEn: 'Glow Stick', category: 'daily',
    price: 19, intimacy: 20,
    specialBubble: true, bubbleText: '为你点亮全场 ✨',
    charReply: true, replyPrompt: '用户送了荧光棒，热情回应并表达被应援的喜悦。',
    hasEffect: true, effect: '2s动效', hasPlay: false, play: {}, status: 'on', order: 1,
    names: {},
  },
  {
    id: 'handcuffs', emoji: '🔗', nameEn: 'Handcuffs', category: 'daily',
    price: 49, intimacy: 50,
    specialBubble: true, bubbleText: '把你铐在我身边 🔒',
    charReply: true, replyPrompt: '用户送了手铐，以俏皮暧昧的语气回应这份"独占"。',
    hasEffect: true, effect: '3s动效', hasPlay: false, play: {}, status: 'on', order: 2,
    names: {},
  },
  {
    id: 'firework', emoji: '🎆', nameEn: 'Firework', category: 'daily',
    price: 99, intimacy: 100,
    specialBubble: true, bubbleText: '为你绽放整片夜空 🎆',
    charReply: true, replyPrompt: '用户送了烟花，用惊喜和感动的语气回应这份盛大的心意。',
    hasEffect: true, effect: '4s动效', hasPlay: false, play: {}, status: 'on', order: 3,
    names: {},
  },
  {
    id: 'wine', emoji: '🍷', nameEn: 'Wine', category: 'daily',
    price: 199, intimacy: 150,
    specialBubble: true, bubbleText: '与你共饮这一杯 🍷',
    charReply: true, replyPrompt: '用户送了红酒，以微醺、亲密的语气开启一段真心话。',
    hasEffect: true, effect: '3-5秒动效', hasPlay: true,
    play: {
      name: '真心话',
      intro: '都喝到这了…我们来玩个真心话？',
      buttonText: '来玩真心话',
      target: 'truth',
      cardImageUrl: '',
    },
    status: 'on', order: 4,
    names: {},
  },
  {
    // 活动礼物示例：结束时间落在 2 天后，标签直接以倒计时形态出现。
    id: 'rose-fest', emoji: '🌹', nameEn: 'Festival Rose', category: 'event',
    eventStartAt: isoOffsetDays(-1),
    eventEndAt: isoOffsetDays(2),
    price: 66, intimacy: 66,
    hasStock: true, stock: 500,
    specialBubble: true, bubbleText: '这束玫瑰只为你盛开 🌹',
    bubbleSticker: false, bubbleStickerUrl: '', stickerAnchor: 'top-right',
    charReply: true, replyPrompt: '用户送了节日玫瑰，以浪漫感动的语气回应这份节日心意。',
    hasEffect: true, effect: '玫瑰花雨', hasPlay: false, play: {}, status: 'on', order: 5,
    names: {},
  },
]

// 相对当天偏移天数，生成 datetime-local 可用的本地时间字符串。
function isoOffsetDays(days) {
  const d = new Date(Date.now() + days * 86400 * 1000)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}
