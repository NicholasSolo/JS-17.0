const showGiftPopup = () => {
  const giftIcon = document.querySelector(".fixed-gift");
  const giftPopup = document.getElementById("gift");
  const formContent = document.querySelector("#gift .form-content");

  if (giftIcon) {
    giftIcon.addEventListener("click", () => {
      if (document.documentElement.clientWidth > 768) {
        giftIcon.style.display = "none";
        formContent.classList.add("animate__animated");
        formContent.classList.add("animate__bounceIn");
        giftPopup.style.display = "block";
      } else {
        giftIcon.style.display = "none";
        giftPopup.style.display = "block";
      }
    });

    giftPopup.addEventListener("click", (event) => {
      let target = event.target;
      if (target.matches(".close_icon") || target.matches(".close-btn")) {
        giftPopup.style.display = "none";
      } else {
        target = target.closest(".form-content");
        if (!target) {
          giftPopup.style.display = "none";
        }
      }
    });
  }
};

export default showGiftPopup;
