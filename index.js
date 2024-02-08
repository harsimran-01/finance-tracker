'use strict';



const formEl = document.getElementById('form');

const listEl = document.getElementById('list-container');

const transactionEl = document.getElementById('transaction');

const amountEl = document.getElementById('amount');

const balanceEl = document.getElementById('balance');

const incomeEl = document.getElementById('income');

const expenseEl = document.getElementById('expense');

const btnForm = document.getElementById('button');


let transactions = [];
let isEditing = false;
let editId = null;
listEl.innerHTML = null;

let income = 0;
let expense = 0;
let balance = 0;

function init() {
  listEl.innerHTML = null;
  isEditing = false;
  editId = null;
  btnForm.innerText = `add transaction`;
  transactions.forEach((transaction) => {
    addTransactionToDom(transaction);
  });

  updateValue();
}


// function addTransactionToDom({ id, title, amount }) {
//   const liEl = document.createElement('li');

//   liEl.className = amount > 0 ? 'plus' : 'minus';
//   liEl.innerHTML = `<span>${title}</span> <span>₹ ${amount}</span>
//             <button class="btn update-btn" onclick=updateItem(${id}) >
//               <i class="fa-sharp fa-solid fa-pen"></i>
//             </button>
//             <button class="btn delete-btn" onclick=deleteItem(${id})>
//               <i class="fa-sharp fa-solid fa-xmark"></i>
//             </button>`;

//   listEl.appendChild(liEl);
// }
function addTransactionToDom({ id, title, amount }) {
    const liEl = document.createElement('li');
  
    liEl.className = amount > 0 ? 'plus' : 'minus';
    liEl.innerHTML = `<span>${title}</span> <span>₹ ${amount}</span>`;
  
    listEl.appendChild(liEl);
  }
  

function updateValue() {
  income = transactions
    .map((val) => val.amount)
    .filter((val) => val > 0)
    .reduce((prev, val) => prev + val, 0);
  console.log(income);
  expense = transactions
    .map((val) => val.amount)
    .filter((val) => val < 0)
    .reduce((prev, val) => prev + val, 0);

  console.log(expense);

  balance = transactions
    .map((val) => val.amount)
    .reduce((prev, val) => prev + val, 0);

  console.log(balance);

  balanceEl.innerText = `₹ ${balance}`;
  incomeEl.innerText = `₹ ${income}`;
  expenseEl.innerText = `₹ ${expense}`;
}


formEl.addEventListener('submit', function (e) {
  if (transactionEl.value === '' || amountEl.value === '') {
    alert(`enter the transaction details`);
  } else {
    e.preventDefault();

    const transactionName = transactionEl.value;
    const transactionAmount = Number(amountEl.value);
    
    if (isEditing) {
      btnForm.innerText = `add transaction`;

      transactions = transactions.map((transaction) => {
        if (transaction.id === editId) {
          return {
            id: editId,
            title: transactionEl.value,
            amount: Number(amountEl.value),
          };
        } else {
          return transaction;
        }
      });

      init();
    }
    
    else {
      
      const transaction = {
        id: Date.now(),
        title: transactionName,
        amount: transactionAmount,
      };

      

      transactions.push(transaction);

      
      addTransactionToDom(transaction);
    }

    
    updateValue();

    transactionEl.value = null;
    amountEl.value = null;
  }
});

