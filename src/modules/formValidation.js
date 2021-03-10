const formValidation = () => {
    const calcInputs = document.querySelectorAll(".calc-item");
    const phoneInputs = document.querySelectorAll(".form-phone");
    const emailInputs = document.querySelectorAll(".form-email");
    const name = document.querySelectorAll("input[name='user_name']");
    const message = document.querySelector('.mess');

    calcInputs.forEach((item, index) => {
        item.addEventListener('input', () => {
            if (index === 0) {
                return;
            }
            item.value = item.value.replace(/[^\d]/g, '');
        });
    });
    phoneInputs.forEach((item) => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/[^+\d-()]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '');
            if (item.value.length > 16) {
                item.value = item.value.slice(0, 15);
            }
        });
    });
    emailInputs.forEach((item) => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/[^a-z@\-_.!~*']/gi, '').replace(/-+/g, '-').replace(/^-|-$/g, '');
        });
    });
    message.addEventListener('input', () => {
        message.value = message.value.replace(/[^-а-я\s0-9.,?!]/gi, '').replace(/-+/g, '-');
    });
    name.forEach((item) => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/[^а-я\s]/gi, '').replace(/\s+/g, " ");
        });
    });
};

export default formValidation;