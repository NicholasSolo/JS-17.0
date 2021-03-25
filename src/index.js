"use strict";

import dropdownMenu from "./modules/dropDown_menu";
import showGiftPopup from "./modules/giftPopup";
import showBurgerMenu from "./modules/burgerMenu";
import smoothSlide from "./modules/smoothSlide";
import showArrow from "./modules/showGotoTopArrow";
import freeVisit from "./modules/freeVisitForm";
import callbackModal from "./modules/callbackForm";
import calculator from "./modules/calculator";

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

