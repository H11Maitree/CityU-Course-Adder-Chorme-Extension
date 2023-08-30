// contentScript.js
console.log("Hi from contentScript");

chrome.storage.local.get(["crnList"], function(result) {
    if (result.crnList === undefined) return;
    console.log(`CRN List: ${result.crnList}`);
    if(location.href.indexOf("bwskfreg.P_AltPin") != -1 && result.crnList) {
        let crnInputs = document.querySelectorAll('.dataentrytable input[name="CRN_IN"]');
        console.log(`crnInputs: ${crnInputs}`);
        for(let i = 0; i < result.crnList.length && i < crnInputs.length; i++) {
            console.log(`Pasting IN: ${result.crnList[i]}`);
            crnInputs[i].value = result.crnList[i];
        }
    }
});