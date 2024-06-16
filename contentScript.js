// contentScript.js

chrome.storage.local.get(["crnList"], function(result) {
    if (result.crnList === undefined) return;

    if(location.href.indexOf("classRegistration") != -1 && result.crnList) {
        let crnInputs = document.querySelectorAll("#crns input[type='text']");
        
        for(let i = 0; i < result.crnList.length && i < crnInputs.length; i++) {
            crnInputs[i].value = result.crnList[i];
        }
    }
});