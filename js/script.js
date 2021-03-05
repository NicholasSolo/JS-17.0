const filterByType = (type, ...values) => values.filter(value => typeof value === type), // сама функция фильтрации, которая принимает параметры - тип данных и введенные значения. 
//Потом эти значения загоняет в массив и фильтрует, сопоставляя переданный тип данных с typeof значений в массиве. Взовращает новый массив в место вызова

	hideAllResponseBlocks = () => { //функция скрывает все блоки с возможными результатами
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); // получаем со страницы все элементы, соответствующие селектору div.dialog__response-block, превращаем NodeList в массив
		responseBlocksArray.forEach(block => block.style.display = 'none'); // перебором присваиваем каждому блоку display: none
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => { //функция, показывающая блок с результатами, принимает три параметра(селектор блока, который надо показать; сообщение; и спан-селектор)
		hideAllResponseBlocks(); // сперва вызывается функция hideAllResponseBlocks, чтобы скрыть все блоки
		document.querySelector(blockSelector).style.display = 'block'; //display: block присваивается элементу, чей селектор был передан. Изначально будет отображаться значение элмента .dialog__response-block_no-results, т.к. в верстке у него display: block,а функция hideAllResponseBlocks отработает только после submit
		if (spanSelector) { //если же был передан спан-селектор с соответствующим id, то отработает else
			document.querySelector(spanSelector).textContent = msgText; // и выведет сообщение с текстом msgText
		}
	},

	showError = (msgText) => showResponseBlock('.dialog__response-block_error', msgText, '#error'), //функция вызывается из catch() в случае ошибки. Она в свою очередь вызывает showResponseBlock, который показывает пользователю соответствующее сообщение

	showResults = (msgText) => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), //функция вызывается из try() в случае успеха. Она в свою очередь вызывает showResponseBlock, который показывает пользователю соответствующее сообщение

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), //функция вызывается в случае отсутствия результатов (dataInput.value === ''). Она в свою очередь вызывает showResponseBlock, который показывает пользователю соответствующее сообщение

	tryFilterByType = (type, values) => { //принимаем аргументы, переданные из формы
		try {
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); //используем метод eval и интерполяцию для вызова функции фильтрации, после чего результат работы функции преобразуем в строку. 
			//В переменную valuesArray записываем строку, полученную в рез-те работы функции filterByType
			console.log(typeof valuesArray);
			const alertMsg = (valuesArray.length) ? `Данные с типом ${type}: ${valuesArray}` : `Отсутствуют данные типа ${type}`; // определяем содержимое переменной alertMsg
			//если строка valuesArray не пустая, выводим сообщение с типом данных и строку с рез-том. Если же пустая, то сообщаем, что данные с выбранным типом отсутсвуют 
			showResults(alertMsg); // вызываем функцию showResults и передаем туда alertMsg
		} catch (error) {
			console.log(error);
			showError(`Ошибка: ${error}`); // в случае ошибки выводится сообщение "Что-то пошло нетак:" и под ним саму ошибку ("Ошибка: <Error name>: <error message>")
		}
	};

const filterButton = document.querySelector('#filter-btn');  //получаем со страницы кнопку с id #filter-btn

filterButton.addEventListener('click', (event) => {		//вешаем на эту кнопку событие "клик"
	const typeInput = document.querySelector('#type');	//получаем со страницы инпут для выбора типа данных с id #type
	const dataInput = document.querySelector('#data');	//получаем со страницы инпут для перечисления значений с id #data

	if (dataInput.value === '') { // Если поле для ввода значения путое
		dataInput.setCustomValidity('Поле не должно быть пустым!'); //с помощью setCustomValidity выводим всплывающее сообщение, что поле не должно быть пустым
		showNoResults(); //вызываем функцию showNoResults
	} else { // если же поле не пустое
		dataInput.setCustomValidity(''); //сообщение делаем пустым(не выводим)
		event.preventDefault(); // отменяем стандартное поведение submit (наверное и событие в обработчике должно быть submit..)
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); // вызываем функцию tryFilterByType. В нее передаем два аргумента - выбранный тип данных и введенное значение для фильтрации, убираем пробелы по краям
	}
});

