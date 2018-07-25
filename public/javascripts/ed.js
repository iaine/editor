'use strict';
  
var code = document.getElementById("code");
var cnvs = document.getElementById("visual");
var innerCode = ''
document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  if (event.keyCode != 13) {
      innerCode = innerCode + keyName;
      code.innerHTML = innerCode;
  } else {
    console.log(innerCode);
  }
});
