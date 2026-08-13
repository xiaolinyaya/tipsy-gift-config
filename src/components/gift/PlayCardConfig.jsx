import { useRef } from 'react'
import { PLAYS } from '../../data/plays'
import './PlayCardConfig.css'

// Configures the special message-flow play card + live chat-room preview.
// play = { name, intro, buttonText, target, cardImageUrl }
export default function PlayCardConfig({ play, onChange }) {
  const imgInput = useRef(null)
  const titleInput = useRef(null)
  const buttonInput = useRef(null)
  const set = (patch) => onChange({ ...play, ...patch })

  function readImage(file, key, maxMB) {
    if (!file || !file.type.startsWith('image/')) return
    if (file.size > maxMB * 1024 * 1024) return
    const reader = new FileReader()
    reader.onload = () => set({ [key]: reader.result })
    reader.readAsDataURL(file)
  }

  const handleImage = (file) => readImage(file, 'cardImageUrl', 4)
  const handleTitleImage = (file) => readImage(file, 'nameImageUrl', 2)
  const handleButtonImage = (file) => readImage(file, 'buttonBgUrl', 1)

  return (
    <div className="pcc">
      <div className="pcc-form">
        <div className="field" data-prd="pcc-name">
          <label className="field-label">玩法名称</label>
          <input
            className="text-input"
            value={play.name}
            placeholder="e.g. 真心话"
            onChange={(e) => set({ name: e.target.value })}
          />
          <div className="pcc-title-upload" data-prd="pcc-title-img">
            <button type="button" className="img-btn" onClick={() => titleInput.current?.click()}>
              {play.nameImageUrl ? '替换标题图' : '上传标题图'}
            </button>
            {play.nameImageUrl && (
              <>
                <img className="pcc-title-thumb" src={play.nameImageUrl} alt="title" />
                <button type="button" className="img-btn danger" onClick={() => set({ nameImageUrl: '' })}>
                  移除
                </button>
              </>
            )}
            <span className="field-hint">上传后卡片标题用图片展示，建议 PNG 透明底、高 ≤ 120px、≤ 2MB</span>
          </div>
          <input
            ref={titleInput}
            type="file"
            accept="image/png,image/webp,image/svg+xml"
            hidden
            onChange={(e) => handleTitleImage(e.target.files?.[0])}
          />
        </div>

        <div className="field" data-prd="pcc-intro">
          <label className="field-label">玩法介绍文案</label>
          <input
            className="text-input"
            value={play.intro}
            placeholder="e.g. 都喝到这了…我们来玩个真心话？"
            onChange={(e) => set({ intro: e.target.value })}
          />
        </div>

        <div className="field-row">
          <div className="field" data-prd="pcc-button">
            <label className="field-label">按钮文案</label>
            <input
              className="text-input"
              value={play.buttonText}
              placeholder="e.g. 来玩真心话"
              onChange={(e) => set({ buttonText: e.target.value })}
            />
          </div>
          <div className="field" data-prd="pcc-target">
            <label className="field-label">点击跳转玩法</label>
            <select
              className="text-input"
              value={play.target}
              onChange={(e) => set({ target: e.target.value })}
            >
              <option value="">选择玩法…</option>
              {PLAYS.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="field" data-prd="pcc-button-bg">
          <label className="field-label">按钮背景（可选）</label>
          <div className="pcc-img-row">
            <button type="button" className="img-btn" onClick={() => buttonInput.current?.click()}>
              {play.buttonBgUrl ? '替换按钮背景' : '上传按钮背景'}
            </button>
            {play.buttonBgUrl && (
              <>
                <img className="pcc-title-thumb" src={play.buttonBgUrl} alt="button bg" />
                <button type="button" className="img-btn danger" onClick={() => set({ buttonBgUrl: '' })}>
                  移除
                </button>
              </>
            )}
            <span className="field-hint">建议 PNG 透明底，360 × 96 px，≤ 1MB，留空用默认渐变按钮</span>
          </div>
          <input
            ref={buttonInput}
            type="file"
            accept="image/png,image/webp,image/svg+xml"
            hidden
            onChange={(e) => handleButtonImage(e.target.files?.[0])}
          />
        </div>

        <div className="field" data-prd="pcc-bg">
          <label className="field-label">卡片背景图（可选）</label>
          <div className="pcc-img-row">
            <button type="button" className="img-btn" onClick={() => imgInput.current?.click()}>
              {play.cardImageUrl ? '替换背景图' : '上传背景图'}
            </button>
            {play.cardImageUrl && (
              <button type="button" className="img-btn danger" onClick={() => set({ cardImageUrl: '' })}>
                移除
              </button>
            )}
            <span className="field-hint">建议 690 × 300 px，≤ 4MB，留空用默认渐变底</span>
          </div>
          <input
            ref={imgInput}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleImage(e.target.files?.[0])}
          />
        </div>
      </div>

      {/* 消息流预览 */}
      <div className="pcc-preview" data-prd="pcc-preview">
        <div className="pcc-phone">
          <div className="pcc-chat">
            <div className="pcc-bubble left">在吗？给你准备了礼物 🎁</div>

            <div className="pcc-card" style={play.cardImageUrl ? { backgroundImage: `url(${play.cardImageUrl})` } : undefined}>
              <div className="pcc-card-scrim" />
              <div className="pcc-card-content">
                {play.nameImageUrl ? (
                  <img className="pcc-card-name-img" src={play.nameImageUrl} alt={play.name || '玩法'} />
                ) : (
                  <div className="pcc-card-name">{play.name || '玩法名称'}</div>
                )}
                <div className="pcc-card-intro">{play.intro || '玩法介绍文案…'}</div>
                <div
                  className={`pcc-card-btn ${play.buttonBgUrl ? 'has-bg' : ''}`}
                  style={play.buttonBgUrl ? { backgroundImage: `url(${play.buttonBgUrl})` } : undefined}
                >
                  {play.buttonText || '按钮文案'}
                </div>
              </div>
            </div>

            <div className="pcc-bubble left">来呀～</div>
          </div>
        </div>
        <p className="pcc-preview-cap">消息流范例 · 实际以线上渲染为准</p>
      </div>
    </div>
  )
}
