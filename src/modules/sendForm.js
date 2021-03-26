const sendForm = () => {
    const headerCallbackForm = document.getElementById("form1");
    const headerFreeVisitForm = document.getElementById("form2");
    const preloader = document.querySelector(".preloader");
    const cardOrderForm = document.getElementById("card_order");
    const thanksPopup = document.getElementById("thanks");
    const thanksError = document.getElementById("thanks__error");
    const promoField = document.getElementById("promo");
    const totalPrice = document.getElementById("price-total");
    const servicePeriodTabs = document.querySelectorAll("input[name='card-type']");

//  Обработчики для закрытия модалок вручную
    thanksPopup.addEventListener("click", (event) => {
        let target = event.target;

        if (target.matches(".close-form img") || target.matches("#thanks .close-btn")) {
            thanksPopup.classList.remove("popup_opened");
        } else {
            target = target.closest(".form-content");
            if (!target){
                thanksPopup.classList.remove("popup_opened");
            }
        }
    });
    thanksError.addEventListener("click", (event) => {
        let target = event.target;

        if (target.matches(".close-form img") || target.matches("#thanks__error .close-btn")) {
            thanksError.classList.remove("popup_opened");
        } else {
            target = target.closest(".form-content");
            if (!target){
                thanksError.classList.remove("popup_opened");
            }
        }
    });
// 
    const postData = (body) =>
    fetch("./server.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    });

    const postHandler = (form, event) => {
        event.preventDefault();

        if (form.querySelector("[name='name']")) {
            if(form.querySelector("[type='tel']").value.length < 6 || form.querySelector("[name='name']").value.length < 2) return;
        }
        

        if(form.querySelector("#callback_footer_form-phone")) {
            console.log(6565656565);
            if (form.querySelector("[type='tel']").value.length < 6) return;
        };
        
        //проверка стоит ли галочка обработки персональных данных
        const infoCheck = form.querySelector("[type='checkbox']");
        const personalDataAgreement = form.querySelector("#personalDataAgreement");
        if (infoCheck && infoCheck.checked === false) {
            personalDataAgreement.classList.add("popup_opened");
            if (form === cardOrderForm) {
                personalDataAgreement.style.color = "black";
                personalDataAgreement.style.textAlign = "left";
            } 
            return;
        } else {
            //убираем уведомление
            if (personalDataAgreement) { //проверка для футера
                personalDataAgreement.classList.remove("popup_opened");
            }
        }
        
        //в форме с промокодом возвращаем цены и стили инпута
        if (form === cardOrderForm) {
            if (promoField) {
                promoField.style.border = '';
                servicePeriodTabs.forEach((item) => {
                if (item.checked) {
                    totalPrice.textContent = item.dataset.price;
                }
            });
            }
        }

        form.append(preloader);
        preloader.style.display = "block";
        // формируем body для отправки
        const formData = new FormData(form);
        const body = {};
        for (const value of formData.entries()) {
            body[value[0]] = value[1];
        }
        postData(body)
        .then((response) => {
            if (response.status !== 200) {
                throw new Error("network failed");
            }
            preloader.style.display = "none";
            if (form === headerCallbackForm || form === headerFreeVisitForm) {
                form.parentElement.parentElement.parentElement.classList.remove("popup_opened");
                thanksPopup.classList.add("popup_opened");
                setTimeout(() => {
                    thanksPopup.classList.remove("popup_opened");
                }, 5000);
            } else {
                thanksPopup.classList.add("popup_opened");
                setTimeout(() => {
                    thanksPopup.classList.remove("popup_opened");
                }, 5000);
            }  
        })
        .catch((error) => {
            console.error(error);
            preloader.style.display = "none";
            if (form === headerCallbackForm || form === headerFreeVisitForm) {
                form.parentElement.parentElement.parentElement.classList.remove("popup_opened");
                thanksError.classList.add("popup_opened");
                setTimeout(() => {
                    thanksError .classList.remove("popup_opened");
                }, 5000);
            } else {
                thanksError.classList.add("popup_opened");
                setTimeout(() => {
                    thanksError.classList.remove("popup_opened");
                }, 5000);
            }         
        });
        form.querySelectorAll("input").forEach((item) => {
            item.value = "";
            if(item.type === "checkbox") {
                item.checked = false;
            } 
        });
    }

    document.addEventListener("submit", (event) => {
        const target = event.target;

        if (target.matches("#form1")) {
            postHandler(target, event);
        }
        if (target.matches("#form2")) {
            postHandler(target, event);
        }
        if (target.matches("#banner-form")) {
            postHandler(target, event);
        }
        if (target.matches("#card_order")) {
            postHandler(target, event);
        }
        if (target.matches("#footer_form")) {
            postHandler(target, event);
        }
    })

}

export default sendForm;
