const togglePopup = () => {
    const popUp = document.querySelector(".popup");

    document.querySelector(".service").addEventListener("click", (event) => {
        if (event.target.classList.contains("popup-btn")) {
            if (document.documentElement.clientWidth > 768) {
                popUp.style.display = "block";
                popUp.style.opacity = "0%";
                let counter = 0;
                const popupFadeIn = () => {
                    if (counter < 100) {
                        ++counter;
                        popUp.style.opacity = counter + "%";
                    } else {
                        clearInterval(timer);
                    }
                };
                const timer = setInterval(popupFadeIn, 7);
            } else {
                popUp.style.display = "block";
            }
        }
    });

    popUp.addEventListener("click", (event) => {
        let target = event.target;
        if (target.classList.contains("popup-close")) {
            popUp.style.display = "none";
        } else {
            target = target.closest(".popup-content");
            if (!target) {
                popUp.style.display = "none";
            }
        }
    });
};

export default togglePopup;