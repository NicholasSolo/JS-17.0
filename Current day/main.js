/* eslint-disable eqeqeq */
const showTime = () => {
    const showHello = document.querySelector(".hello");
    const showDay = document.querySelector(".day");
    const showTime = document.querySelector(".time");
    const showDaysLeft = document.querySelector(".left");

    const now = new Date();
    const hour = now.getHours();
    const day = now.toLocaleString("ru", { weekday: "long" });
    const time = now.toLocaleTimeString("en", { hour12: true });

    const daysToNY = () => {
        const NY = new Date(now.getFullYear() + 1, 0, 1);
        const daysLeft = String(Math.floor((NY.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
        const lastNumber = daysLeft[daysLeft.length - 1];
        let dayname;
        if (daysLeft > 4 && daysLeft < 21) {
            dayname = daysLeft + " дней";
        } else if (lastNumber == 1) {
            dayname = daysLeft + " день";
        } else if (lastNumber == 2 || lastNumber == 3 || lastNumber == 4) {
            dayname = daysLeft + " дня";
        } else {
            dayname = daysLeft + " дней";
        }
        return dayname;
    };

    const dayTime = hour => {
        let helloPhrase;
        if (hour > 0 && hour < 6) {
            helloPhrase = "Доброй ночи!";
        } else if (hour > 6 && hour < 12) {
            helloPhrase = "Доброе утро!";
        } else if (hour > 12 && hour < 17) {
            helloPhrase = "Добрый день!";
        } else {
            helloPhrase = "Добрый вечер!";
        }
        return helloPhrase;
    };

    showHello.textContent = dayTime(hour);
    showDay.textContent = `Сегодня: ${day[0].toUpperCase() + day.slice(1)}`;
    showTime.textContent = `Текущее время: ${time}`;
    showDaysLeft.textContent = `До нового года осталось ${daysToNY()}`;
};

setInterval(showTime, 1000);
