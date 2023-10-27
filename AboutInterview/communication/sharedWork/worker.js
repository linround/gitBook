let a = {}
let b = {}
onconnect = function (event) {
  const port = event.ports[0];


  port.onmessage = function (e) {
    const workerResult = e.data;
    // 如果接收的是 A 页面的输入
    if(workerResult.name ==='A'){
      // 将值付给a
      a = workerResult
      // 将B传输出去
      port.postMessage(b);
    }
    if(workerResult.name ==='B'){
      b = workerResult
      port.postMessage(a);
    }
  };
};
