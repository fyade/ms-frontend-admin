class TypeUnitConversion {
  scale?: number
  units?: string[]
  decimalDigits?: number
  addZero?: boolean
  showNuit?: boolean
  unitSpace?: string
}

/**
 * 单位换算
 * @param num
 * @param scale
 * @param units
 * @param decimalDigits
 * @param addZero
 * @param showNuit
 * @param unitSpace
 */
export function unitConversion(num: number, {
  scale = 1000,
  units = [],
  decimalDigits = 2,
  addZero = true,
  showNuit = true,
  unitSpace = ''
}: TypeUnitConversion = {}) {
  let ret = num, index = 0
  while (ret >= scale && index < units.length) {
    index++
    ret /= scale
  }
  const s = addZero ? ret.toFixed(decimalDigits) : Number(ret.toFixed(decimalDigits)).toString()
  return `${s}${showNuit ? (unitSpace + units[index]) : ''}`
}

export function unitConversion_storage(num: number, config?: TypeUnitConversion) {
  return unitConversion(num, {
    ...config,
    scale: 1024,
    units: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  })
}

/**
 * 百分比换算
 * @param num
 * @param decimalDigits
 */
export function percentConversion(num: number, {
  decimalDigits = 2,
}: {
  decimalDigits?: number
} = {}) {
  return `${(num * 100).toFixed(decimalDigits)}%`
}