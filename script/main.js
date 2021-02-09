"use strict";

const calculateElem = document.getElementById('start');

const addBonusIncomeElem = document.getElementsByTagName('button')[0];
const addCompulsoryExpensesElem = document.getElementsByTagName('button')[1];

const depositCheckboxElem = document.querySelector('#deposit-check');

const additionalIncomeInputOne = document.querySelectorAll('.additional_income-item')[0];
const additionalIncomeInputTwo = document.querySelectorAll('.additional_income-item')[1];

const budgetDayValueElem = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValueElem = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValueElem = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValueElem = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValueElem = document.getElementsByClassName('income_period-value')[0];
const targetMonthValueElem = document.getElementsByClassName('target_month-value')[0];


const monthlyIncomeElem = document.querySelector('.salary-amount');
const bonusIncomeTitleElem = document.querySelectorAll('.income-title')[1];
const bonusIncomeAmountElem = document.querySelector('.income-amount');
const compulsoryExpensesTitleElem = document.querySelectorAll('.expenses-title')[1];
const compulsoryExpensesAmountElem = document.querySelector('.expenses-amount');
const additionalExpensesNameElem = document.querySelector('.additional_expenses-item');
const targetAmountElem = document.querySelector('.target-amount');
const periodRangeElem = document.querySelector('.period-select');

function isNumber(number) {
  return !isNaN(parseFloat(number)) && isFinite(number);
} // Вспомогательная функция проверки на число

let money;

function start() {
  do {
    money = +prompt("Ваш месячный доход", "50000");
  } while (!isNumber(money));
}
// start();

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
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 100000,
  period: 12,
  asking() {
    if (confirm("Есть ли у вас дополнительный заработок?")) {
      let additionalIncome = prompt(
        "Укажите дополнительные источники дохода:",
        "Taxi"
      );
      while (isFinite(additionalIncome) || additionalIncome === null) {
        additionalIncome = prompt(
          "Укажите дополнительные источники дохода:",
          "Taxi"
        );
      }

      let additionalCash = prompt("Сколько это приносит в месяц?", "10000");
      while (!isNumber(additionalCash)) {
        additionalCash = prompt("Сколько это приносит в месяц?", "10000");
      }

      this.income[additionalIncome] = +additionalCash;
    }

    const addExpenses = prompt(
      "Перечислите возможные расходы за рассчитываемый период через запятую:",
      "Путешествия, покупки, развлечения"
    );
    this.addExpenses = addExpenses.toLowerCase().split(",");
    this.deposit = confirm("Есть ли у Вас депозит в банке?");

    for (let i = 0; i < 2; i++) {
      let compulsoryExpense = prompt("Введите обязательную статью расходов?","");
      while (isFinite(compulsoryExpense) || compulsoryExpense === null) {
        compulsoryExpense = prompt("Введите обязательную статью расходов?", "");
      }

      let temp = 0;
      do {
        temp = prompt("Во сколько это обойдется?");
      } while (!isNumber(temp));

      this.expenses[compulsoryExpense] = +temp;
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

  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = prompt("Какой годовой процент?", "5.6");
      while (!isNumber(this.percentDeposit)) {
        this.percentDeposit = prompt("Какой годовой процент?", "5.6");
      }

      this.moneyDeposit = prompt("Какая сумма лежит на депозите?", "15000");
      while (!isNumber(this.moneyDeposit)) {
        this.moneyDeposit = prompt("Какая сумма лежит на депозите?", "15000");
      }
    }
  },

  calcSavedMoney() {
    return this.budgetMonth * this.period;
  },
};

// appData.asking();
// appData.getExpensesMonth();
// appData.getBudget();
// appData.getTargetMonth();
// appData.getStatusIncome();
// appData.getInfoDeposit();
// console.log(appData.calcSavedMoney());

// console.log("Наша программа включает в себя данные: ");
// for (let key in appData) {
//   console.log(key, "-", appData[key]);
// }


// Вывод addExpenses

function displayAddExpenses(arr) {
  let newStr = [];
  for (let key of arr) {
    key = key.trim();
    newStr.push(key[0].toUpperCase() + key.slice(1));
  }
  return newStr.join(', ');
}

// console.log(displayAddExpenses(appData.addExpenses));

