// contentScript.js

chrome.storage.local.get(["crnList"], function(result) {
    if (result.crnList === undefined) return;

    if(location.href.indexOf("bwskfreg.P_AltPin") != -1 && result.crnList) {
        let crnInputs = document.querySelectorAll('.dataentrytable input[name="CRN_IN"]');
        
        for(let i = 0; i < result.crnList.length && i < crnInputs.length; i++) {
            crnInputs[i].value = result.crnList[i];
        }
    }
});