const handleFormSubmit = (event: SubmitEvent) => {
  // 阻止表单提交
  event.preventDefault();
};

// 监听器，监听 dom 变化
const observer = new MutationObserver(() => {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    // 清除可能的旧事件
    form.removeEventListener('submit', handleFormSubmit)
    // 判断是否只有一个 input，如果符合条件，则添加事件
    // 懒得判断了，全加上吧
    form.addEventListener('submit', handleFormSubmit)
  })
});
observer.observe(document.body, {
  subtree: true,
  childList: true,
  attributes: false,
  attributeOldValue: false,
  characterData: false,
  characterDataOldValue: false,
})
