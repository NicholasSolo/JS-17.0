const validateForm = () => {

    document.addEventListener("input", (e) => {
        const target = e.target;

        if(target.matches("input[type='tel']")) {
            target.value = target.value.replace(/[^\d+]/g, "");
            if (target.value.length > 12) {
                target.value = target.value.slice(0, 12);
            }
        }
        if(target.matches("input[name='name']") && !target.matches("input#promo")) {
            target.value = target.value.replace(/[^а-яё\s]/gi, '').replace(/\s+/g, ' ').replace(/^\s/g, '');
        }
    });
    document.addEventListener("blur", (event) => {
        const target = event.target;
        if(target.matches("input[type='tel']")) {
            if (target.value.charAt(0) !== "+" && target.value.charAt(1) !== "7") {
                target.value = "+7" + target.value.slice(2);
            }
        }
        if (target.matches("input[name='name']") && !target.matches("input#promo")){
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
    }, true)
}
export default validateForm;