const tabs = () => {
    const tabHeader = document.querySelector(".service-header");
    const tabs = tabHeader.querySelectorAll(".service-header-tab");
    const tabContent = document.querySelectorAll(".service-tab");

    const toggleTabContent = (index) => {

        tabContent.forEach((item, tabIndex) => {
            if (index === tabIndex) {
                item.classList.remove("d-none");
                tabs[tabIndex].classList.add("active");
            } else {
                item.classList.add("d-none");
                tabs[tabIndex].classList.remove("active");
            }
        })
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
