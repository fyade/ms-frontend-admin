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