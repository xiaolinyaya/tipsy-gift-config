import { LANGUAGES, SOURCE_LANG } from './languages'

// Curated translations for the 5 seed gifts, keyed by English name.
// Real localized strings so preview looks believable; anything not in here
// falls back to a marked placeholder the operator is expected to edit.
const DICT = {
  Heart: {
    zh: '爱心', 'zh-TW': '愛心', es: 'Corazón', pt: 'Coração', fr: 'Cœur', de: 'Herz',
    it: 'Cuore', ru: 'Сердце', ja: 'ハート', ko: '하트', ar: 'قلب', hi: 'दिल',
    bn: 'হৃদয়', id: 'Hati', ms: 'Hati', th: 'หัวใจ', vi: 'Trái tim', tr: 'Kalp',
    nl: 'Hart', pl: 'Serce', uk: 'Серце', fa: 'قلب', ur: 'دل', tl: 'Puso',
    sw: 'Moyo', he: 'לב',
  },
  'Glow Stick': {
    zh: '荧光棒', 'zh-TW': '螢光棒', es: 'Barra luminosa', pt: 'Bastão de luz',
    fr: 'Bâton lumineux', de: 'Leuchtstab', it: 'Bastoncino luminoso',
    ru: 'Светящаяся палочка', ja: 'グロースティック', ko: '야광봉', ar: 'عصا مضيئة',
    hi: 'ग्लो स्टिक', bn: 'গ্লো স্টিক', id: 'Stik cahaya', ms: 'Batang bercahaya',
    th: 'แท่งเรืองแสง', vi: 'Que phát sáng', tr: 'Işıklı çubuk', nl: 'Glowstick',
    pl: 'Świecący patyk', uk: 'Світна паличка', fa: 'چوب نورانی', ur: 'چمکتی چھڑی',
    tl: 'Glow stick', sw: 'Fimbo yenye mwanga', he: 'מקל זוהר',
  },
  Handcuffs: {
    zh: '手铐', 'zh-TW': '手銬', es: 'Esposas', pt: 'Algemas', fr: 'Menottes',
    de: 'Handschellen', it: 'Manette', ru: 'Наручники', ja: '手錠', ko: '수갑',
    ar: 'أصفاد', hi: 'हथकड़ी', bn: 'হাতকড়া', id: 'Borgol', ms: 'Gari',
    th: 'กุญแจมือ', vi: 'Còng tay', tr: 'Kelepçe', nl: 'Handboeien', pl: 'Kajdanki',
    uk: 'Наручники', fa: 'دستبند', ur: 'ہتھکڑی', tl: 'Posas', sw: 'Pingu',
    he: 'אזיקים',
  },
  Firework: {
    zh: '烟花', 'zh-TW': '煙花', es: 'Fuegos artificiales', pt: 'Fogo de artifício',
    fr: 'Feu d’artifice', de: 'Feuerwerk', it: 'Fuochi d’artificio', ru: 'Фейерверк',
    ja: '花火', ko: '불꽃놀이', ar: 'ألعاب نارية', hi: 'आतिशबाजी', bn: 'আতশবাজি',
    id: 'Kembang api', ms: 'Bunga api', th: 'ดอกไม้ไฟ', vi: 'Pháo hoa',
    tr: 'Havai fişek', nl: 'Vuurwerk', pl: 'Fajerwerki', uk: 'Феєрверк',
    fa: 'آتش‌بازی', ur: 'آتش بازی', tl: 'Paputok', sw: 'Fataki', he: 'זיקוקין',
  },
  Wine: {
    zh: '红酒', 'zh-TW': '紅酒', es: 'Vino', pt: 'Vinho', fr: 'Vin', de: 'Wein',
    it: 'Vino', ru: 'Вино', ja: 'ワイン', ko: '와인', ar: 'نبيذ', hi: 'वाइन',
    bn: 'ওয়াইন', id: 'Anggur', ms: 'Wain', th: 'ไวน์', vi: 'Rượu vang',
    tr: 'Şarap', nl: 'Wijn', pl: 'Wino', uk: 'Вино', fa: 'شراب', ur: 'شراب',
    tl: 'Alak', sw: 'Mvinyo', he: 'יין',
  },
}

// Simulates an async MT call. Returns a full {code: translation} map for every
// non-source language. Known gifts get curated strings; unknown names get a
// clearly-marked placeholder so the operator knows to review it.
export function autoTranslate(englishName) {
  const name = (englishName || '').trim()
  const curated = DICT[name]
  const out = {}
  for (const lang of LANGUAGES) {
    if (lang.code === SOURCE_LANG) continue
    out[lang.code] = curated?.[lang.code] ?? (name ? `${name} [${lang.code}]` : '')
  }
  return new Promise((resolve) => setTimeout(() => resolve(out), 600))
}

// True when a value looks like an unedited machine placeholder.
export function isPlaceholder(value) {
  return /\[[a-z-]+\]$/.test((value || '').trim())
}
