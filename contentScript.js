// contentScript.js

chrome.storage.local.get(["crnList"], function(result) {
    if (result.crnList === undefined || result.crnList.length == 0) return;

    if(location.href.indexOf("classRegistration") != -1 && result.crnList) {
        const addAnotherCRN = document.querySelector("#addAnotherCRN");
        for (let i = 0; i<result.crnList.length-5;i++){
            addAnotherCRN.click();
        }
        const crnInputs = document.querySelectorAll("#crns input[type='text']");
        const addCRNbutton = document.querySelector("#addCRNbutton");

        for(let i = 0; i < result.crnList.length; i++) {
            crnInputs[i].value = result.crnList[i];
        }
        addCRNbutton.click();

    }
});
