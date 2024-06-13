// contentScript.js

chrome.storage.local.get(["crnList"], function(result) {
    if (result.crnList === undefined || result.crnList.length == 0) return;

    if(location.href.indexOf("classRegistration") != -1 && result.crnList) {
        const crns = document.querySelector("#crns");
        const addCRNbutton = document.querySelector("#addCRNbutton");
        crns.innerHTML = "";

        for(let i = 0; i < result.crnList.length; i++) {
            const newDiv = document.createElement("div");

            const newInput = document.createElement("input");
            newInput.setAttribute("id",`txt_crn${i+1}`);
            newInput.setAttribute("maxlength",`5`);
            newInput.setAttribute("type",`text`);
            newInput.setAttribute("class","ui-textbox-input ui-widget-content");
            newInput.value = result.crnList[i];

            const newLabel = document.createElement("label");
            newLabel.setAttribute("for",`txt_crn${i+1}`);
            newLabel.setAttribute("class","crn_label");
            newLabel.textContent = "CRN";

            newDiv.appendChild(newLabel);
            newDiv.appendChild(newInput);
            crns.appendChild(newDiv);
        }
        addCRNbutton.click();

    }
});
