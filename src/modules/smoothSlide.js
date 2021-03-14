const smoothSlide = () => {

    const slide = (event, target) =>{
        event.preventDefault();
            const blockID = target.getAttribute("href");
            document.querySelector(blockID).scrollIntoView({
                behavior: "smooth",
                block: "start",
                });
    }
     document.addEventListener("click", (event) =>{
        let target = event.target;

        if (!target.matches(".close-btn") && target.matches('menu a[href*="#"]')) {
            slide(event, target);
        } else {
            target = target.closest('a[href="#service-block"]');
            if (target) {
                slide(event, target);
            }
        }
    });
};

export default smoothSlide;