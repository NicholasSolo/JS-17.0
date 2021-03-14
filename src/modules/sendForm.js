const sendForm = () => {
    const errorMessage = "Что-то пошло не так...";
    const successMessage = "Спасибо! Мы скоро с Вами свяжемся.";
    const preloader = document.querySelector(".preloader");

    const form = document.getElementById("form1");
    const popupForm = document.getElementById("form3");
    const footerForm = document.getElementById("form2");
    const userMessage = document.createElement("div");
    userMessage.style.cssText = "font-size: 2rem";

    const postData = (body) =>
        fetch("./server.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        });

    const handler = (event, handlerBlock) => {
        event.preventDefault();
        handlerBlock.append(userMessage);
        preloader.style.display = "block";
        userMessage.append(preloader);

        const formData = new FormData(handlerBlock);
        const body = {};
        for (const value of formData.entries()) {
            body[value[0]] = value[1];
        }
        postData(body)
        .then((response) => {
            if (response.status !== 200) {
                throw new Error("network failed");
            }
            if (handlerBlock === popupForm) {
                userMessage.style.color = "white";
            }
            userMessage.textContent = successMessage;
            setTimeout(() => {
                userMessage.textContent = "";
            }, 5000);
        })
        .catch((error) => {
            console.log(error);
            userMessage.textContent = errorMessage;
            setTimeout(() => {
                userMessage.textContent = "";
            }, 5000);
        });
        handlerBlock.querySelectorAll("input").forEach((item) => {
            item.value = "";
        });
    };

    form.addEventListener("submit", (event) => {
        handler(event, form);
    });

    popupForm.addEventListener("submit", (event) => {
        handler(event, popupForm);
    });

    footerForm.addEventListener("submit", (event) => {
        handler(event, footerForm);
    });
};

export default sendForm;
