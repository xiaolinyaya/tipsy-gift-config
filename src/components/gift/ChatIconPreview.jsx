import './ChatIconPreview.css'

// 聊天室展示图预览：礼物在聊天室右下角作为入口图悬浮，点击进入送礼。
// 聊天室内同时只展示一个礼物，所以这里只画一个位。
export default function ChatIconPreview({ iconUrl, emoji }) {
  return (
    <div className="cip" data-prd="chat-icon-preview">
      <div className="cip-phone">
        <div className="cip-header">
          <span className="cip-avatar">{emoji || '🤖'}</span>
          <span className="cip-name">聊天室预览</span>
        </div>
        <div className="cip-body">
          <div className="cip-bubble left">在吗？给你准备了礼物 🎁</div>
          <div className="cip-bubble right">收到啦～</div>

          {/* 聊天室内的礼物入口位 */}
          <div className="cip-slot">
            {iconUrl ? (
              <img src={iconUrl} alt="聊天室展示图" className="cip-icon" />
            ) : (
              <span className="cip-icon-fallback">{emoji || '🎁'}</span>
            )}
          </div>
        </div>
        <div className="cip-inputbar">
          <span className="cip-input">说点什么…</span>
          <span className="cip-send">发送</span>
        </div>
      </div>
      <p className="cip-cap">聊天室范例 · 实际以线上渲染为准</p>
    </div>
  )
}
