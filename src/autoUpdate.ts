import { getScriptTagFromHtmlText } from "@/utils/RegularUtils.ts";
import { ifSameArray } from "@/utils/ObjectUtils.ts";
import { sleep } from "@/utils/baseUtils.ts";

async function main() {
  await sleep(3000)
  const oldHtml = document.documentElement.outerHTML
  const oldTag_ = getScriptTagFromHtmlText(oldHtml)
  // 去除一些干扰项
  const oldTag = oldTag_.filter(str => {
    // Chrome 浏览器
    if (str.startsWith('chrome-extension://')) {
      return false
    }
    return true
  })
  const html = await fetch(`/?timestamp=${new Date().getTime()}`).then(res => res.text())
  const newTag = getScriptTagFromHtmlText(html)
  const ifNeedUpdate = !ifSameArray(oldTag, newTag)
  if (ifNeedUpdate) {
    const result = confirm('检测到新版本，请点击确定更新。')
    if (result) {
      location.reload()
    }
  }
}

main()
