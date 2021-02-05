"use strict";

function isNumber(number) {
  return !isNaN(parseFloat(number)) && isFinite(number);
}

function guessNumber() {
  const number = Math.ceil(Math.random() * (1 - 100) + 100);

  function guessNumberInner() {
    let userAnswer = prompt("Угадайте число от 1 до 100!", "");

    if (userAnswer === null) {
      alert("Игра окончена");
      return;
    } else if (!isNumber(userAnswer) || userAnswer > 100 || userAnswer < 0) {
      alert("Введите число от 1 до 100!");
      guessNumberInner();
    } else if (userAnswer == number) {
      return alert(
        "Угадали! Не хотите принять участие в новом сезоне 'Битвы экстрасенсов'?"
      );
    } else if (userAnswer > number) {
      alert("Загаданное число меньше");
      guessNumberInner();
    } else if (userAnswer < number) {
      alert("Загаданное число больше");
      guessNumberInner();
    } else {
      alert("Что-то пошло не так");
      return;
    }
  }
  return guessNumberInner;
}

let game = guessNumber();
game();
