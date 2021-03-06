"use strict";

var head;
window.addEventListener(
  "load",
  function() {
    head = document.querySelector("#head");

    mainFunction();
  },
  false
);

async function mainFunction() {
  var i2cAccess = await navigator.requestI2CAccess();
  try {
    var port = i2cAccess.ports.get(1);
    var veml6070 = new VEML6070(port);
    await veml6070.init();
    while (1) {
      var value = await veml6070.read();
      // console.log('value2:', value);
      head.innerHTML = value;
      await sleep(200);
    }
  } catch (error) {
    console.error("error", error);
  }
}

function sleep(ms) {
  return new Promise(function(resolve) {
    setTimeout(resolve, ms);
  });
}
