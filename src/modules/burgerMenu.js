const showBurgerMenu = () => {
    const openBurgerMenuBtn = document.querySelector(".menu-button");
    const popUpMenu = document.querySelector(".popup-menu");

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
}

export default showBurgerMenu;