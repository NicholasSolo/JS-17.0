const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...';
    const successMessage = 'Спасибо! Мы скоро с Вами свяжемся.';
    const preloader = document.querySelector('.preloader');

    const form = document.getElementById('form1');
    const popupForm = document.getElementById('form3');
    const footerForm = document.getElementById('form2');
    const userMessage = document.createElement('div');
    userMessage.style.cssText = 'font-size: 2rem';

    const postData = (body) =>  fetch('./server.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        form.append(userMessage);
        userMessage.append(preloader);
        preloader.style.display = 'block';

        const formData = new FormData(form);  // объект считывает данные со всех инпутов в форме, что имеют атрибут name и записывает в переменную
        const body = {};
        for (const value of formData.entries()) {
            body[value[0]] = value[1];
        }
        postData(body)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('network failed');
                }
                userMessage.textContent = successMessage;
                setTimeout(() => {
                    userMessage.textContent = '';
                }, 5000);
            })
            .catch((error) => {
                userMessage.textContent = errorMessage;
                console.log(error);
                setTimeout(() => {
                    userMessage.textContent = '';
                }, 5000);
            });
        form.querySelectorAll('input').forEach((item) => {
            item.value = '';
        });
    });

    popupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        popupForm.append(userMessage);
        preloader.style.display = 'block';
        userMessage.append(preloader);

        const formData = new FormData(popupForm);
        const body = {};
        for (const value of formData.entries()) {
            body[value[0]] = value[1];
        }
        postData(body)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('network failed');
                }
                userMessage.style.color = 'white';
                userMessage.textContent = successMessage;
                setTimeout(() => {
                    userMessage.textContent = '';
                }, 5000);
            })
            .catch((error) => {
                console.log(error);
                userMessage.textContent = errorMessage;
                setTimeout(() => {
                    userMessage.textContent = '';
                }, 5000);
            });
        popupForm.querySelectorAll('input').forEach((item) => {
            item.value = '';
        });
    });

    footerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        footerForm.append(userMessage);
        preloader.style.display = 'block';
        userMessage.append(preloader);

        const formData = new FormData(footerForm);
        const body = {};
        for (const value of formData.entries()) {
            body[value[0]] = value[1];
        }
        postData(body)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('network failed');
                }
                userMessage.textContent = successMessage;
                setTimeout(() => {
                    userMessage.textContent = '';
                }, 5000);
            })
            .catch((error) => {
                console.log(error);
                userMessage.textContent = errorMessage;
                setTimeout(() => {
                    userMessage.textContent = '';
                }, 5000);
            });

        footerForm.querySelectorAll('input').forEach((item) => {
            item.value = '';
        });
    });
};

export default sendForm;