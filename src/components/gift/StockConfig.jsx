import { OBTAIN_WAYS, DROP_TRIGGER_GEMS } from '../../data/obtainWays'
import './StockConfig.css'

// 库存配置：礼物支持攒在用户背包时，配置免费获取途径 + 各途径的发放参数，
// 以及库存有效期与持有上限。宝石包购买的赠送数量由宝石包本身决定，后台不配。
export default function StockConfig({
  ways,
  drop,
  checkin,
  expireDays,
  maxHold,
  onWaysChange,
  onDropChange,
  onCheckinChange,
  onExpireChange,
  onMaxHoldChange,
}) {
  function toggleWay(key) {
    onWaysChange(ways.includes(key) ? ways.filter((w) => w !== key) : [...ways, key])
  }

  return (
    <div className="field conditional" data-prd="edit-stock-config">
      <label className="field-label">免费获取途径</label>
      <p className="stk-note">勾选该礼物可以通过哪些行为免费发放到用户背包，勾选后配置对应发放参数。</p>

      <div className="stock-ways">
        {OBTAIN_WAYS.map((w) => {
          const on = ways.includes(w.key)
          return (
            <div className="stock-way-wrap" key={w.key}>
              <button
                type="button"
                className={`stock-way ${on ? 'active' : ''}`}
                data-prd={`stock-way-${w.key}`}
                onClick={() => toggleWay(w.key)}
              >
                <span className="stock-way-check">{on ? '✓' : ''}</span>
                <span className="stock-way-body">
                  <span className="stock-way-name">
                    {w.label}
                    {!w.configurable && <span className="stock-way-tag">无需配置</span>}
                  </span>
                  <span className="stock-way-desc">{w.desc}</span>
                </span>
              </button>

              {on && w.key === 'drop' && (
                <DropConfig drop={drop} onChange={onDropChange} />
              )}
              {on && w.key === 'checkin' && (
                <CheckinConfig checkin={checkin} onChange={onCheckinChange} />
              )}
              {on && w.key === 'gempack' && (
                <div className="way-config" data-prd="stock-gempack-config">
                  <p className="way-config-note">
                    赠送数量由活动宝石包配置决定，后台在此不可调整。需要改数量请到宝石包配置页。
                  </p>
                </div>
              )}
            </div>
          )
        })}
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

// 聊天掉落：用户每消耗 100 宝石触发一次抽奖，这里配该礼物在抽奖池里的中奖概率与单次数量。
function DropConfig({ drop, onChange }) {
  const rate = drop?.rate ?? 0
  const amount = drop?.amount ?? 1
  const set = (patch) => onChange({ rate, amount, ...patch })
  // 每消耗多少宝石期望掉一个：100 / 概率。
  const expectGems = rate > 0 ? Math.round((DROP_TRIGGER_GEMS / rate) * 100) : null

  return (
    <div className="way-config" data-prd="stock-drop-config">
      <p className="way-config-note">
        当前掉落机制：用户每消耗 {DROP_TRIGGER_GEMS} 宝石触发一次抽奖，按下方概率决定是否掉落该礼物。
      </p>
      <div className="way-config-row">
        <div className="way-field">
          <label className="sub-label">掉落概率（%）</label>
          <input
            className="text-input"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={rate}
            onChange={(e) => set({ rate: Number(e.target.value) })}
          />
        </div>
        <div className="way-field">
          <label className="sub-label">单次掉落数量</label>
          <input
            className="text-input"
            type="number"
            min="1"
            value={amount}
            onChange={(e) => set({ amount: Number(e.target.value) })}
          />
        </div>
      </div>
      {rate > 0 ? (
        <p className="way-config-calc">
          按此概率，用户平均每消耗约 {expectGems.toLocaleString()} 宝石掉落 1 次（{amount} 个）。
        </p>
      ) : (
        <p className="way-config-warn">概率为 0，该礼物不会通过聊天掉落产出。</p>
      )}
    </div>
  )
}

// 签到：目前只有活动期间第一次签到可领取，所以次数与每次数量都要能配。
function CheckinConfig({ checkin, onChange }) {
  const times = checkin?.times ?? 1
  const amount = checkin?.amount ?? 1
  const set = (patch) => onChange({ times, amount, ...patch })

  return (
    <div className="way-config" data-prd="stock-checkin-config">
      <p className="way-config-note">
        活动期间签到发放。当前机制为活动内第一次签到即可领取，可领取次数默认 1 次。
      </p>
      <div className="way-config-row">
        <div className="way-field">
          <label className="sub-label">可领取次数</label>
          <input
            className="text-input"
            type="number"
            min="0"
            value={times}
            onChange={(e) => set({ times: Number(e.target.value) })}
          />
        </div>
        <div className="way-field">
          <label className="sub-label">每次领取数量</label>
          <input
            className="text-input"
            type="number"
            min="1"
            value={amount}
            onChange={(e) => set({ amount: Number(e.target.value) })}
          />
        </div>
      </div>
      {times > 0 ? (
        <p className="way-config-calc">
          单用户整个活动期最多通过签到获得 {times * amount} 个。
        </p>
      ) : (
        <p className="way-config-warn">可领取次数为 0，签到不会发放该礼物。</p>
      )}
    </div>
  )
}
