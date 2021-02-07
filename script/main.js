"use strict";

function isNumber(number) {
  return !isNaN(parseFloat(number)) && isFinite(number);
} // Вспомогательная функция проверки на число

let money;

function start() {
  do {
    money = +prompt("Ваш месячный доход", "");
  } while (!isNumber(money));
}
start();

const appData = {
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 100000,
  period: 12,
  asking() {
    const addExpenses = prompt(
      "Перечислите возможные расходы за рассчитываемый период через запятую:",
      "Путешествия, покупки, развлечения"
    );
    this.addExpenses = addExpenses.toLowerCase().split(",");
    this.deposit = confirm("Есть ли у Вас депозит в банке?");

    for (let i = 0; i < 2; i++) {
      const compulsoryExpense = prompt("Введите обязательную статью расходов?");

      let temp = 0;
      do {
        temp = prompt("Во сколько это обойдется?");
      } while (!isNumber(temp));

      this.expenses[compulsoryExpense] = temp;
    }
  },

  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
    console.log("Сумма расходов за месяц:", this.expensesMonth);
  },

  getBudget() {
    this.budgetMonth = this.budget - this.expensesMonth;
    this.budgetDay = Math.ceil(this.budgetMonth / 30);
  },

  getTargetMonth() {
    const period = Math.ceil(this.mission / this.budgetMonth);
    if (period < 0 || period === Infinity) {
      console.log("Цель не будет достигнута");
    } else if (period > 0) {
      console.log(`Цель будет достигнута за ${period} месяца(-ев)`);
    }
  },

  getStatusIncome() {
    if (this.budgetDay >= 1200) {
      console.log("У Вас высокий уровень дохода");
    } else if (this.budgetDay >= 600) {
      console.log("У Вас средний уровень дохода");
    } else if (this.budgetDay <= 600) {
      console.log("К сожалению, у Вас уровень дохода ниже среднего");
    } else if (this.budgetDay <= 0) {
      console.log("Что-то пошло не так");
    } else {
      console.log("Ошибка");
    }
  },
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log("Наша программа включает в себя данные: ");
for (let key in appData) {
  console.log(key, "-", appData[key]);
}