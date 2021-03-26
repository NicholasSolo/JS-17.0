const freeVisit = () => {
    const registerFreeVisit = document.querySelector(".open-popup")
    const freeVisitModal = document.getElementById("free_visit_form");

    registerFreeVisit.addEventListener("click", () => {
        freeVisitModal.classList.add("popup_opened");
    })

    freeVisitModal.addEventListener("click", (event) =>  {
        let target = event.target;

        if (target.matches(".close-form img")) {
            freeVisitModal.classList.remove("popup_opened");
            if(freeVisitModal.querySelector("#personalDataAgreement")) {
                    freeVisitModal.querySelector("#personalDataAgreement").classList.remove("popup_opened");
                }
            freeVisitModal.querySelectorAll("input").forEach((item) => {
                item.value = '';
                if (item.type === "checkbox" && item.checked === true){
                    item.checked = false;
                }
            })
        } else {
            target = target.closest(".form-content");
            if (!target){
                freeVisitModal.classList.remove("popup_opened");
                if(freeVisitModal.querySelector("#personalDataAgreement")) {
                    freeVisitModal.querySelector("#personalDataAgreement").classList.remove("popup_opened");
                }
                freeVisitModal.querySelectorAll("input").forEach((item) => {
                item.value = '';
                if (item.type === "checkbox" && item.checked === true){
                    item.checked = false;
                }
            })
            }
        }
    });

};

export default freeVisit;