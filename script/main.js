"use strict";

const allTextInputs = document.querySelectorAll('input[type="text"]'); // доп. переменная для работы с input [type="text"]

const calculateElem = document.getElementById('start');
const cancelElem = document.getElementById('cancel');

const addBonusIncomeElem = document.getElementsByTagName('button')[0];
const addCompulsoryExpensesElem = document.getElementsByTagName('button')[1];

const depositCheckboxElem = document.querySelector('#deposit-check');

const additionalIncomeInputs = document.querySelectorAll('.additional_income-item');

const budgetMonthValueElem = document.getElementsByClassName('budget_month-value')[0];
const budgetDayValueElem = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValueElem = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValueElem = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValueElem = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValueElem = document.getElementsByClassName('income_period-value')[0];
const targetMonthValueElem = document.getElementsByClassName('target_month-value')[0];

const monthlyIncomeElem = document.querySelector('.salary-amount');
let bonusIncomeItems = document.querySelectorAll('.income-items');
const compulsoryExpensesTitleElem = document.querySelector('input.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpensesNameElem = document.querySelector('.additional_expenses-item');
const targetAmountElem = document.querySelector('.target-amount');
const periodRangeElem = document.querySelector('.period-select');
const periodAmountElem = document.querySelector('.period-amount');

function isNumber(number) {
  return !isNaN(parseFloat(number)) && isFinite(number);
} // Вспомогательная функция проверки на число


function AppData () {
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.income = {};
  this.bonusIncome = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
}

AppData.prototype.start = function() {
    
  if (monthlyIncomeElem.value.trim() === '' || isNaN(monthlyIncomeElem.value)) {
    return;
  } else { this.budget = +monthlyIncomeElem.value;}
  
  this.getExpenses();    //почему при вызове this.getExpenses() контекстом оказывается не объект appData, а кнопка "Рассчитать"?
  this.getBonusIncome();
  this.getExpensesMonth();
  this.getAdditionalExpenses();
  this.getAdditionalIncome();
  this.getBudget();
  this.showResult();
};

AppData.prototype.reset = function (){
  calculateElem.style.display = 'block';
  cancelElem.style.display = 'none';
  addBonusIncomeElem.removeAttribute('disabled');
  addCompulsoryExpensesElem.removeAttribute('disabled');
  periodRangeElem.value = 1;
  periodAmountElem.innerHTML = periodRangeElem.value;

  for (let i = 1; i < bonusIncomeItems.length; i++) {
    bonusIncomeItems[i].parentNode.removeChild(bonusIncomeItems[i]);
    bonusIncomeItems[i].value = '';
    addBonusIncomeElem.style.display = 'block';
  }
  for (let i = 1; i < expensesItems.length; i++) {
    expensesItems[i].parentNode.removeChild(expensesItems[i]);
    expensesItems[i].value = '';
    addCompulsoryExpensesElem.style.display = 'block';
  }

  [...allTextInputs].forEach((item) => {
    item.value = '';
  });
  
  [...allTextInputs].slice(0,11).forEach((item) => {
    item.removeAttribute('disabled');
  });

  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.income = {};
  this.bonusIncome = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
};

AppData.prototype.showResult = function() {
  budgetMonthValueElem.value = this.budgetMonth;
  budgetDayValueElem.value = this.budgetDay;
  expensesMonthValueElem.value = this.expensesMonth;
  additionalExpensesValueElem.value = this.addExpenses.join(', ');
  additionalIncomeValueElem.value = this.addIncome.join(', ');
  targetMonthValueElem.value = this.getTargetMonth();
  incomePeriodValueElem.value = this.calcSavedMoney();
};
AppData.prototype.addExpensesInputsBlock = function() {
  const cloneExpensesItems = expensesItems[0].cloneNode(true);
  
  expensesItems[0].parentNode.insertBefore(cloneExpensesItems, addCompulsoryExpensesElem);
  
  expensesItems = document.querySelectorAll('.expenses-items');
  if(expensesItems.length===3) {
    addCompulsoryExpensesElem.style.display = 'none';
  }
};
AppData.prototype.getExpenses = function() {
  expensesItems.forEach((item) => {
    const expensesItem = item.querySelector('.expenses-title').value;
    const expensesCost = item.querySelector('.expenses-amount').value;
      
    if(expensesItem !== '' && expensesCost !== ''){
      this.expenses[expensesItem] = expensesCost;
    }
  });
};
AppData.prototype.addBonusIncomeInputsBlock = function() {
  const cloneBonusIncomeItems = bonusIncomeItems[0].cloneNode(true);
  bonusIncomeItems[0].parentNode.insertBefore(cloneBonusIncomeItems, addBonusIncomeElem);
  
  bonusIncomeItems = document.querySelectorAll('.income-items');
  if(bonusIncomeItems.length===3) {
    addBonusIncomeElem.style.display = 'none';
  }
};
AppData.prototype.getBonusIncome = function() {
  bonusIncomeItems.forEach((item) => {
    const bonusIncomeItem = item.querySelector('.income-title').value;
    const bonusIncomeSum = item.querySelector('.income-amount').value;
      
    if(bonusIncomeSum !== '' && bonusIncomeItem !== ''){
      this.bonusIncome += +bonusIncomeSum;
    }
  });
  
};
AppData.prototype.getAdditionalExpenses = function() {
  const additionalExpenses = additionalExpensesNameElem.value.toLowerCase().split(",");
  additionalExpenses.forEach((item) => {
    item = item.trim();
    if(item !== ''){
      this.addExpenses.push(item);
    }
  });
};
AppData.prototype.getAdditionalIncome = function() {
  additionalIncomeInputs.forEach((item) => {
    let itemValue = item.value.trim();
    if (itemValue !== '') {
      this.addIncome.push(itemValue);
    }
  });
};

AppData.prototype.getExpensesMonth = function() {
  for (let key in this.expenses) {
    this.expensesMonth += +this.expenses[key];
  }
};

AppData.prototype.getBudget = function() {
  this.budgetMonth = this.budget + this.bonusIncome - this.expensesMonth;
  this.budgetDay = Math.ceil(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function() {
  const period =  Math.ceil(targetAmountElem.value / this.budgetMonth);
    if (period === Infinity || isNaN(period)) {
      return 'Цель не будет достигнута';
    }
    return period;
  };

  AppData.prototype.getStatusIncome = function() {
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
};

AppData.prototype.getInfoDeposit = function() {
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
};

AppData.prototype.calcSavedMoney = function() {
  return this.budgetMonth *= periodRangeElem.value;
};

AppData.prototype.eventListeners = function () {
//перенести обработчики

calculateElem.addEventListener('click', this.start.bind(this));
calculateElem.addEventListener('click', () => {
  if (monthlyIncomeElem.value.trim() === '' || isNaN(monthlyIncomeElem.value)) {
    return;
  } else{
  calculateElem.style.display = 'none';
  cancelElem.style.display = 'block';

  addBonusIncomeElem.setAttribute('disabled', 'true');
  addCompulsoryExpensesElem.setAttribute('disabled', 'true');

  [...allTextInputs].slice(0,11).forEach((item) => {
    item.setAttribute('disabled', 'true');
  });}
});

cancelElem.addEventListener('click', this.reset.bind(this));

addCompulsoryExpensesElem.addEventListener('click', this.addExpensesInputsBlock.bind(this));
addBonusIncomeElem.addEventListener('click', this.addBonusIncomeInputsBlock.bind(this));
periodRangeElem.addEventListener('input', () => {
  periodAmountElem.innerHTML = periodRangeElem.value;
  incomePeriodValueElem.value = this.budgetMonth * periodRangeElem.value;
});
};

const appData = new AppData();
appData.eventListeners();



