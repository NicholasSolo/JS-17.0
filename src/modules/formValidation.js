const formValidation = () => {
    document.addEventListener("input", (event) => {
        const target = event.target;

        if(!target.matches(".calc-type") && target.matches(".calc-item")){
            target.value = target.value.replace(/[^\d]/g, '');
        }
        if (target.matches(".form-phone")){
            target.value = target.value.replace(/[^+\d]/g, '');
            if (target.value.length > 12) {
                target.value = target.value.slice(0, 12);
            }
        }
        if (target.matches(".form-email")){
            target.value = target.value.replace(/[^a-z0-9@\-_.!~*']/gi, '').replace(/-+/g, '-');
        }
        if (target.matches(".mess")){
            target.value = target.value.replace(/[^-а-яё\s0-9.,?!;"]/gi, '').replace(/-+/g, '-').replace(/\s+/g, ' ');
        }
        if (target.matches("input[name='user_name']")){
            target.value = target.value.replace(/[^а-яё\s]/gi, '').replace(/\s+/g, ' ').replace(/^\s/g, '');
        }
    })

    document.addEventListener("blur", (event) => {
        const target = event.target;

        if (target.matches("input[name='user_name']")){
            if (target.value.trim() !== "") {
                let temp = target.value.split(/\s+/);
                if (temp.length) {
                  let output = temp.map((item) => {
                    if (item != "") {
                      item = item[0].toUpperCase() + item.slice(1).toLowerCase();
                      return item;
                    }
                  });
                  target.value = output.join(" ").replace(/\s$/g, '');
                }
            }
        }
        if (target.matches(".form-email")){
            target.value = target.value.replace(/^-/g, '').replace(/-$/g, '');
        }
        if (target.matches(".mess")){
            target.value = target.value.trim().replace(/^-/g, '').replace(/-$/g, '');
        }
    }, true)

    document.addEventListener("keypress", (event) => {
        const target = event.target;
        if(target.matches('.form-email')) {
            if (event.code === 'Space') {
                event.preventDefault();
            }
        }
    })
};

export default formValidation;

