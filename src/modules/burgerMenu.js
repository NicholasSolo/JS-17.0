const showBurgerMenu = () => {
    const openBurgerMenuBtn = document.querySelector(".menu-button img");
    const popUpMenu = document.querySelector(".popup-menu");
    const topMenu = document.querySelector(".top-menu")

    openBurgerMenuBtn.addEventListener("click", () => {
        popUpMenu.classList.add("animate__animated");
        popUpMenu.classList.add("animate__fadeIn");    
        popUpMenu.classList.add("animate__faster");    

        popUpMenu.style.display = "flex";
    })

    popUpMenu.addEventListener("click", (event) => {
        const target = event.target;

        if (target.matches(".close-menu-btn img") || target.matches(".popup-menu li a")) {
            popUpMenu.style.display = "none";
        }
    })

    window.addEventListener("scroll", () => {
        if(document.documentElement.clientWidth < 768) {
            if(document.documentElement.scrollTop > topMenu.offsetTop) {
                topMenu.classList.add("burger__fixed");
            } else {
                topMenu.classList.remove("burger__fixed");
            }                     
        } else {
            topMenu.classList.remove("burger__fixed");
        }
    });
}

export default showBurgerMenu;