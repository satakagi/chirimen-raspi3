"use strict";

window.addEventListener(
  "load",
  function() {
    mainFunction();
  },
  false
);

async function mainFunction() {
  var i2cAccess = await navigator.requestI2CAccess();
  try {
    var port = i2cAccess.ports.get(1);
    var touchSensor = new GroveTouch(port, 0x5a);
    await touchSensor.init();
    while (1) {
      var ch = await touchSensor.read();
      // console.log(ch);
      document.getElementById("debug").innerHTML = JSON.stringify(ch);
      await sleep(100);
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
