const freeVisit = () => {
    const registerFreeVisit = document.querySelector(".open-popup")
    const freeVisitModal = document.getElementById("free_visit_form");

    registerFreeVisit.addEventListener("click", () => {
        freeVisitModal.style.display = "block";
    })

    freeVisitModal.addEventListener("click", (event) =>  {
        let target = event.target;

        if (target.matches(".close-form img")) {
            freeVisitModal.style.display = "none";
        } else {
            target = target.closest(".form-content");
            if (!target){
                freeVisitModal.style.display = "none";
            }
        }
    });

};

export default freeVisit;