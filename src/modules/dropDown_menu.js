const dropdownMenu = () => {
  const clubsList = document.querySelector("ul");

  const toggleMenu = () => {
    clubsList.classList.toggle("menu-active");
    clubsList.classList.toggle("animate__animated");
    clubsList.classList.toggle("animate__bounceInDown");
  };

  document.addEventListener("click", (event) => {
    let target = event.target;
    if (target.matches(".club-select p")) {
      toggleMenu();
    } else {
      target = target.closest(".club-select");
      if (!target && clubsList.classList.contains("menu-active")) {
        toggleMenu();
      }
    }
  });
};

export default dropdownMenu;
