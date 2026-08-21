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
//   eventBadgeUrl string — 活动 Tag 背景图，留空用系统默认底色
//   eventBadgeText string — 活动 Tag 文案，留空回落到默认「活动」
//   showInChat    bool — 在聊天室内显示 (event only)；全局同时只能有一个礼物开启
//   chatIconUrl   string — 聊天室内展示用的入口图；留空回落到 iconUrl
//   price         number (Gems)
//   intimacy      number (+N intimacy added when sent)
//   hasStock      bool — 支持库存：用户可免费攒该礼物到背包，送礼时优先扣库存
//   obtainWays    string[] — 免费获取途径 keys: drop | checkin | gempack
//   dropConfig    { rate, amount } — 聊天掉落概率(%)与单次数量
//   checkinConfig { times, amount, startAt, endAt } — 签到次数/每次数量/可领取时间段
//   stockExpireDays  number — 库存有效期天数，0 = 永久
//   stockMaxHold  number — 单用户持有上限，0 = 不限
//   specialBubble bool — when true, bubbleText is shown/used
//   bubbleText    string — 送礼气泡文案 (only meaningful if specialBubble)
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
    hasStock: true, obtainWays: ['drop', 'checkin'],
    dropConfig: { rate: 2, amount: 1 },
    checkinConfig: { times: 1, amount: 5, startAt: '', endAt: '' },
    stockExpireDays: 0, stockMaxHold: 0,
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
    eventBadgeUrl: '', eventBadgeText: '限时',
    showInChat: true, chatIconUrl: '',
    price: 66, intimacy: 66,
    hasStock: true, obtainWays: ['checkin', 'gempack'],
    dropConfig: { rate: 0, amount: 1 },
    checkinConfig: { times: 1, amount: 1, startAt: isoOffsetDays(-1), endAt: isoOffsetDays(2) },
    stockExpireDays: 7, stockMaxHold: 20,
    specialBubble: true, bubbleText: '这束玫瑰只为你盛开 🌹',
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
