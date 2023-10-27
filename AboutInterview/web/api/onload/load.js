
for (let i = 0; i < 1000000000; i++){
  // document.querySelector('#text').innerHTML = i
};
// 这段同步脚本将会延迟 DOM 解析，
// 所以 DOMContentLoaded 事件将会延迟执行。
