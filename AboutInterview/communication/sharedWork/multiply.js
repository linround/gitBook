const first = document.querySelector("#number1");
const second = document.querySelector("#number2");

const result1 = document.querySelector(".result1");

if (!!window.SharedWorker) {
  const myWorker = new SharedWorker("worker.js");

  first.onchange = function () {
    myWorker.port.postMessage({name:'A',value:'AValue'+first.value});
    console.log("Message posted to worker");
  };

  second.onchange = function () {
    myWorker.port.postMessage({name:'A',value:'AValue'+second.value});
    console.log("Message posted to worker");
  };

  myWorker.port.onmessage = function (e) {
    result1.textContent = e.data.value;
    console.log(e)
    console.log("Message received from worker",e.data);
    console.log(e.lastEventId);
  };
}
