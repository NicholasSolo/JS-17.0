"use strict";

import dropdownMenu from "./modules/dropDown_menu";
import showGiftPopup from "./modules/giftPopup";
import showBurgerMenu from "./modules/burgerMenu";
import smoothSlide from "./modules/smoothSlide";

//выпадающее меню
dropdownMenu();

//Подарок_попап
showGiftPopup();

//Burger-menu
showBurgerMenu();

//плавное перемещение по клику на пункты меню
smoothSlide();