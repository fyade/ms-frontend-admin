import { typeOf } from "@/utils/ObjectUtils.ts";

/**
 * v-no-more-click 禁止多次点击
 * disabled，若传true则本指令不执行
 * interval，冻结时长，单位秒
 */
const noMoreClick = {
  mounted: (el: any, binding: any) => {
    el.addEventListener('click', () => {
      if (typeOf(binding.value) === 'undefined' || typeOf(binding.value.disabled) === 'undefined' || binding.value.disabled === false) {
        const time = binding.value?.interval || 2
        let dom: any
        if (el.classList.contains('el-button')) dom = el.children[0]
        // 倒数
        if (dom) {
          const initialText = dom.innerText
          let count = time
          const func = () => {
            dom.innerText = `${initialText}(${count})`
            if (count <= 0) {
              dom.innerText = initialText
              clearInterval(timer2)
            }
            count--
          }
          func()
          const timer2 = setInterval(() => func(), 1000)
        }
        el.disabled = true
        el.classList.add('is-disabled')
        const timer = setTimeout(() => {
          el.disabled = false
          el.classList.remove('is-disabled')
          clearTimeout(timer)
        }, time * 1000)
      }
    })
  }
}

export default noMoreClick
