import { getScriptTagFromHtmlText } from "@/utils/RegularUtils.ts";
import { ifSameArray } from "@/utils/ObjectUtils.ts";

async function main() {
  const oldHtml = document.documentElement.outerHTML
  const oldTag = getScriptTagFromHtmlText(oldHtml)
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
