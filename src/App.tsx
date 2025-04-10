import React, { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, Clock, DollarSign } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw';
  amount: number;
  timestamp: Date;
}

function App() {
  const [balance, setBalance] = useState<number>(0);
  const [amount, setAmount] = useState<string>('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleTransaction = (type: 'deposit' | 'withdraw') => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (type === 'withdraw' && numAmount > balance) {
      alert('Insufficient funds');
      return;
    }

    const newBalance = type === 'deposit' ? balance + numAmount : balance - numAmount;
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      amount: numAmount,
      timestamp: new Date(),
    };

    setBalance(newBalance);
    setTransactions([newTransaction, ...transactions]);
    setAmount('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-green-400 p-8">
      <div className="max-w-md mx-auto space-y-6">
        {/* Wallet Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Crypto Wallet</h1>
            <Wallet className="text-purple-600" size={28} />
          </div>
          <div className="text-center py-6">
            <p className="text-gray-600">Current Balance</p>
            <p className="text-4xl font-bold text-gray-800">${balance.toFixed(2)}</p>
          </div>
        </div>

        {/* Transaction Controls */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
          <div className="space-y-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleTransaction('deposit')}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <ArrowDownLeft size={20} />
                Deposit
              </button>
              <button
                onClick={() => handleTransaction('withdraw')}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <ArrowUpRight size={20} />
                Withdraw
              </button>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
            <Clock className="text-purple-600" size={20} />
          </div>
          <div className="space-y-3">
            {transactions.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No transactions yet</p>
            ) : (
              transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {tx.type === 'deposit' ? (
                      <ArrowDownLeft className="text-green-500" size={20} />
                    ) : (
                      <ArrowUpRight className="text-red-500" size={20} />
                    )}
                    <div>
                      <p className="font-medium text-gray-800">
                        {tx.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {tx.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className={`font-semibold ${
                    tx.type === 'deposit' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {tx.type === 'deposit' ? '+' : '-'}${tx.amount.toFixed(2)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;