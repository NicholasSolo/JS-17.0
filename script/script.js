'use strict';

// Валидатор для числа //
const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

// Получение рандомного числа от 1 до заданного максимального //
const getRandomNumber = (min = 1, max = 100) => Math.floor(Math.random() * (max - min + 1)) + min;

// Игровые настройки //
const gameSettings = {
  "max": 500,
  "min": 300,
  "attempts": 10,
};

// Перезапуск игры //
const repeatGame = (settings, win = false) => {
  const isRepeat = confirm(win ? 'Поздравляю, Вы угадали!!! Хотели бы сыграть еще?' :'Попытки закончились, хотите сыграть еще?');
  isRepeat ? startGame(settings) : alert('До свидания!');
  return 0;
};

// Функция для старта игры //
const startGame = ({max = 100, min = 1, attempts = 10}) => {
  const settings = {max,min,attempts};
  const botNumber = getRandomNumber(min, max);

  alert(`Игра началась! Угадайте число от ${min} до ${max} за ${attempts} попыток`);

  // Функция для запуска попыток отгадывания //
  const tryToGuess = () => {

    // Если попыток не осталось, тогда предлагаем запустить игру //
    if(attempts === 0) {
      repeatGame(settings);
      return 0;
    }

    // Спрашиваем число у пользователя //
    const answer = prompt(`Угадайте число от ${min} до ${max} за ${attempts} попыток`);

    // Если нажали "Отмена", тогда завершаем игру //
    if(answer === null) {
      alert('Игра закончена! До свидания!');
      return 0;
    }

    // Если ввели не число, тогда перезапускаем попытку //
    if(!isNumber(answer)) {
      alert('Введите корректное значение: число.');
      tryToGuess();
      return 0;
    }

    const userNumber = +answer;

    // Если пользователь задал число не из заданного диапозона, перезапускаем попытку //
    if(userNumber > max || userNumber < min) {
      alert(`Введите число из заданного диапозона: от ${min} до ${max}`);
      tryToGuess();
      return 0;
    }

    // Исход данной попытки в зависимости от результата: Больше, меньше или равно загаданного(ому) числа(у)
    if (userNumber > botNumber) {
      attempts--;
      alert(`Загаданное число меньше, осталось попыток ${attempts}`);
      tryToGuess();
      return 0;
    } else if (userNumber < botNumber) {
      attempts--;
      alert(`Загаданное число больше, осталось попыток ${attempts}`);
      tryToGuess();
      return 0;
    } else if (userNumber === botNumber) {
      repeatGame(settings, true);
      return 0;
    } else {
      alert('Непредвиденная ошибка. Игра закончена!');
      return 0;
    }

  };
  tryToGuess();
};

startGame(gameSettings);
