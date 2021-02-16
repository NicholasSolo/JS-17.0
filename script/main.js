"use strict";

const allTextInputs = document.querySelectorAll('input[type="text"]');

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

const appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  income: {},
  bonusIncome: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  start() {
    
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
  },

  cancel(){
    calculateElem.style.display = 'block';
    cancelElem.style.display = 'none';
    periodRangeElem.value = 0;
    periodAmountElem.innerHTML = 0;

    [...allTextInputs].forEach((item) => {
      item.value = '';
    });
    
    [...allTextInputs].slice(0,11).forEach((item) => {
      item.removeAttribute('disabled');
    });
  },

  showResult() {
    budgetMonthValueElem.value = this.budgetMonth;
    budgetDayValueElem.value = this.budgetDay;
    expensesMonthValueElem.value = this.expensesMonth;
    additionalExpensesValueElem.value = this.addExpenses.join(', ');
    additionalIncomeValueElem.value = this.addIncome.join(', ');
    targetMonthValueElem.value = this.getTargetMonth();
    incomePeriodValueElem.value = this.calcSavedMoney();
  },
  addExpensesInputsBlock () {
    const cloneExpensesItems = expensesItems[0].cloneNode(true);
    
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, addCompulsoryExpensesElem);
    
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length===3) {
      addCompulsoryExpensesElem.style.display = 'none';
    }
  },
  getExpenses(){
    expensesItems.forEach((item) => {
      const expensesItem = item.querySelector('.expenses-title').value;
      const expensesCost = item.querySelector('.expenses-amount').value;
        
      if(expensesItem !== '' && expensesCost !== ''){
        this.expenses[expensesItem] = expensesCost;
      }
    });
  },
  addBonusIncomeInputsBlock(){
    const cloneBonusIncomeItems = bonusIncomeItems[0].cloneNode(true);
    bonusIncomeItems[0].parentNode.insertBefore(cloneBonusIncomeItems, addBonusIncomeElem);
    
    bonusIncomeItems = document.querySelectorAll('.income-items');
    if(bonusIncomeItems.length===3) {
      addBonusIncomeElem.style.display = 'none';
    }
  },
  getBonusIncome() {
    bonusIncomeItems.forEach((item) => {
      const bonusIncomeItem = item.querySelector('.income-title').value;
      const bonusIncomeSum = item.querySelector('.income-amount').value;
        
      if(bonusIncomeSum !== '' && bonusIncomeItem !== ''){
        this.bonusIncome += +bonusIncomeSum;
      }
    });
    
  },
  getAdditionalExpenses(){
    const additionalExpenses = additionalExpensesNameElem.value.toLowerCase().split(",");
    additionalExpenses.forEach((item) => {
      item = item.trim();
      if(item !== ''){
        this.addExpenses.push(item);
      }
    });
  },
  getAdditionalIncome() {
    additionalIncomeInputs.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  },

  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  },

  getBudget() {
    this.budgetMonth = this.budget + this.bonusIncome - this.expensesMonth;
    this.budgetDay = Math.ceil(this.budgetMonth / 30);
  },

  getTargetMonth() {
    const period =  Math.ceil(targetAmountElem.value / this.budgetMonth);
      if (period === Infinity || isNaN(period)) {
        return 'Цель не будет достигнута';
      }
      return period;
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
    return this.budgetMonth *= periodRangeElem.value;
  },
};

calculateElem.addEventListener('click', appData.start.bind(appData));
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

cancelElem.addEventListener('click', appData.cancel.bind(appData));

addCompulsoryExpensesElem.addEventListener('click', appData.addExpensesInputsBlock);
addBonusIncomeElem.addEventListener('click', appData.addBonusIncomeInputsBlock);
periodRangeElem.addEventListener('input', () => {
  periodAmountElem.innerHTML = periodRangeElem.value;
  incomePeriodValueElem.value = appData.budgetMonth * periodRangeElem.value;
});