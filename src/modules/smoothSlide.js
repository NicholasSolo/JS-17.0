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

        if (target.matches('a[href*="#"]') && !target.matches('.open-popup')) {
            slide(event, target);
        } else {
            target = target.closest('#totop');
            if (target) {
                slide(event, target);
            }
        }
    });
};

export default smoothSlide;