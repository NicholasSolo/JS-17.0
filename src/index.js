"use strict";

import countTimer from "./modules/countTimer";
import toggleMenu from "./modules/toggleMenu";
import togglePopup from "./modules/togglePopup";
import smoothSlide from "./modules/smoothSlide";
import tabs from "./modules/tabs";
import slider from "./modules/slider";
import switchPhoto from "./modules/switchPhoto";
import formValidation from "./modules/formValidation";
import calculator from "./modules/calculator";
import sendForm from "./modules/sendForm";
import carousel from "./modules/trustedCarousel";


//Timer
countTimer("29 march 2021");

//Menu
toggleMenu();

//Pop-up
togglePopup();

//Плавная прокрутка страницы при клике на элементы меню
smoothSlide();

//Табы
tabs();

//slider
slider();

//Переключение фото при наведении
switchPhoto();

// Валидация форм
formValidation();

//Калькулятор
calculator(100);

//Отправка AJAX-формы на сервер
sendForm();

//Карусель "Нам доверяют"
carousel.init();