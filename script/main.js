"use strict";

window.addEventListener("DOMContentLoaded", () => {
    //Timer
    const countTimer = deadline => {
        const timerHours = document.getElementById("timer-hours");
        const timerMinutes = document.getElementById("timer-minutes");
        const timerSeconds = document.getElementById("timer-seconds");

        const getTimeRemaining = () => {
            const dateStop = new Date(deadline).getTime();
            const dateNow = new Date().getTime();
            const timeRemaining = (dateStop - dateNow) / 1000;
            const seconds = Math.floor(timeRemaining % 60);
            const minutes = Math.floor((timeRemaining / 60) % 60);
            const hours = Math.floor(timeRemaining / 60 / 60) % 24;

            return {
                timeRemaining,
                hours,
                minutes,
                seconds,
            };
        };
        const addZero = value => {
            if (value < 10) {
                value = "0" + value;
                return value;
            }
            return value;
        };

        const updateClock = () => {
            const timer = getTimeRemaining();

            if (timer.timeRemaining > 0) {
                timerHours.textContent = addZero(timer.hours);
                timerMinutes.textContent = addZero(timer.minutes);
                timerSeconds.textContent = addZero(timer.seconds);
            } else if (timer.timeRemaining < 0) {
                timerHours.textContent = "00";
                timerMinutes.textContent = "00";
                timerSeconds.textContent = "00";
            } else {
                clearInterval(idInterval);
            }
        };

        const idInterval = setInterval(updateClock, 1000);
    };

    countTimer("1 may 2021");

    //Menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector(".menu");
        const menu = document.querySelector("menu");
        const closeBtn = document.querySelector(".close-btn");
        const menuItems = menu.querySelectorAll("ul>li");

        const menuHandler = () => {
            menu.classList.toggle("active-menu");
        };
        btnMenu.addEventListener("click", menuHandler);
        closeBtn.addEventListener("click", menuHandler);
        menuItems.forEach(menuItem => {
            menuItem.addEventListener("click", menuHandler);
        });
    };
    toggleMenu();

    //Pop-up
    const togglePopup = () => {
        const popUp = document.querySelector(".popup");
        const popupBtns = document.querySelectorAll(".popup-btn");
        const popupCloseBtn = document.querySelector(".popup-close");

        popupBtns.forEach(button => {
            button.addEventListener("click", () => {
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
            });
        });
        popupCloseBtn.addEventListener("click", () => {
            popUp.style.display = "none";
        });
    };
    togglePopup();

    //Плавная прокрутка страницы при клике на элементы меню
    const smoothSlide = () => {
        const anchors = document.querySelectorAll('a[href*="#"]');

        for (const anchor of anchors) {
            anchor.addEventListener('click', event => {
                event.preventDefault();
                const blockID = anchor.getAttribute('href');
                document.querySelector(blockID).scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            });
        }
    };
    smoothSlide();
});






