/**
 * 日期格式化
 * @param date
 * @param format
 */
export function formatDate(date: Date, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
  const pad: (n: number) => string = (n: number) => (n < 10 ? '0' + n : n.toString());
  return format.replace(/YYYY|MM(M)?|Do|DD|HH|hh|mm|ss|a|A/g, (match: string) => {
    switch (match) {
      case 'YYYY':
        return date.getFullYear().toString();
      case 'MMMM':
        return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
      case 'MM':
        return pad(date.getMonth() + 1).toString();
      case 'DD':
        return pad(date.getDate());
      case 'Do':
        return date.getDate().toString() + ordinal(date.getDate());
      case 'HH':
        return pad(date.getHours());
      case 'hh':
        return pad(date.getHours() % 12 || 12);
      case 'mm':
        return pad(date.getMinutes());
      case 'ss':
        return pad(date.getSeconds());
      case 'a':
        return date.getHours() < 12 ? 'am' : 'pm';
      case 'A':
        return date.getHours() < 12 ? 'AM' : 'PM';
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
