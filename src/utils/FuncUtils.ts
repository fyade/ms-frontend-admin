export async function runBasedOnFirstAsyncFunction(arrays: Function[][]) {
  let runed = false
  for (const innerArray of arrays) {
    if (runed) {
      if (innerArray.length >= 3 && typeof innerArray[2] === 'function') {
        await innerArray[2]()
      }
    } else if (innerArray.length >= 2 && typeof innerArray[0] === 'function' && typeof innerArray[1] === 'function') {
      const firstResult = innerArray[0]();
      if (firstResult === true) {
        await innerArray[1]();
        runed = true
      } else if (innerArray.length >= 3 && typeof innerArray[2] === 'function') {
        await innerArray[2]()
      }
    }
  }
}

/**
 * 防抖
 * @param func
 * @param wait
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return function(...args: Parameters<T>) {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * 节流
 * @param func
 * @param limit
 */
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  return function(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
