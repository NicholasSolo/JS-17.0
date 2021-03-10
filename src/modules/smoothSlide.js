const smoothSlide = () => {
    const anchors = document.querySelectorAll(
        'menu a[href*="#"], a[href="#service-block"]'
    );
    for (const anchor of anchors) {
        if (!anchor.classList.contains("close-btn")) {
            anchor.addEventListener("click", (event) => {
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

export default smoothSlide;