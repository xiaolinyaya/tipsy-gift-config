import './TopBar.css'

export default function TopBar({ lang, onLangChange }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="topbar-menu" aria-label="菜单">
          <span />
          <span />
          <span />
        </button>
        <span className="topbar-title">Tipsy 管理后台</span>
      </div>
      <div className="topbar-right">
        <div className="lang-toggle">
          <button
            className={lang === 'en' ? 'active' : ''}
            onClick={() => onLangChange('en')}
          >
            EN
          </button>
          <button
            className={lang === 'zh' ? 'active' : ''}
            onClick={() => onLangChange('zh')}
          >
            中文
          </button>
        </div>
        <button className="topbar-logout">退出登录</button>
      </div>
    </header>
  )
}
