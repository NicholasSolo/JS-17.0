const calculator = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block');
    const totalValue = document.getElementById('total');
    const apartmentType = document.querySelector('.calc-type');
    const daysToComplete = document.querySelector('.calc-day');
    const roomsNum = document.querySelector('.calc-count');
    const totalSquare = document.querySelector('.calc-square');

    const wowNum = (num) => {
        const time = 500;
        const step = Math.floor(num * 0.1);
        let count = 0;
        const int = Math.round(time / (num / step));
        if (num === 0) return;
        const interval = setInterval(() => {
            count += step;
            if (count === num) {
                clearInterval(interval);
            }
            totalValue.textContent = count;
            if(count > num) {  //count получается больше num, когда шаг не кратен 10. 
                    //Выходит, что первая проверка (count === num) игнорируется, т.к. итоговая сумма просто "перескакивает" значение num, setInterval не прерывается и крутит счетчик все выше и выше
                clearInterval(interval); // тогда он прерывается здесь
                totalValue.textContent = num; // а на экран выводится нужное число, при этом эффект бегущих цифр сохраняется
            }
        }, int);
    };

    const countSum = (callback) => {
        let total = 0;
        let countValue = 1;
        let dayValue = 1;
        const typeValue = apartmentType.value;
        const squareValue = +totalSquare.value;

        if (roomsNum.value > 1) {
            countValue += (roomsNum.value - 1) / 10;
        }

        if (daysToComplete.value && daysToComplete.value < 5) {
            dayValue *= 2;
        } else if (daysToComplete.value && daysToComplete.value < 10) {
            dayValue *= 1.5;
        }

        if (typeValue && squareValue !== 0) {
            total = Math.round(price * typeValue * squareValue * countValue * dayValue);
        }

        callback((total));
    };

    calcBlock.addEventListener('change', (event) => {
        const target = event.target;
        if (target.matches('.calc-item')) {
            countSum(wowNum);
        }
    });
};
export default calculator;