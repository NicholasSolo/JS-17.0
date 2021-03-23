const callbackModal = () => {
    const callbackBtn = document.querySelector(".callback-btn");
    const callbackForm = document.getElementById("callback_form");

    callbackBtn.addEventListener("click", () => {
        callbackForm.style.display = "block";
    })

    callbackForm.addEventListener("click", (event) =>  {
        let target = event.target;

        if (target.matches(".close-form img")) {
            callbackForm.style.display = "none";
        } else {
            target = target.closest(".form-content");
            if (!target){
                callbackForm.style.display = "none";
            }
        }
    });
}

export default callbackModal;