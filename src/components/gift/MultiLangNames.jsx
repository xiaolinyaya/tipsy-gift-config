import { useState } from 'react'
import { LANGUAGES, SOURCE_LANG } from '../../data/languages'
import { autoTranslate, isPlaceholder } from '../../data/autoTranslate'
import './MultiLangNames.css'

// English (source) name + a collapsible panel of 26 target-language names.
// Auto-translate fills every target; each can be previewed and hand-edited.
export default function MultiLangNames({ nameEn, names, onNameEnChange, onNamesChange }) {
  const [open, setOpen] = useState(false)
  const [translating, setTranslating] = useState(false)

  const targets = LANGUAGES.filter((l) => l.code !== SOURCE_LANG)
  const filled = targets.filter((l) => (names[l.code] || '').trim() && !isPlaceholder(names[l.code])).length

  async function handleTranslate() {
    if (!nameEn.trim()) return
    setTranslating(true)
    const result = await autoTranslate(nameEn)
    onNamesChange(result)
    setTranslating(false)
    setOpen(true)
  }

  return (
    <div className="mln">
      <label className="field-label">英文名</label>
      <div className="mln-source-row">
        <input
          className="mln-source-input"
          value={nameEn}
          placeholder="e.g. Heart"
          onChange={(e) => onNameEnChange(e.target.value)}
        />
        <button
          type="button"
          className="btn-translate"
          disabled={!nameEn.trim() || translating}
          onClick={handleTranslate}
        >
          {translating ? '翻译中…' : '🌐 自动翻译到 26 种语言'}
        </button>
      </div>

      <button type="button" className="mln-toggle" onClick={() => setOpen((v) => !v)}>
        {open ? '▾' : '▸'} 多语言名称
        <span className="mln-progress">{filled}/{targets.length} 已翻译</span>
      </button>

      {open && (
        <div className="mln-grid">
          {targets.map((l) => {
            const val = names[l.code] || ''
            const placeholder = isPlaceholder(val)
            return (
              <div className="mln-item" key={l.code}>
                <span className="mln-lang">
                  <span className="mln-flag">{l.flag}</span>
                  <span className="mln-lang-name">{l.native}</span>
                  <span className="mln-lang-code">{l.code}</span>
                </span>
                <input
                  className={`mln-input ${placeholder ? 'placeholder' : ''} ${l.rtl ? 'rtl' : ''}`}
                  dir={l.rtl ? 'rtl' : 'ltr'}
                  value={placeholder ? '' : val}
                  placeholder={placeholder ? `未翻译 · 点「自动翻译」或手填` : l.name}
                  onChange={(e) => onNamesChange({ ...names, [l.code]: e.target.value })}
                />
                {placeholder && <span className="mln-warn" title="机器占位，待确认">待确认</span>}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
