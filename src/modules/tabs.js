const tabs = () => {
    const tabHeader = document.querySelector(".service-header");
    const tabs = tabHeader.querySelectorAll(".service-header-tab");
    const tabContent = document.querySelectorAll(".service-tab");

    const toggleTabContent = (index) => {
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
    tabHeader.addEventListener("click", (event) => {
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

export default tabs;
