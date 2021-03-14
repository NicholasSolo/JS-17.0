const formValidation = () => {

    document.addEventListener("input", (event) => {
        const target = event.target;

        if(!target.matches('.calc-type') && target.matches(".calc-item")){
            target.value = target.value.replace(/[^\d]/g, '');
        }
        if (target.matches(".form-phone")){
            target.value = target.value.replace(/[^+\d-()]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '');
            if (target.value.length > 16) {
                target.value = target.value.slice(0, 16);
            }
        }
        if (target.matches(".form-email")){
            target.value = target.value.replace(/[^a-z0-9@\-_.!~*']/gi, '').replace(/-+/g, '-').replace(/^-|-$/g, '');
        }
        if (target.matches(".mess")){
            target.value = target.value.replace(/[^-а-я\s0-9.,?!]/gi, '').replace(/-+/g, '-');
        }
        if (target.matches("input[name='user_name']")){
            target.value = target.value.replace(/[^а-я\s]/gi, '').replace(/\s+/g, ' ');
        }
    })
};

export default formValidation;