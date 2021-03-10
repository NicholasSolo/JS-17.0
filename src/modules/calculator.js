const calculator = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block');
    const totalValue = document.getElementById('total');
    const apartmentType = document.querySelector('.calc-type');
    const daysToComplete = document.querySelector('.calc-day');
    const roomsNum = document.querySelector('.calc-count');
    const totalSquare = document.querySelector('.calc-square');

    const wowNum = (num) => {
        const time = 500;
        const step = num * 0.1;
        let count = 0;
        const int = Math.round(time / (num / step));
        if (num === 0) return;
        const interval = setInterval(() => {
            count += step;
            if (count === num) {
                clearInterval(interval);
            }
            totalValue.textContent = count;
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

        callback(total);
    };

    calcBlock.addEventListener('change', (event) => {
        const target = event.target;
        if (target === apartmentType || target === daysToComplete ||
         target === roomsNum || target === totalSquare) {
            countSum(wowNum);
        }
    });
};

export default calculator;