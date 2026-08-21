import ImageUpload from './ImageUpload'
import './BubbleStickerConfig.css'

// 气泡贴纸（Bubble Sticker）：叠在气泡上的小装饰图，允许超出气泡边界。
// 设计术语参考：sticker overlay / overhang decoration，"出血" 指主动溢出边界。
// 锚点决定贴纸挂在气泡的哪个角。
export const STICKER_ANCHORS = [
  { key: 'top-left', label: '左上' },
  { key: 'top-right', label: '右上' },
  { key: 'bottom-left', label: '左下' },
  { key: 'bottom-right', label: '右下' },
]

export default function BubbleStickerConfig({
  stickerUrl,
  anchor,
  bubbleText,
  bubbleBgUrl,
  onStickerChange,
  onAnchorChange,
}) {
  return (
    <div className="stk">
      <div className="stk-left">
        <div className="upload-with-spec">
          <ImageUpload value={stickerUrl} onChange={onStickerChange} size={72} />
          <div className="spec-box">
            <div className="spec-title">气泡贴纸规范</div>
            <ul className="spec-list">
              <li>格式：PNG / WebP / APNG（透明底，支持动图）</li>
              <li>尺寸：正方形，建议 120 × 120 px</li>
              <li>大小：≤ 500KB</li>
              <li>出血：允许超出气泡边界，溢出部分建议 ≤ 贴纸的 40%</li>
              <li>视觉：主体避开气泡文字区，别压住文案</li>
            </ul>
            <p className="spec-fallback">留空则气泡不带贴纸。</p>
          </div>
        </div>

        <div className="stk-anchor">
          <label className="sub-label">贴纸位置</label>
          <div className="stk-anchor-btns">
            {STICKER_ANCHORS.map((a) => (
              <button
                key={a.key}
                type="button"
                className={`stk-anchor-btn ${anchor === a.key ? 'active' : ''}`}
                onClick={() => onAnchorChange(a.key)}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 气泡预览：贴纸溢出气泡边界 */}
      <div className="stk-preview">
        <div className="stk-canvas">
          <div
            className={`stk-bubble ${bubbleBgUrl ? 'has-bg' : ''}`}
            style={bubbleBgUrl ? { backgroundImage: `url(${bubbleBgUrl})` } : undefined}
          >
            <span className="stk-bubble-text">{bubbleText || '为你点亮全场 ✨'}</span>
            {stickerUrl && (
              <img className={`stk-sticker at-${anchor}`} src={stickerUrl} alt="sticker" />
            )}
          </div>
        </div>
        <p className="stk-cap">气泡贴纸预览 · 溢出边界即为出血效果</p>
      </div>
    </div>
  )
}
