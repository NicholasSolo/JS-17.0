"use strict";

const allTextInputs = document.querySelectorAll('input[type="text"]'), // доп. переменная для работы с input [type="text"]
      calculateElem = document.getElementById('start'),
      cancelElem = document.getElementById('cancel'),
      addBonusIncomeElem = document.getElementsByTagName('button')[0],
      addCompulsoryExpensesElem = document.getElementsByTagName('button')[1],
      depositCheckboxElem = document.querySelector('#deposit-check'),
      additionalIncomeInputs = document.querySelectorAll('.additional_income-item'),
      budgetMonthValueElem = document.getElementsByClassName('budget_month-value')[0],
      budgetDayValueElem = document.getElementsByClassName('budget_day-value')[0],
      expensesMonthValueElem = document.getElementsByClassName('expenses_month-value')[0],
      additionalIncomeValueElem = document.getElementsByClassName('additional_income-value')[0],
      additionalExpensesValueElem = document.getElementsByClassName('additional_expenses-value')[0],
      incomePeriodValueElem = document.getElementsByClassName('income_period-value')[0],
      targetMonthValueElem = document.getElementsByClassName('target_month-value')[0],
      monthlyIncomeElem = document.querySelector('.salary-amount'),
      bonusIncomeItems = document.querySelectorAll('.income-items'),
      compulsoryExpensesTitleElem = document.querySelector('input.expenses-title'),
      expensesItems = document.querySelectorAll('.expenses-items'),
      additionalExpensesNameElem = document.querySelector('.additional_expenses-item'),
      targetAmountElem = document.querySelector('.target-amount'),
      periodRangeElem = document.querySelector('.period-select'),
      periodAmountElem = document.querySelector('.period-amount'),
      depositBankElem = document.querySelector('.deposit-bank'),
      depositAmountElem = document.querySelector('.deposit-amount'),
      depositPercentElem = document.querySelector('.deposit-percent'),
      sumInputs = document.querySelectorAll('input[placeholder="Сумма"]'),
      nameInputs = document.querySelectorAll('input[placeholder="Наименование"]');


function isNumber(number) {
  return !isNaN(parseFloat(number)) && isFinite(number);
} // Вспомогательная функция проверки на число


class AppData {
  constructor() {
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
  start() {
    if(depositCheckboxElem.checked && (depositBankElem.value === '' || depositAmountElem.value === '' || !isFinite(depositAmountElem.value) || depositPercentElem.value === '') ) {
      return;
    } 

    if (monthlyIncomeElem.value.trim() === '' || isNaN(monthlyIncomeElem.value)) {
      return;
    } else { this.budget = +monthlyIncomeElem.value; }

    this.getExpenses(); 
    this.getBonusIncome();
    this.getExpensesMonth();
    this.getAdditionalExpenses();
    this.getAdditionalIncome();
    this.getInfoDeposit();
    this.getBudget();
    this.showResult();

    calculateElem.style.display = 'none';
    cancelElem.style.display = 'block';

    addBonusIncomeElem.setAttribute('disabled', 'true');
    addCompulsoryExpensesElem.setAttribute('disabled', 'true');
    depositBankElem.setAttribute('disabled', 'true');
    depositCheckboxElem.setAttribute('disabled', 'true');

    [...allTextInputs].slice(0, 11).forEach((item) => {
      item.setAttribute('disabled', 'true');
    });
  }
  reset() {
    calculateElem.style.display = 'block';
    cancelElem.style.display = 'none';
    addBonusIncomeElem.removeAttribute('disabled');
    addCompulsoryExpensesElem.removeAttribute('disabled');
    depositBankElem.removeAttribute('disabled');
    depositCheckboxElem.removeAttribute('disabled');
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

    [...allTextInputs].slice(0, 11).forEach((item) => {
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
    
    depositCheckboxElem.checked = false;
    depositPercentElem.style.display = 'none';
    this.depositHandler();
  }
  showResult() {
    budgetMonthValueElem.value = this.budgetMonth;
    budgetDayValueElem.value = this.budgetDay;
    expensesMonthValueElem.value = this.expensesMonth;
    additionalExpensesValueElem.value = this.addExpenses.join(', ');
    additionalIncomeValueElem.value = this.addIncome.join(', ');
    targetMonthValueElem.value = this.getTargetMonth();
    incomePeriodValueElem.value = this.calcSavedMoney();
  }
  addExpensesInputsBlock() {
    const cloneExpensesItems = expensesItems[0].cloneNode(true);
    Array.from(cloneExpensesItems.children).forEach((item) => {
      item.value = '';
    });
    
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, addCompulsoryExpensesElem);
  
    let checkExpensesItems = document.querySelectorAll('.expenses-items');
    if (checkExpensesItems.length === 3) {
      addCompulsoryExpensesElem.style.display = 'none';
    }
  }
  getExpenses() {
    expensesItems.forEach((item) => {
      const expensesItem = item.querySelector('.expenses-title').value;
      const expensesCost = item.querySelector('.expenses-amount').value;

      if (expensesItem !== '' && expensesCost !== '') {
        this.expenses[expensesItem] = expensesCost;
      }
    });
  }
  addBonusIncomeInputsBlock() {
    const cloneBonusIncomeItems = bonusIncomeItems[0].cloneNode(true);
    Array.from(cloneBonusIncomeItems.children).forEach((item) => {
      item.value = '';
    });
    bonusIncomeItems[0].parentNode.insertBefore(cloneBonusIncomeItems, addBonusIncomeElem);

    let checkBonusIncomeItems = document.querySelectorAll('.income-items');
    if (checkBonusIncomeItems.length === 3) {
      addBonusIncomeElem.style.display = 'none';
    }
  }
  getBonusIncome() {
    bonusIncomeItems.forEach((item) => {
      const bonusIncomeItem = item.querySelector('.income-title').value;
      const bonusIncomeSum = item.querySelector('.income-amount').value;

      if (bonusIncomeSum !== '' && bonusIncomeItem !== '') {
        this.bonusIncome += +bonusIncomeSum;
      }
    });

  }
  getAdditionalExpenses() {
    const additionalExpenses = additionalExpensesNameElem.value.toLowerCase().split(",");
    additionalExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  }
  getAdditionalIncome() {
    additionalIncomeInputs.forEach((item) => {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  }
  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  }
  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = Math.ceil(this.budget + this.bonusIncome - this.expensesMonth + monthDeposit);
    this.budgetDay = Math.ceil(this.budgetMonth / 30);
  }
  getTargetMonth() {
    const period = Math.ceil(targetAmountElem.value / this.budgetMonth);
    if (period === Infinity || isNaN(period)) {
      return 'Цель не будет достигнута';
    }
    return period;
  }
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
  }
  calcSavedMoney() {
    return this.budgetMonth *= periodRangeElem.value;
  }
  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercentElem.value;
      this.moneyDeposit = depositAmountElem.value;
    }
   
  } 
  depositPercentValidator() {
    if (depositPercentElem.value < 0 || depositPercentElem.value > 100 || !isFinite(depositPercentElem.value)) {
      alert('Укажите корректное значение процентной ставки!');
      depositPercentElem.value = '';
      calculateElem.setAttribute("disabled", "true");
    } else { 
      calculateElem.removeAttribute("disabled");
    }
    }
  changePercent() {
      const selectValue = this.value;
      if (selectValue === 'other') {
        depositPercentElem.style.display = 'block';
        depositPercentElem.value = '';
        this.percentDeposit = depositPercentElem.value;
        depositPercentElem.addEventListener('input', appData.depositPercentValidator);
      } else { 
        calculateElem.removeAttribute("disabled");
        depositPercentElem.value = selectValue;
        depositPercentElem.style.display = 'none';
        depositPercentElem.removeEventListener('input', appData.depositPercentValidator);
      }
  }
  depositHandler() {
    if (depositCheckboxElem.checked) {
      depositBankElem.style.display = 'inline-block';
      depositAmountElem.style.display = 'inline-block';
      this.deposit = true;
      depositBankElem.addEventListener('change', this.changePercent);
    } else { 
      depositBankElem.style.display = 'none';
      depositAmountElem.style.display = 'none';
      depositBankElem.value = '';
      depositAmountElem.value = '';
      this.deposit = false;
      depositBankElem.removeEventListener('change', this.changePercent);
    }
  }

  checkInputValues() {
      document.querySelector('.data').addEventListener('change', (event) => {
          let target = event.target;
          if (target.matches('input[placeholder="Сумма"]')) {
            target.value = target.value.replace(/[^\d]/g, '');
          }

          if (target.matches('input[placeholder="Наименование"]')) {
            target.value = target.value.replace(/[^?!,.а-яА-ЯёЁ\s]/g, '');
          }
      })
  }
  eventListeners() {
    //обработчики событий
    calculateElem.addEventListener('click', this.start.bind(this));

    cancelElem.addEventListener('click', this.reset.bind(this));

    addCompulsoryExpensesElem.addEventListener('click', this.addExpensesInputsBlock.bind(this));
    addBonusIncomeElem.addEventListener('click', this.addBonusIncomeInputsBlock.bind(this));
    periodRangeElem.addEventListener('input', () => {
      periodAmountElem.innerHTML = periodRangeElem.value;
      incomePeriodValueElem.value = this.budgetMonth * periodRangeElem.value;
    });

    depositCheckboxElem.addEventListener('change', this.depositHandler.bind(this));
  }
}

const appData = new AppData();
appData.eventListeners();
appData.checkInputValues();



