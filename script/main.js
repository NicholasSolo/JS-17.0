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

    countTimer("27 march 2021");

    //Menu
    const toggleMenu = () => {
        const menu = document.querySelector("menu");

        const menuHandler = () => {
            menu.classList.toggle("active-menu");
        };

        document.addEventListener("click", event => {
            const target = event.target;
            const allMenu = target == menu || menu.contains(target);
            const closeBtn = target == document.querySelector(".close-btn");
            const menuOpened = menu.classList.contains("active-menu");

            if (target.classList.contains("close-btn") || target.closest(".menu") || target.matches("menu>ul>li>a") || (!allMenu && !closeBtn && menuOpened)) {
                menuHandler();
            }
        });
    };
    toggleMenu();

    //Pop-up
    const togglePopup = () => {
        const popUp = document.querySelector(".popup");

        document.querySelector(".service").addEventListener("click", event => {
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

        popUp.addEventListener("click", event => {
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
    togglePopup();

    //Плавная прокрутка страницы при клике на элементы меню
    const smoothSlide = () => {
        const anchors = document.querySelectorAll(
            'menu a[href*="#"], a[href="#service-block"]'
        );
        for (const anchor of anchors) {
            if (!anchor.classList.contains("close-btn")) {
                anchor.addEventListener("click", event => {
                    event.preventDefault();
                    const blockID = anchor.getAttribute("href");
                    document.querySelector(blockID).scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                });
            }
        }
    };
    smoothSlide();

    //Табы
    const tabs = () => {
        const tabHeader = document.querySelector(".service-header");
        const tabs = tabHeader.querySelectorAll(".service-header-tab");
        const tabContent = document.querySelectorAll(".service-tab");

        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tabs[i].classList.add("active");
                    tabContent[i].classList.remove("d-none");
                } else {
                    tabs[i].classList.remove("active");
                    tabContent[i].classList.add("d-none");
                }
            }
        };
        tabHeader.addEventListener("click", event => {
            const target = event.target.closest(".service-header-tab");

            if (target.classList.contains("service-header-tab")) {
                tabs.forEach((item, index) => {
                    if (item === target) {
                        toggleTabContent(index);
                    }
                });
                return;
            }
        });
    };
    tabs();

    //slider
    const slider = () => {
        const slider = document.querySelector(".portfolio-content");
        const slides = document.querySelectorAll(".portfolio-item");
        const dots = [];
        let currentSlide = 0;
        let interval;

        const addDots = () => {
            const dotsContainer = document.querySelector(".portfolio-dots");
            for (let i = 0; i < slides.length; i++) {
                const dot = document.createElement("li");
                dot.classList.add("dot");
                if (i === 0) {
                    dot.classList.add("dot-active");
                }
                dots.push(dot);
                dotsContainer.appendChild(dot);
            }
        };
        addDots();

        const prevSlide = (element, index, strClass) => {
            element[index].classList.remove(strClass);
        };
        const nextSlide = (element, index, strClass) => {
            element[index].classList.add(strClass);
        };

        const autoPlay = () => {
            prevSlide(slides, currentSlide, "portfolio-item-active");
            prevSlide(dots, currentSlide, "dot-active");
            currentSlide++;
            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }
            nextSlide(slides, currentSlide, "portfolio-item-active");
            nextSlide(dots, currentSlide, "dot-active");
        };
        const startSlide = (time = 2000) => {
            interval = setInterval(autoPlay, time);
        };
        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener("click", event => {
            event.preventDefault();
            const target = event.target;

            if (!target.matches(".portfolio-btn, .dot")) {
                return;
            }

            prevSlide(slides, currentSlide, "portfolio-item-active");
            prevSlide(dots, currentSlide, "dot-active");

            if (target.matches("#arrow-right")) {
                currentSlide++;
            } else if (target.matches("#arrow-left")) {
                currentSlide--;
            } else if (target.matches(".dot")) {
                dots.forEach((element, index) => {
                    if (element === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }
            if (currentSlide < 0) {
                currentSlide = slides.length - 1;
            }
            nextSlide(slides, currentSlide, "portfolio-item-active");
            nextSlide(dots, currentSlide, "dot-active");
        });

        slider.addEventListener("mouseover", event => {
            if (
                event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
            ) {
                stopSlide();
            }
        });

        slider.addEventListener("mouseout", event => {
            if (
                event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
            ) {
                startSlide(5000);
            }
        });

        startSlide(5000);
    };
    slider();

    //Переключение фото при наведении
    const switchPhoto = () => {
        const team = document.querySelector(".command");
        let source = "";
        let dataAttr = "";
        team.addEventListener("mouseover", event => {
            if (!event.target.matches(".command__photo")) {
                return;
            }
            source = event.target.src;
            dataAttr = event.target.dataset.img;
            event.target.src = event.target.dataset.img;
        });
        team.addEventListener("mouseout", event => {
            if (!event.target.matches(".command__photo")) {
                return;
            }
            event.target.src = source;
            event.target.dataset.img = dataAttr;
        });
    };
    switchPhoto();
    // Валидация форм
    const formValidation = () => {
        const calcInputs = document.querySelectorAll(".calc-item");
        const phoneInputs = document.querySelectorAll(".form-phone");
        const emailInputs = document.querySelectorAll(".form-email");
        const name = document.querySelectorAll("input[name='user_name']");
        const message = document.querySelector('.mess');

        calcInputs.forEach((item, index) => {
            item.addEventListener('input', () => {
                if (index === 0) {
                    return;
                }
                item.value = item.value.replace(/[^\d]/g, '');
            });
        });

        phoneInputs.forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/[^+\d-()]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '');
                if (item.value.length > 16) {
                    item.value = item.value.slice(0, 15);
                }
            });
        });
        emailInputs.forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/[^a-z@\-_.!~*']/gi, '').replace(/-+/g, '-').replace(/^-|-$/g, '');
            });
        });
        message.addEventListener('input', () => {
            message.value = message.value.replace(/[^-а-я\s0-9.,?!]/gi, '').replace(/-+/g, '-');
        });
        name.forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/[^а-я\s]/gi, '').replace(/\s+/g, " ");
            });
        });


    };
    formValidation();

    //Калькулятор
    const calculator = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block');
        const totalValue = document.getElementById('total');
        const apartmentType = document.querySelector('.calc-type');
        const daysToComplete = document.querySelector('.calc-day');
        const roomsNum = document.querySelector('.calc-count');
        const totalSquare = document.querySelector('.calc-square');

        const wowNum = num => {
            const time = 1000;
            const step = num * 0.1;
            let count = 0;
            const int = Math.round(time / (num / step));
            if (num === 0) return;
            const interval = setInterval(() => {
                count += step;
                if (count === num) {
                    clearInterval(interval);
                }
                totalValue.textContent = count;
            }, int);
        };

        const countSum = callback => {
            let total = 0;
            let countValue = 1;
            let dayValue = 1;
            const typeValue = apartmentType.value;
            const squareValue = +totalSquare.value;

            if (roomsNum.value > 1) {
                countValue += (roomsNum.value - 1) / 10;
            }

            if (daysToComplete.value && daysToComplete.value < 5) {
                dayValue *= 2;
            } else if (daysToComplete.value && daysToComplete.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue !== 0) {
                total = Math.round(price * typeValue * squareValue * countValue * dayValue);
            }

            callback(total);
        };

        calcBlock.addEventListener('change', event => {
            const target = event.target;
            if (target === apartmentType || target === daysToComplete ||
             target === roomsNum || target === totalSquare) {
                countSum(wowNum);
            }
        });
    };
    calculator(100);

    //Отправка AJAX-формы на сервер
    const sendForm = () => {
        const errorMessage = 'Что-то пошло не так...';
        const successMessage = 'Спасибо! Мы скоро с Вами свяжемся.';
        const preloader = document.querySelector('.preloader');

        const form = document.getElementById('form1');
        const popupForm = document.getElementById('form3');
        const footerForm = document.getElementById('form2');

        const userMessage = document.createElement('div');
        userMessage.style.cssText = 'font-size: 2rem';

        form.addEventListener('submit', event => {
            event.preventDefault();
            form.append(userMessage);
            userMessage.append(preloader);
            preloader.style.display = 'block';

            const formData = new FormData(form);  // объект считывает данные со всех инпутов в форме, что имеют атрибут name и записывает в переменную
            const body = {};
            for (const value of formData.entries()) {
                body[value[0]] = value[1];
            }
            postData(body, () => {
                userMessage.textContent = successMessage;
                setTimeout(() => {
                    userMessage.textContent = '';
                }, 5000);
            }, error => {
                userMessage.textContent = errorMessage;
                console.log(error);
                setTimeout(() => {
                    userMessage.textContent = '';
                }, 5000);
            });
            form.querySelectorAll('input').forEach(item => {
                item.value = '';
            });
        });

        popupForm.addEventListener('submit', event => {
            event.preventDefault();
            popupForm.append(userMessage);
            preloader.style.display = 'block';
            userMessage.append(preloader);

            const formData = new FormData(popupForm);
            const body = {};
            for (const value of formData.entries()) {
                body[value[0]] = value[1];
            }
            postData(body, () => {
                userMessage.style.color = 'white';
                userMessage.textContent = successMessage;
                setTimeout(() => {
                    userMessage.textContent = '';
                }, 5000);
            }, error => {
                userMessage.textContent = errorMessage;
                console.log(error);
                setTimeout(() => {
                    userMessage.textContent = '';
                }, 5000);
            });
            popupForm.querySelectorAll('input').forEach(item => {
                item.value = '';
            });
        });

        footerForm.addEventListener('submit', event => {
            event.preventDefault();
            footerForm.append(userMessage);
            preloader.style.display = 'block';
            userMessage.append(preloader);

            const formData = new FormData(footerForm);
            const body = {};
            for (const value of formData.entries()) {
                body[value[0]] = value[1];
            }
            postData(body, () => {
                userMessage.textContent = successMessage;
                setTimeout(() => {
                    userMessage.textContent = '';
                }, 5000);
            }, error => {
                userMessage.textContent = errorMessage;
                console.log(error);
                setTimeout(() => {
                    userMessage.textContent = '';
                }, 5000);
            });
            footerForm.querySelectorAll('input').forEach(item => {
                item.value = '';
            });
        });

        const postData = (body, outputData, errorData) => {
            const request = new XMLHttpRequest();
            request.addEventListener("readystatechange", () => {
                if (request.readyState !== 4) {
                    return;
                }
                if (request.status === 200) {
                    outputData();
                } else {
                    errorData(request.status);
                }
            });

            request.open('POST', './server.php');
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(body));
        };
    };
    sendForm();
});
