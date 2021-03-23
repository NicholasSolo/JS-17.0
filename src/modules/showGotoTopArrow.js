const showArrow = () => {
  const arrow = document.getElementById("totop");

  arrow.style.display = "none";

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > document.getElementById("header").offsetHeight) {
      arrow.style.display = "block";
    } else {
      arrow.style.display = "none";
    }
  });
};

export default showArrow;
