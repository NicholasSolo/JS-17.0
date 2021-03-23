const showBurgerMenu = () => {
    const openBurgerMenuBtn = document.querySelector(".menu-button img");
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

    const topPosition = popUpMenu.documentElement.offsetTop;
    console.log(topPosition);
}

export default showBurgerMenu;




// var objToStick = $("#objToStick"); //Получаем нужный объект
//     var topOfObjToStick = $(objToStick).offset().top; //Получаем начальное расположение нашего блока
    
//     $(window).scroll(function () {
//         var windowScroll = $(window).scrollTop(); //Получаем величину, показывающую на сколько прокручено окно
//         if (windowScroll > topOfObjToStick) { // Если прокрутили больше, чем расстояние до блока, то приклеиваем его
//             $(objToStick).addClass("topWindow");
//         } else {
//             $(objToStick).removeClass("topWindow");
//         };
//     });