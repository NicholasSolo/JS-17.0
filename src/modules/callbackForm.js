const callbackModal = () => {
    const callbackBtn = document.querySelector(".callback-btn");
    const callbackForm = document.getElementById("callback_form");
    
    callbackBtn.addEventListener("click", () => {
        callbackForm.classList.add("popup_opened");
    })

    callbackForm.addEventListener("click", (event) =>  {
        let target = event.target;

        if (target.matches(".close-form img")) {
            callbackForm.classList.remove("popup_opened");
            if(callbackForm.querySelector("#personalDataAgreement")) {
                callbackForm.querySelector("#personalDataAgreement").classList.remove("popup_opened");
            }
            callbackForm.querySelectorAll("input").forEach((item) => {
                item.value = '';
                if (item.type === "checkbox" && item.checked === true){
                    item.checked = false;
                }
            })
        } else {
            target = target.closest(".form-content");
            if (!target){
                callbackForm.classList.remove("popup_opened");
                if(callbackForm.querySelector("#personalDataAgreement")) {
                    callbackForm.querySelector("#personalDataAgreement").classList.remove("popup_opened");
                }
                callbackForm.querySelectorAll("input").forEach((item) => {
                    item.value = '';
                    if (item.type === "checkbox" && item.checked === true){
                        item.checked = false;
                    }
                })
            }
        }
    });
}

export default callbackModal;