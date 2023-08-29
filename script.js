document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('budget-form');
  const budgetList = document.getElementById('budget-list');
  let items = [];

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    let description = document.getElementById('description').value;
    if (description === 'Other') {
      description = document.getElementById('custom-description').value;
    }
    
    if (!description) {
      alert("Description is required.");
      return;
    }

    const amountStr = document.getElementById('amount').value;
    const date = document.getElementById('transaction-date').value;
    const amount = parseFloat(amountStr);
    const type = document.getElementById('type').value;
    const writer = document.getElementById('writer').value; // Existing code

    if (isNaN(amount) || amountStr === '') {
      alert('Please enter a valid amount.');
      return;
    }

    if (!date) {
      alert("Date is required.");
      return;
    }

    const listItem = document.createElement('li');
    listItem.textContent = `${writer} - ${description} (${date}): ${type === 'income' ? '+' : '-'}$${amount.toFixed(2)}`;
    listItem.className = type;

    const item = {
      description,
      amount,
      type,
      date,
      writer, // Existing code
      element: listItem
    };

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', function() {
      const index = items.indexOf(item);
      if (index !== -1) {
        items.splice(index, 1);
      }
      listItem.remove();
      updateTotal();
    });

    listItem.appendChild(removeButton);
    budgetList.appendChild(listItem);

    items.push(item);
    updateTotal();
  });

  document.getElementById('description').addEventListener('change', function() {
    const description = document.getElementById('description').value;
    const customDescription = document.getElementById('custom-description');
    
    if (description === 'Other') {
      customDescription.style.display = 'block';
    } else {
      customDescription.style.display = 'none';
    }
  });

  function updateTotal() {
    let totalIncome = 0;
    let totalExpense = 0;

    for (const item of items) {
      if (item.type === 'income') {
        totalIncome += item.amount;
      } else {
        totalExpense += item.amount;
      }
    }

    const finalBalance = totalIncome - totalExpense;

    document.getElementById('total-income').textContent = `Total Income: $${totalIncome.toFixed(2)}`;
    document.getElementById('total-expense').textContent = `Total Expense: $${totalExpense.toFixed(2)}`;
    document.getElementById('total').textContent = `Final Balance: $${finalBalance.toFixed(2)}`;
  }
});

