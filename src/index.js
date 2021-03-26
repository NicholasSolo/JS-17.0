"use strict";

import dropdownMenu from "./modules/dropDown_menu";
import showGiftPopup from "./modules/giftPopup";
import showBurgerMenu from "./modules/burgerMenu";
import smoothSlide from "./modules/smoothSlide";
import showArrow from "./modules/showGotoTopArrow";
import freeVisit from "./modules/freeVisitForm";
import callbackModal from "./modules/callbackForm";
import calculator from "./modules/calculator";
import sendForm from "./modules/sendForm";
import validateForm from "./modules/formValidation";
import mainSlider from "./modules/mainSlider";
import gallerySlider from "./modules/gallerySlider"
import servicesCarousel from "./modules/servicesCarousel";
//выпадающее меню
dropdownMenu();

//Подарок_попап
showGiftPopup();

//Burger-menu
showBurgerMenu();

//плавное перемещение по клику на пункты меню
smoothSlide();

//появление стрелки
showArrow()

//бесплатный визит
freeVisit();

//перезвоните мне
callbackModal();

//calculator
calculator();

//отправка формы
sendForm();

//валидация ввода
validateForm();

//главный слайдер
mainSlider();

//слайдер галереи
gallerySlider();

//карусель
servicesCarousel();
