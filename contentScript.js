// contentScript.js

chrome.storage.local.get(["crnList"], function(result) {
    if (result.crnList === undefined || result.crnList.length == 0) return;

    if(location.href.indexOf("classRegistration") != -1 && result.crnList) {
        const crns = document.querySelector("#crns");
        const addCRNbutton = document.querySelector("#addCRNbutton");
        crns.innerHTML = "";

        for(let i = 0; i < result.crnList.length; i++) {
            const newInput = document.createElement("input");
            newInput.value = result.crnList[i];
            crns.appendChild(newInput);
        }
        addCRNbutton.click();

    }
});
