const showGiftPopup = () => {
  const giftIcon = document.querySelector(".fixed-gift");
  const giftPopup = document.getElementById("gift");
  const formContent = document.querySelector("#gift .form-content");

  const togglePopup = () => {
    giftPopup.classList.toggle('popup_opened');
  }

  if (giftIcon) {
    giftIcon.addEventListener("click", () => {
      if (document.documentElement.clientWidth > 768) {
        giftIcon.style.display = "none";
        formContent.classList.add("animate__animated");
        formContent.classList.add("animate__bounceIn");
        togglePopup();
      } else {
        giftIcon.style.display = "none";
        togglePopup();
      }
    });

    giftPopup.addEventListener("click", (event) => {
      let target = event.target;
      if (target.matches(".close_icon") || target.matches(".close-btn")) {
        togglePopup();
      } else {
        target = target.closest(".form-content");
        if (!target) {
          togglePopup();
        }
      }
    });
  }
};

export default showGiftPopup;
