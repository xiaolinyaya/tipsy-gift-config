// 库存礼物的免费获取途径。开启「支持库存」后，礼物可通过这些行为发放到用户背包，
// 用户送礼时从背包扣减，不消耗 Gems。
export const OBTAIN_WAYS = [
  { key: 'task', label: '任务奖励', desc: '完成成长/日常任务发放' },
  { key: 'checkin', label: '每日签到', desc: '连续签到奖励' },
  { key: 'event', label: '活动赠送', desc: '运营活动定向发放' },
  { key: 'lottery', label: '抽奖', desc: '转盘 / 扭蛋等抽奖产出' },
  { key: 'exchange', label: '积分兑换', desc: '用积分或碎片兑换' },
  { key: 'gift', label: '系统补偿', desc: '客服补发或系统赔付' },
]

export function obtainLabel(key) {
  return OBTAIN_WAYS.find((w) => w.key === key)?.label || key
}
