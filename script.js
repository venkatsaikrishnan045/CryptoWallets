let balance = 0;
const transactions = [];

function updateBalance() {
    document.querySelector('.balance-amount').textContent = `$${balance.toFixed(2)}`;
}

function formatTimestamp(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

function updateTransactionsList() {
    const transactionsList = document.getElementById('transactions-list');
    
    if (transactions.length === 0) {
        transactionsList.innerHTML = '<p class="no-transactions">No transactions yet</p>';
        return;
    }

    transactionsList.innerHTML = transactions.map(tx => `
        <div class="transaction-item">
            <div class="transaction-info">
                <div class="transaction-icon">
                    ${tx.type === 'deposit' ? `
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 19V5M5 12l7-7 7 7"/>
                        </svg>
                    ` : `
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 5v14M5 12l7 7 7-7"/>
                        </svg>
                    `}
                </div>
                <div class="transaction-details">
                    <span class="transaction-type">${tx.type === 'deposit' ? 'Deposit' : 'Withdrawal'}</span>
                    <span class="transaction-timestamp">${formatTimestamp(tx.timestamp)}</span>
                </div>
            </div>
            <span class="transaction-amount ${tx.type === 'deposit' ? 'amount-deposit' : 'amount-withdraw'}">
                ${tx.type === 'deposit' ? '+' : '-'}$${tx.amount.toFixed(2)}
            </span>
        </div>
    `).join('');
}

function handleTransaction(type) {
    const amountInput = document.getElementById('amount');
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    if (type === 'withdraw' && amount > balance) {
        alert('Insufficient funds');
        return;
    }

    if (type === 'deposit') {
        balance += amount;
    } else {
        balance -= amount;
    }

    transactions.unshift({
        id: Math.random().toString(36).substr(2, 9),
        type,
        amount,
        timestamp: new Date()
    });

    updateBalance();
    updateTransactionsList();
    amountInput.value = '';
}

// Initialize the UI
updateBalance();
updateTransactionsList();