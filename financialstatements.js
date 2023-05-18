function calculateOwnerEquity() {
    const capital = parseFloat(document.getElementsByName('capital')[0].value);
    const withdrawals = parseFloat(document.getElementsByName('withdrawals')[0].value);
    const netIncome = parseFloat(document.getElementById('net_income').textContent);
    const totalEquity = capital + netIncome - withdrawals;
    document.getElementById('total_equity').textContent = totalEquity.toFixed(2);
  }
  function addOwnerEquityRow() {
    const table = document.getElementById('owner_equity_table');
    const newRow = document.createElement('tr');
  
    const componentCell = document.createElement('td');
    componentCell.innerHTML = '<input type="text" name="component" required>';
    const amountCell = document.createElement('td');
    amountCell.innerHTML = '<input type="number" name="amount" step="0.01" required>';
  
    newRow.appendChild(componentCell);
    newRow.appendChild(amountCell);
  
    table.appendChild(newRow);
  }
  
  
  
  function calculateIncomeStatement() {
    const revenue = parseFloat(document.getElementsByName('revenue')[0].value);
    const expenses = parseFloat(document.getElementsByName('expenses')[0].value);
    const netIncome = revenue - expenses;
    document.getElementById('net_income').textContent = netIncome.toFixed(2);
  }

  function addIncomeStatementRow() {
    const table = document.getElementById('income_statement_table');
    const newRow = document.createElement('tr');
  
    const revenueCell = document.createElement('td');
    revenueCell.innerHTML = '<input type="text" name="revenue" required>';
    const amountCell = document.createElement('td');
    amountCell.innerHTML = '<input type="number" name="amount" step="0.01" required>';
  
    newRow.appendChild(revenueCell);
    newRow.appendChild(amountCell);
  
    table.appendChild(newRow);
  }
  
  

  function calculateBalanceSheet() {
    const cash = parseFloat(document.getElementsByName('cash')[0].value);
    const accountsPayable = parseFloat(document.getElementsByName('accounts_payable')[0].value);
    const accountsReceivable = parseFloat(document.getElementsByName('accounts_receivable')[0].value);
    const loansPayable = parseFloat(document.getElementsByName('loans_payable')[0].value);
  
    const assetsTotal = cash + accountsReceivable;
    const liabilitiesTotal = accountsPayable + loansPayable;
    const ownerEquity = parseFloat(document.getElementById('total_equity').textContent);
    const totalLiabilitiesEquity = liabilitiesTotal + ownerEquity;
  
    document.getElementById('assets_total').textContent = assetsTotal.toFixed(2);
    document.getElementById('liabilities_total').textContent = liabilitiesTotal.toFixed(2);
    document.getElementById('total_liabilities_equity').textContent = totalLiabilitiesEquity.toFixed(2);
  }
  function addBalanceSheetRow() {
    const table = document.getElementById('balance_sheet_table');
    const newRow = document.createElement('tr');
  
    const assetCell = document.createElement('td');
    assetCell.innerHTML = '<input type="text" name="asset" required>';
    const amountCell = document.createElement('td');
    amountCell.innerHTML = '<input type="number" name="amount" step="0.01" required>';
    const liabilityCell = document.createElement('td');
    liabilityCell.innerHTML = '<input type="text" name="liability" required>';
    const liabilityAmountCell = document.createElement('td');
    liabilityAmountCell.innerHTML = '<input type="number" name="liability_amount" step="0.01" required>';
  
    newRow.appendChild(assetCell);
    newRow.appendChild(amountCell);
    newRow.appendChild(liabilityCell);
    newRow.appendChild(liabilityAmountCell);
  
    table.appendChild(newRow);
  }
  
  
  