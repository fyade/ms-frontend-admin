/**
 * @param format
 * @param ifUseUTC
 */
class FormatDateParam {
  format!: string
  ifUseUTC!: boolean

  constructor(
      {
        format = 'YYYY-MM-DD HH:mm:ss',
        ifUseUTC = false,
      }: {
        format?: string
        ifUseUTC?: boolean
      } = {}
  ) {
    this.format = format
    this.ifUseUTC = ifUseUTC
  }
}

/**
 * 日期格式化
 * @param date
 * @param param
 */
export function formatDate(date: Date, param?: string | FormatDateParam): string {
  const pad: (n: number) => string = (n: number) => (n < 10 ? '0' + n : n.toString());
  const fdp = param ? (typeof param === 'string' ? new FormatDateParam({format: param}) : new FormatDateParam(param)) : new FormatDateParam()
  const format = fdp.format
  const ifUseUTC = fdp.ifUseUTC;
  return format.replace(/YYYY|MMMM|MM|DD|Do|HH|hh|mm|ss|a|A/g, (match: string) => {
    const _year = ifUseUTC ? date.getUTCFullYear() : date.getFullYear()
    const _month = ifUseUTC ? (date.getUTCMonth() + 1) : (date.getMonth() + 1)
    const _date = ifUseUTC ? date.getUTCDate() : date.getDate()
    const _hour = ifUseUTC ? date.getUTCHours() : date.getHours()
    const _minute = ifUseUTC ? date.getUTCMinutes() : date.getMinutes()
    const _second = ifUseUTC ? date.getUTCSeconds() : date.getSeconds()
    switch (match) {
      case 'YYYY':
        return _year.toString();
      case 'MMMM':
        return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][_month - 1];
      case 'MM':
        return pad(_month).toString();
      case 'DD':
        return pad(_date);
      case 'Do':
        return ordinal(_date);
      case 'HH':
        return pad(_hour);
      case 'hh':
        return pad(_hour % 12 || 12);
      case 'mm':
        return pad(_minute);
      case 'ss':
        return pad(_second);
      case 'a':
        return _hour < 12 ? 'am' : 'pm';
      case 'A':
        return _hour < 12 ? 'AM' : 'PM';
      default:
        return match;
    }
  });
}

function ordinal(n: number): string {
  const s: string[] = ['th', 'st', 'nd', 'rd'];
  const v: number = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
