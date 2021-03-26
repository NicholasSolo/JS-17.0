const mainSlider = () => {
    const slider = document.querySelector(".main-slider");
    const slides = slider.querySelectorAll(".slide");
    const dots = [];
    let currentSlide = 0;
    let interval;

    const addDots = () => {
        const dotsContainer = document.querySelector(".header_slider-dots");
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
    const prevSlide = (element, index, strStyle) => {
        element[index].style.display = strStyle;
    };
    const nextSlide = (element, index, strStyle) => {
        element[index].style.display = strStyle;
    };
    const prevDot= (element, index, strClass) => {
        element[index].classList.remove(strClass);
    };
    const nextDot = (element, index, strClass) => {
        element[index].classList.add(strClass);
    };

    const autoPlay = () => {
        prevSlide(slides, currentSlide, "none");
        prevDot(dots, currentSlide, "dot-active");

        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        nextSlide(slides, currentSlide, "block");
        nextDot(dots, currentSlide, "dot-active");
    };
    const startSlide = (time = 2000) => {
        interval = setInterval(autoPlay, time);
    };
    const stopSlide = () => {
        clearInterval(interval);
    };

    slider.addEventListener("click", (event) => {
        event.preventDefault();
        const target = event.target;

        if (!target.matches(".dot")) {
            return;
        }

        prevSlide(slides, currentSlide, "none");
        prevDot(dots, currentSlide, "dot-active");

        if (target.matches(".dot")) {
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
        nextSlide(slides, currentSlide, "block");
        nextDot(dots, currentSlide, "dot-active");
    });

    slider.addEventListener("mouseover", (event) => {
        if (event.target.matches(".dot")) {
            stopSlide();
        }
    });

    slider.addEventListener("mouseout", (event) => {
        if (event.target.matches(".dot")) {
            startSlide(5000);
        }
    });

    startSlide(5000);
}

export default mainSlider;


