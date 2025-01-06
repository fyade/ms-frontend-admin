import { getScriptTagFromHtmlText } from "@/utils/RegularUtils.ts";
import { ifSameArray } from "@/utils/ObjectUtils.ts";
import { sleep } from "@/utils/baseUtils.ts";

async function main() {
  await sleep(3000)
  const oldHtml = document.documentElement.outerHTML
  const oldTag = getScriptTagFromHtmlText(oldHtml)
  const html = await fetch(`/?timestamp=${new Date().getTime()}`).then(res => res.text())
  const newTag = getScriptTagFromHtmlText(html)
  // todo 调试用，记得删
  console.log('旧版本：', oldTag, '新版本：', newTag)
  const ifNeedUpdate = !ifSameArray(oldTag, newTag)
  if (ifNeedUpdate) {
    const result = confirm('检测到新版本，请点击确定更新。')
    if (result) {
      location.reload()
    }
  }
}

main()
