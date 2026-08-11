import { useRef, useState } from 'react'
import './EffectUpload.css'

// Chat-room animation upload + live preview.
// demo reads the file as a data URL and plays it inside a mock chat room.
// Supports gif/apng/webp (as <img>), mp4/webm (as <video>), and shows a
// generic card for lottie JSON (real lottie player wired later).
const ACCEPT = 'image/gif,image/apng,image/webp,image/png,video/mp4,video/webm,application/json'

// Two effect types with distinct specs. local = small animation anchored near
// the gift/bubble; global = full-screen animation over the whole chat room.
const EFFECT_TYPES = {
  local: {
    label: '局部动效',
    desc: '在礼物/气泡附近的小范围播放',
    maxMB: 3,
    spec: [
      '格式：GIF / APNG / WebP / Lottie(JSON)',
      '尺寸：正方形，建议 300 × 300 px',
      '时长：≤ 3 秒，建议循环',
      '大小：≤ 3MB',
      '背景：透明底',
    ],
  },
  global: {
    label: '全局动效',
    desc: '全屏铺满，覆盖整个聊天室',
    maxMB: 8,
    spec: [
      '格式：MP4(H.264) / WebM / APNG / Lottie(JSON)',
      '尺寸：竖屏全屏，建议 750 × 1334 px',
      '时长：≤ 5 秒，单次播放',
      '大小：≤ 8MB',
      '背景：透明或带 Alpha 通道，可叠加于聊天室之上',
      '帧率：建议 30fps',
    ],
  },
}

export default function EffectUpload({ value, fileName, effectType = 'local', giftName, giftIcon, onChange, onTypeChange }) {
  const inputRef = useRef(null)
  const [error, setError] = useState('')
  const [kind, setKind] = useState(guessKind(value, fileName))
  const [playKey, setPlayKey] = useState(0)
  const type = EFFECT_TYPES[effectType] || EFFECT_TYPES.local

  function handleFile(file) {
    setError('')
    if (!file) return
    const okType = /image\/(gif|apng|webp|png)|video\/(mp4|webm)|application\/json/.test(file.type)
    if (!okType) {
      setError('支持 GIF / APNG / WebP / MP4 / WebM / Lottie(JSON)')
      return
    }
    if (file.size > type.maxMB * 1024 * 1024) {
      setError(`文件不能超过 ${type.maxMB}MB`)
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      onChange(reader.result, file.name)
      setKind(guessKind(reader.result, file.name))
      setPlayKey((k) => k + 1)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="fx">
      <div className="fx-left">
        <div className="fx-type">
          {Object.entries(EFFECT_TYPES).map(([key, t]) => (
            <button
              key={key}
              type="button"
              className={`fx-type-btn ${effectType === key ? 'active' : ''}`}
              onClick={() => onTypeChange?.(key)}
            >
              <span className="fx-type-label">{t.label}</span>
              <span className="fx-type-desc">{t.desc}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          className="fx-drop"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            handleFile(e.dataTransfer.files?.[0])
          }}
        >
          <span className="fx-plus">+</span>
          <span className="fx-drop-hint">上传动效文件</span>
          {value && fileName && <span className="fx-filename">{fileName}</span>}
        </button>
        <input ref={inputRef} type="file" accept={ACCEPT} hidden onChange={(e) => handleFile(e.target.files?.[0])} />

        <div className="spec-box">
          <div className="spec-title">{type.label}规范</div>
          <ul className="spec-list">
            {type.spec.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        {value && (
          <div className="fx-actions">
            <button type="button" className="img-btn" onClick={() => setPlayKey((k) => k + 1)}>▶ 重新播放</button>
            <button type="button" className="img-btn danger" onClick={() => { onChange('', ''); setKind(null) }}>移除</button>
          </div>
        )}
        {error && <p className="img-error">{error}</p>}
      </div>

      {/* 聊天室范例预览 */}
      <div className="fx-preview">
        <div className="fx-phone">
          <div className="fx-chat">
            <div className="fx-chat-header">
              <span className="fx-avatar">{giftIcon || '🤖'}</span>
              <span className="fx-chat-name">聊天室预览</span>
            </div>
            <div className="fx-chat-body">
              <div className="fx-bubble left">在吗？给你准备了礼物 🎁</div>
              <div className="fx-bubble right">收到啦～</div>

              {/* 动效层：局部动效锚定在礼物位小范围，全局动效全屏铺满 */}
              <div className={`fx-stage fx-stage-${effectType}`} key={playKey}>
                {value ? (
                  <EffectMedia kind={kind} src={value} />
                ) : (
                  <div className="fx-stage-empty">上传后在此预览{type.label}</div>
                )}
              </div>

              <div className="fx-gift-toast">
                <span className="fx-toast-icon">{giftIcon || '🎁'}</span>
                <span>送出「{giftName || '礼物'}」</span>
              </div>
            </div>
          </div>
        </div>
        <p className="fx-preview-cap">聊天室范例 · 实际以线上渲染为准</p>
      </div>
    </div>
  )
}

function guessKind(src, name = '') {
  if (!src) return null
  const s = `${src.slice(0, 40)} ${name}`.toLowerCase()
  if (s.includes('video/') || /\.(mp4|webm)/.test(s)) return 'video'
  if (s.includes('application/json') || /\.json/.test(s)) return 'lottie'
  return 'image'
}

function EffectMedia({ kind, src }) {
  if (kind === 'video') {
    return <video className="fx-media" src={src} autoPlay muted loop playsInline />
  }
  if (kind === 'lottie') {
    return (
      <div className="fx-lottie">
        <span className="fx-lottie-spin">✦</span>
        <span>Lottie 动效已上传</span>
        <span className="fx-lottie-sub">demo 暂不解析 JSON，线上由 Lottie 播放器渲染</span>
      </div>
    )
  }
  return <img className="fx-media" src={src} alt="effect" />
}
