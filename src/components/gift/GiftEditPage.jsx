import { useState } from 'react'
import { useGifts } from '../../store/GiftStore'
import MultiLangNames from './MultiLangNames'
import ImageUpload from './ImageUpload'
import EffectUpload from './EffectUpload'
import AutoTextarea from './AutoTextarea'
import PlayCardConfig from './PlayCardConfig'
import BubbleStickerConfig from './BubbleStickerConfig'
import StockConfig from './StockConfig'
import EventBadgePreview from './EventBadgePreview'
import { toLocalInput } from '../../data/eventTime'
import './GiftEditPage.css'

function blankGift() {
  return {
    id: `gift_${Math.random().toString(36).slice(2, 8)}`,
    emoji: '🎁', iconUrl: '', nameEn: '', names: {}, category: 'daily',
    eventBadgeUrl: '', eventStartAt: '', eventEndAt: '',
    price: 0, intimacy: 0,
    hasStock: false, obtainWays: [], stockExpireDays: 0, stockMaxHold: 0,
    specialBubble: false, bubbleText: '', bubbleBgUrl: '',
    bubbleSticker: false, bubbleStickerUrl: '', stickerAnchor: 'top-right',
    charReply: false, replyPrompt: '',
    hasEffect: false, effectType: 'local', effect: '', effectUrl: '',
    hasPlay: false,
    play: {
      name: '', nameImageUrl: '', intro: '', buttonText: '', target: '', cardImageUrl: '',
    },
    status: 'off', order: 999,
  }
}

export default function GiftEditPage({ giftId, onDone }) {
  const { get, upsert, remove } = useGifts()
  const isNew = !giftId
  const [form, setForm] = useState(() => (giftId ? { ...get(giftId) } : blankGift()))
  const [toast, setToast] = useState(null)

  const set = (patch) => setForm((f) => ({ ...f, ...patch }))

  function showToast(message) {
    setToast(message)
    clearTimeout(showToast._t)
    showToast._t = setTimeout(() => setToast(null), 3000)
  }

  // 上架门槛：基础信息板块必须全部已填写。返回缺失项列表。
  function missingBasics(f) {
    const missing = []
    if (!f.iconUrl) missing.push({ label: '礼物图标', anchor: 'edit-icon' })
    if (!f.nameEn.trim()) missing.push({ label: '英文名', anchor: 'edit-names' })
    if (!(f.price > 0)) missing.push({ label: '定价', anchor: 'edit-price' })
    if (!(f.intimacy > 0)) missing.push({ label: '亲密度', anchor: 'edit-intimacy' })
    return missing
  }

  function guideToMissing(missing) {
    showToast(`上架前请完善基础信息：${missing.map((m) => m.label).join('、')}`)
    document.querySelector(`[data-prd="${missing[0].anchor}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  function toggleStatus() {
    if (form.status === 'on') {
      set({ status: 'off' })
      return
    }
    const missing = missingBasics(form)
    if (missing.length) {
      guideToMissing(missing)
      return
    }
    set({ status: 'on' })
  }

  function save() {
    if (!form.nameEn.trim()) {
      showToast('请填写英文名（核心名称）')
      document.querySelector('[data-prd="edit-names"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    if (form.status === 'on') {
      const missing = missingBasics(form)
      if (missing.length) {
        guideToMissing(missing)
        return
      }
    }
    upsert(form)
    onDone()
  }

  return (
    <div className="edit-page">
      {toast && (
        <div className="edit-toast" role="alert">
          <span className="edit-toast-icon">!</span>
          <span>{toast}</span>
        </div>
      )}
      <div className="gift-breadcrumb">
        <button className="crumb-link" onClick={onDone}>Home</button>
        <span className="crumb-sep">/</span>
        <button className="crumb-link" onClick={onDone}>礼物配置</button>
        <span className="crumb-sep">/</span>
        <span className="crumb-current">{isNew ? '新建礼物' : `编辑 · ${form.nameEn || '未命名'}`}</span>
      </div>

      <div className="edit-header" data-prd="edit-header">
        <h1 className="gift-title">{isNew ? '新建礼物' : '编辑礼物'}</h1>
        <div className="edit-actions">
          {!isNew && (
            <button
              className="btn-danger"
              data-prd="edit-delete"
              onClick={() => {
                if (confirm(`确定删除礼物「${form.nameEn}」？`)) {
                  remove(form.id)
                  onDone()
                }
              }}
            >
              删除
            </button>
          )}
          <button className="btn-ghost" data-prd="edit-cancel" onClick={onDone}>取消</button>
          <button className="btn-primary" data-prd="edit-save" onClick={save}>保存</button>
        </div>
      </div>

      <div className={`status-bar ${form.status === 'on' ? 'on' : 'off'}`} data-prd="edit-status">
        <div className="status-bar-info">
          <span className="status-bar-dot" />
          <span className="status-bar-title">{form.status === 'on' ? '已上架' : '已下架'}</span>
        </div>
        <button
          type="button"
          className={`switch ${form.status === 'on' ? 'on' : ''}`}
          onClick={toggleStatus}
        >
          <span className="knob" />
        </button>
      </div>

      {/* 分组 1：基础信息 */}
      <section className="edit-section" data-prd="edit-basic">
        <h2 className="section-title">基础信息</h2>

        <div className="field" data-prd="edit-icon">
          <label className="field-label">礼物图标</label>
          <div className="upload-with-spec">
            <ImageUpload value={form.iconUrl} onChange={(iconUrl) => set({ iconUrl })} size={96} />
            <div className="spec-box">
              <div className="spec-title">Icon 规范</div>
              <ul className="spec-list">
                <li>格式：PNG / WebP / SVG（透明背景）</li>
                <li>尺寸：正方形，建议 240 × 240 px</li>
                <li>大小：≤ 2MB</li>
                <li>留白：图形四周留 ~8% 安全边距</li>
                <li>视觉：主体居中，避免文字与描边过细</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="field" data-prd="edit-names">
          <MultiLangNames
            nameEn={form.nameEn}
            names={form.names}
            onNameEnChange={(nameEn) => set({ nameEn })}
            onNamesChange={(names) => set({ names })}
          />
        </div>

        <div className="field-row">
          <div className="field" data-prd="edit-price">
            <label className="field-label">定价 (Gems)</label>
            <input
              className="text-input"
              type="number"
              min="0"
              value={form.price}
              onChange={(e) => set({ price: Number(e.target.value) })}
            />
          </div>

          <div className="field" data-prd="edit-intimacy">
            <label className="field-label">亲密度 (+N)</label>
            <input
              className="text-input"
              type="number"
              min="0"
              value={form.intimacy}
              onChange={(e) => set({ intimacy: Number(e.target.value) })}
            />
          </div>
        </div>

        <div className="switch-row" data-prd="edit-stock-switch">
          <div className="switch-label">
            <span>支持库存</span>
            <span className="switch-desc">开启后用户可通过行为免费获得该礼物并存入背包，送礼时优先扣减库存，不消耗 Gems</span>
          </div>
          <button
            type="button"
            className={`switch ${form.hasStock ? 'on' : ''}`}
            onClick={() => set({ hasStock: !form.hasStock })}
          >
            <span className="knob" />
          </button>
        </div>
        {form.hasStock && (
          <StockConfig
            ways={form.obtainWays || []}
            expireDays={form.stockExpireDays ?? 0}
            maxHold={form.stockMaxHold ?? 0}
            onWaysChange={(obtainWays) => set({ obtainWays })}
            onExpireChange={(stockExpireDays) => set({ stockExpireDays })}
            onMaxHoldChange={(stockMaxHold) => set({ stockMaxHold })}
          />
        )}

        <div className="field" data-prd="edit-category">
          <label className="field-label">分类</label>
          <div className="cat-options">
            <button
              type="button"
              className={`cat-option ${form.category === 'daily' ? 'active' : ''}`}
              onClick={() => set({ category: 'daily' })}
            >
              <span className="cat-option-radio" />
              <span className="cat-option-body">
                <span className="cat-option-name">日常礼物</span>
                <span className="cat-option-desc">常驻礼物商城，按排序展示。</span>
              </span>
            </button>
            <button
              type="button"
              className={`cat-option ${form.category === 'event' ? 'active' : ''}`}
              onClick={() => set({ category: 'event' })}
            >
              <span className="cat-option-radio" />
              <span className="cat-option-body">
                <span className="cat-option-name">
                  活动礼物 <span className="seg-badge">活动</span>
                </span>
                <span className="cat-option-desc">
                  活动性质的礼物会带「活动」标签，并且在礼物商城中位置会更靠前。
                </span>
              </span>
            </button>
          </div>
        </div>

        {form.category === 'event' && (
          <div className="field conditional" data-prd="edit-event-time">
            <label className="field-label">活动时间</label>
            <div className="field-row">
              <div className="field">
                <label className="sub-label">开始时间</label>
                <input
                  className="text-input"
                  type="datetime-local"
                  value={toLocalInput(form.eventStartAt)}
                  onChange={(e) => set({ eventStartAt: e.target.value })}
                />
              </div>
              <div className="field">
                <label className="sub-label">结束时间</label>
                <input
                  className="text-input"
                  type="datetime-local"
                  value={toLocalInput(form.eventEndAt)}
                  onChange={(e) => set({ eventEndAt: e.target.value })}
                />
              </div>
            </div>
            <EventBadgePreview gift={form} />
          </div>
        )}

        {form.category === 'event' && (
          <div className="field conditional" data-prd="edit-event-badge">
            <label className="field-label">活动标签样式</label>
            <div className="upload-with-spec">
              <ImageUpload
                value={form.eventBadgeUrl}
                onChange={(eventBadgeUrl) => set({ eventBadgeUrl })}
                size={72}
              />
              <div className="spec-box">
                <div className="spec-title">活动标签规范</div>
                <ul className="spec-list">
                  <li>格式：PNG / WebP / SVG（透明背景）</li>
                  <li>尺寸：横向，建议 120 × 48 px</li>
                  <li>大小：≤ 1MB</li>
                  <li>用途：叠加在礼物图标角标位，替代默认「活动」文字标签</li>
                </ul>
                <p className="spec-fallback">留空则使用系统默认「活动」文字标签。</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 分组 2：互动（开关联动） */}
      <section className="edit-section" data-prd="edit-interaction">
        <h2 className="section-title">互动</h2>

        <div className="switch-row" data-prd="edit-bubble-switch">
          <div className="switch-label">
            <span>特殊气泡</span>
            <span className="switch-desc">开启后可配置送礼时展示的气泡文案</span>
          </div>
          <button
            type="button"
            className={`switch ${form.specialBubble ? 'on' : ''}`}
            onClick={() => set({ specialBubble: !form.specialBubble })}
          >
            <span className="knob" />
          </button>
        </div>
        {form.specialBubble && (
          <div className="field conditional" data-prd="edit-bubble-text">
            <label className="field-label">送礼气泡文案</label>
            <AutoTextarea
              className="text-area"
              value={form.bubbleText}
              placeholder="e.g. 为你点亮全场 ✨"
              onChange={(bubbleText) => set({ bubbleText })}
            />
            <label className="field-label" style={{ marginTop: 14 }}>气泡背景</label>
            <div className="upload-with-spec" data-prd="edit-bubble-bg">
              <ImageUpload
                value={form.bubbleBgUrl}
                onChange={(bubbleBgUrl) => set({ bubbleBgUrl })}
                size={72}
              />
              <div className="spec-box">
                <div className="spec-title">气泡背景规范</div>
                <ul className="spec-list">
                  <li>格式：PNG / WebP（透明底，支持九宫格拉伸）</li>
                  <li>尺寸：建议 300 × 120 px，随文案长度横向拉伸</li>
                  <li>大小：≤ 1MB</li>
                  <li>留白：文字安全区四周留 ~12% 边距</li>
                </ul>
                <p className="spec-fallback">留空则使用系统默认气泡样式。</p>
              </div>
            </div>

            <div className="sticker-block" data-prd="edit-bubble-sticker">
              <div className="switch-row inner">
                <div className="switch-label">
                  <span>气泡贴纸 <span className="term-en">Bubble Sticker</span></span>
                  <span className="switch-desc">叠在气泡上的小装饰，允许超出气泡边界（出血）</span>
                </div>
                <button
                  type="button"
                  className={`switch ${form.bubbleSticker ? 'on' : ''}`}
                  onClick={() => set({ bubbleSticker: !form.bubbleSticker })}
                >
                  <span className="knob" />
                </button>
              </div>

              {form.bubbleSticker && (
                <BubbleStickerConfig
                  stickerUrl={form.bubbleStickerUrl}
                  anchor={form.stickerAnchor || 'top-right'}
                  bubbleText={form.bubbleText}
                  bubbleBgUrl={form.bubbleBgUrl}
                  onStickerChange={(bubbleStickerUrl) => set({ bubbleStickerUrl })}
                  onAnchorChange={(stickerAnchor) => set({ stickerAnchor })}
                />
              )}
            </div>
          </div>
        )}

        <div className="switch-row" data-prd="edit-reply-switch">
          <div className="switch-label">
            <span>角色回复</span>
            <span className="switch-desc">开启后角色会对该礼物做出 AI 回复</span>
          </div>
          <button
            type="button"
            className={`switch ${form.charReply ? 'on' : ''}`}
            onClick={() => set({ charReply: !form.charReply })}
          >
            <span className="knob" />
          </button>
        </div>
        {form.charReply && (
          <div className="field conditional" data-prd="edit-reply-prompt">
            <label className="field-label">角色回复 Prompt</label>
            <AutoTextarea
              className="text-area"
              minRows={3}
              value={form.replyPrompt}
              placeholder="描述角色收到该礼物后应如何回应，如语气、情绪、内容方向。"
              onChange={(replyPrompt) => set({ replyPrompt })}
            />
          </div>
        )}

        <div className="switch-row" data-prd="edit-effect-switch">
          <div className="switch-label">
            <span>聊天室动效</span>
            <span className="switch-desc">开启后可上传送礼时在聊天室播放的动效</span>
          </div>
          <button
            type="button"
            className={`switch ${form.hasEffect ? 'on' : ''}`}
            onClick={() => set({ hasEffect: !form.hasEffect })}
          >
            <span className="knob" />
          </button>
        </div>
        {form.hasEffect && (
          <div className="field conditional" data-prd="edit-effect-config">
            <EffectUpload
              value={form.effectUrl}
              fileName={form.effect}
              giftName={form.names?.zh || form.nameEn}
              giftIcon={form.iconUrl ? '' : form.emoji}
              onChange={(effectUrl, fileName) => set({ effectUrl, effect: fileName })}
            />
          </div>
        )}

        <div className="switch-row" data-prd="edit-play-switch">
          <div className="switch-label">
            <span>玩法卡片</span>
            <span className="switch-desc">开启后在聊天室以特殊消息卡呈现，点击进入对应玩法</span>
          </div>
          <button
            type="button"
            className={`switch ${form.hasPlay ? 'on' : ''}`}
            onClick={() => set({ hasPlay: !form.hasPlay })}
          >
            <span className="knob" />
          </button>
        </div>
        {form.hasPlay && (
          <div className="field conditional" data-prd="edit-play-config">
            <PlayCardConfig play={form.play} onChange={(play) => set({ play })} />
          </div>
        )}
      </section>

    </div>
  )
}
