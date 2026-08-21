import { OBTAIN_WAYS } from '../../data/obtainWays'
import './StockConfig.css'

// 库存配置：礼物支持攒在用户背包里时，配置免费获取途径、有效期与持有上限。
// 后台不设「库存总量」——发放数量由各获取途径（任务/活动/抽奖）自己控制。
export default function StockConfig({
  ways,
  expireDays,
  maxHold,
  onWaysChange,
  onExpireChange,
  onMaxHoldChange,
}) {
  function toggleWay(key) {
    onWaysChange(ways.includes(key) ? ways.filter((w) => w !== key) : [...ways, key])
  }

  return (
    <div className="field conditional" data-prd="edit-stock-config">
      <label className="field-label">免费获取途径</label>
      <p className="stk-note">勾选该礼物可以通过哪些行为免费发放到用户背包。发放数量由对应途径自行配置。</p>
      <div className="stock-ways">
        {OBTAIN_WAYS.map((w) => (
          <button
            key={w.key}
            type="button"
            className={`stock-way ${ways.includes(w.key) ? 'active' : ''}`}
            data-prd={`stock-way-${w.key}`}
            onClick={() => toggleWay(w.key)}
          >
            <span className="stock-way-check">{ways.includes(w.key) ? '✓' : ''}</span>
            <span className="stock-way-body">
              <span className="stock-way-name">{w.label}</span>
              <span className="stock-way-desc">{w.desc}</span>
            </span>
          </button>
        ))}
      </div>
      {!ways.length && (
        <p className="stock-warn">未选择任何获取途径，用户无法获得该礼物的库存。</p>
      )}

      <div className="field-row" style={{ marginTop: 16 }}>
        <div className="field" data-prd="edit-stock-expire">
          <label className="sub-label">库存有效期（天）</label>
          <input
            className="text-input"
            type="number"
            min="0"
            value={expireDays}
            onChange={(e) => onExpireChange(Number(e.target.value))}
          />
          <p className="spec-fallback">
            {expireDays > 0 ? `获得后 ${expireDays} 天未使用自动过期。` : '填 0 表示永久有效，不过期。'}
          </p>
        </div>

        <div className="field" data-prd="edit-stock-maxhold">
          <label className="sub-label">单用户持有上限</label>
          <input
            className="text-input"
            type="number"
            min="0"
            value={maxHold}
            onChange={(e) => onMaxHoldChange(Number(e.target.value))}
          />
          <p className="spec-fallback">
            {maxHold > 0 ? `背包最多存 ${maxHold} 个，超出不再发放。` : '填 0 表示不限持有数量。'}
          </p>
        </div>
      </div>

      <div className="stock-rule">
        <span className="stock-rule-title">送礼扣减规则</span>
        <span className="stock-rule-body">
          背包有库存时优先扣库存（不花 Gems）；库存为 0 时走正常付费购买。
        </span>
      </div>
    </div>
  )
}
