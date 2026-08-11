// Inline SVG glyphs used inside the circular card icons.
// Each is stroke-based and inherits `currentColor` from the wrapper.
const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const Icons = {
  party: (
    <svg viewBox="0 0 24 24" width="22" height="22" {...s}>
      <path d="M5.8 11.3 2 22l10.7-3.79" />
      <path d="M4 3h.01M22 8h.01M15 2h.01M22 20h.01" />
      <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" />
      <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11-.11.7-.72 1.22-1.43 1.22H17" />
      <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7" />
      <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z" />
    </svg>
  ),
  robot: (
    <svg viewBox="0 0 24 24" width="22" height="22" {...s}>
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M12 4v4M9 2h6" />
      <circle cx="9" cy="13" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="13" r="1" fill="currentColor" stroke="none" />
      <path d="M9 17h6" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" stroke="none">
      <path d="M12 2l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.6 6.1 20.8l1.2-6.6L2.5 9l6.6-.9L12 2z" />
    </svg>
  ),
  ban: (
    <svg viewBox="0 0 24 24" width="22" height="22" {...s}>
      <circle cx="12" cy="12" r="9" />
      <path d="m5.6 5.6 12.8 12.8" />
    </svg>
  ),
  eyeOff: (
    <svg viewBox="0 0 24 24" width="22" height="22" {...s}>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 8 10 8a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.53 13.53 0 0 0 2 12s3 8 10 8a9.74 9.74 0 0 0 5.39-1.61" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <path d="m2 2 20 20" />
    </svg>
  ),
  idCard: (
    <svg viewBox="0 0 24 24" width="22" height="22" {...s}>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <circle cx="9" cy="11" r="2" />
      <path d="M7 16c.5-1.2 1.7-2 3-2M14 9h4M14 13h4" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" width="22" height="22" {...s}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  invoice: (
    <svg viewBox="0 0 24 24" width="22" height="22" {...s}>
      <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
      <path d="M14 2v5h5" />
      <path d="M12 10c-1.1 0-2 .7-2 1.6s.9 1.4 2 1.4 2 .6 2 1.4-.9 1.6-2 1.6M12 9v1M12 17v1" />
    </svg>
  ),
  pencil: (
    <svg viewBox="0 0 24 24" width="22" height="22" {...s}>
      <path d="M17 3a2.85 2.85 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5z" />
      <path d="m15 5 4 4" />
    </svg>
  ),
  userSearch: (
    <svg viewBox="0 0 24 24" width="22" height="22" {...s}>
      <circle cx="10" cy="7" r="4" />
      <path d="M4 20c0-3.3 2.7-5 6-5 1 0 2 .2 2.8.5" />
      <circle cx="17" cy="16" r="3" />
      <path d="m21 20-1.8-1.8" />
    </svg>
  ),
  thumbs: (
    <svg viewBox="0 0 24 24" width="22" height="22" {...s}>
      <path d="M7 10v11H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1z" />
      <path d="M7 10l3.5-7A2 2 0 0 1 14 4v4h5a2 2 0 0 1 2 2.3l-1.3 7A2 2 0 0 1 17.7 19H7" />
    </svg>
  ),
  wrench: (
    <svg viewBox="0 0 24 24" width="22" height="22" {...s}>
      <path d="M14.7 6.3a4 4 0 0 0-5.2 5.2L3 18l3 3 6.5-6.5a4 4 0 0 0 5.2-5.2l-2.6 2.6-2.4-.6-.6-2.4z" />
    </svg>
  ),
  grid: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" stroke="none">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  toggle: (
    <svg viewBox="0 0 24 24" width="22" height="22" {...s}>
      <rect x="2" y="7" width="20" height="10" rx="5" />
      <circle cx="8" cy="12" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  bell: (
    <svg viewBox="0 0 24 24" width="22" height="22" {...s}>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </svg>
  ),
  key: (
    <svg viewBox="0 0 24 24" width="22" height="22" {...s}>
      <circle cx="7.5" cy="15.5" r="3.5" />
      <path d="m10 13 9-9M17 6l2 2M14 9l2 2" />
    </svg>
  ),
  image: (
    <svg viewBox="0 0 24 24" width="22" height="22" {...s}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="1.8" />
      <path d="m4 18 5-5 4 4 3-3 4 4" />
    </svg>
  ),
  chip: (
    <svg viewBox="0 0 24 24" width="22" height="22" {...s}>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="10" y="10" width="4" height="4" rx="1" />
      <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
    </svg>
  ),
  wallet: (
    <svg viewBox="0 0 24 24" width="22" height="22" {...s}>
      <path d="M3 7a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v2" />
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <path d="M16 12h4v4h-4a2 2 0 0 1 0-4z" />
    </svg>
  ),
  gamepad: (
    <svg viewBox="0 0 24 24" width="22" height="22" {...s}>
      <path d="M6 12h4M8 10v4" />
      <circle cx="16" cy="11" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="18" cy="13" r="0.6" fill="currentColor" stroke="none" />
      <rect x="2" y="7" width="20" height="10" rx="4" />
    </svg>
  ),
  gift: (
    <svg viewBox="0 0 24 24" width="22" height="22" {...s}>
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M5 12v9h14v-9M12 8v13" />
      <path d="M12 8S10.5 4 8 4a2 2 0 0 0 0 4zM12 8s1.5-4 4-4a2 2 0 0 1 0 4z" />
    </svg>
  ),
}
