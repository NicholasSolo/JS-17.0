const toggleMenu = () => {
    const menu = document.querySelector("menu");

    const menuHandler = () => {
        menu.classList.toggle("active-menu");
    };

    document.addEventListener("click", (event) => {
        const target = event.target;
        const allMenu = target == menu || menu.contains(target);
        const closeBtn = target == document.querySelector(".close-btn");
        const menuOpened = menu.classList.contains("active-menu");

        if (target.classList.contains("close-btn") || target.closest(".menu") || target.matches("menu>ul>li>a") || (!allMenu && !closeBtn && menuOpened)) {
            menuHandler();
        }
    });
};

export default toggleMenu;