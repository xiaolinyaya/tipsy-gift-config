// 库存礼物的获取途径。开启「支持库存」后，礼物可通过这些行为发放到用户背包，
// 用户送礼时优先扣减库存，不消耗 Gems。目前仅这三种途径。
export const OBTAIN_WAYS = [
  {
    key: 'drop',
    label: '聊天掉落',
    desc: '用户每消耗 100 宝石触发一次抽奖，按概率掉落',
    configurable: true,
  },
  {
    key: 'checkin',
    label: '签到',
    desc: '特定时期签到领取，可配时间段、次数与每次数量',
    configurable: true,
  },
  {
    key: 'gempack',
    label: '宝石包购买',
    desc: '购买活动宝石包附赠，数量由宝石包决定',
    configurable: false,
  },
]

// 每消耗多少宝石触发一次掉落抽奖（当前掉落机制固定值）。
export const DROP_TRIGGER_GEMS = 100

export function obtainLabel(key) {
  return OBTAIN_WAYS.find((w) => w.key === key)?.label || key
}
