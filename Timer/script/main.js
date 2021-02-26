window.addEventListener("DOMContentLoaded", () => {

    //Timer
    const countTimer = deadline => {
        const timerHours = document.getElementById("timer-hours");
        const timerMinutes = document.getElementById("timer-minutes");
        const timerSeconds = document.getElementById("timer-seconds");

        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime();
            const dateNow = new Date().getTime();
            const timeRemaining = (dateStop - dateNow) / 1000;
            const seconds = Math.floor(timeRemaining % 60);
            const minutes = Math.floor((timeRemaining / 60) % 60);
            const hours = Math.floor(timeRemaining / 60 / 60) % 24;
            // const days = Math.floor(timeRemaining / 60 / 60 / 24);

            return {
                timeRemaining,
                hours,
                minutes,
                seconds,
            };
        }
        const addZero = value => {
            if (value < 10) {
                value = "0" + value;
                return value;
            }
            return value;
        };

        const updateClock = () => {
            const timer = getTimeRemaining();

            if (timer.timeRemaining > 0) {
                timerHours.textContent = addZero(timer.hours);
                timerMinutes.textContent = addZero(timer.minutes);
                timerSeconds.textContent = addZero(timer.seconds);
            } else if (timer.timeRemaining < 0) {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            } else {
                clearInterval(idInterval);
            }
        };

        const idInterval = setInterval(updateClock, 1000);

    };

    countTimer("1 may 2021");
});





