import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, Shield, User as UserIcon, Wallet, TrendingUp, TrendingDown, LayoutDashboard, History, PieChart as PieChartIcon, Settings } from 'lucide-react';
import { Transaction, FinancialSummary, UserRole } from './types';
import { SummaryCard } from './components/SummaryCard';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { FinancialCharts } from './components/FinancialCharts';
import { LoadingScreen } from './components/LoadingScreen';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState<UserRole>('user');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('fintrack_transactions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('fintrack_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const summary = useMemo<FinancialSummary>(() => {
    const totalIncome = transactions
      .filter(tx => tx.type === 'income')
      .reduce((sum, tx) => sum + tx.amount, 0);
    
    const totalExpenses = transactions
      .filter(tx => tx.type === 'expense')
      .reduce((sum, tx) => sum + tx.amount, 0);

    return {
      totalIncome,
      totalExpenses,
      totalBalance: totalIncome - totalExpenses
    };
  }, [transactions]);

  const handleAddTransaction = (newTx: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTx,
      id: Math.random().toString(36).substring(2, 11),
    };
    setTransactions(prev => [transaction, ...prev]);
  };

  const handleDeleteTransaction = (id: string) => {
    if (role !== 'admin') return;
    setTransactions(prev => prev.filter(tx => tx.id !== id));
  };

  const [isResetConfirming, setIsResetConfirming] = useState(false);

  const handleReset = () => {
    if (role !== 'admin') return;
    setTransactions([]);
    localStorage.removeItem('fintrack_transactions');
    setIsResetConfirming(false);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === '1234') {
      setRole('admin');
      setIsPasswordModalOpen(false);
      setPasswordInput('');
      setPasswordError(false);
    } else {
      setPasswordError(true);
      setPasswordInput('');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${
      role === 'admin' ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loading" />}
        {isPasswordModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[120] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">Admin Access</h3>
              <p className="text-gray-500 mb-6 text-sm">Please enter the admin password to switch roles.</p>
              
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <input
                    type="password"
                    autoFocus
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter password"
                    className={`w-full px-4 py-2 bg-gray-50 border rounded-xl outline-none transition-all ${
                      passwordError ? 'border-rose-500 focus:ring-rose-500' : 'border-gray-200 focus:ring-gray-900'
                    } focus:ring-2`}
                  />
                  {passwordError && (
                    <p className="text-rose-500 text-xs mt-1 font-medium">Incorrect password. Please try again.</p>
                  )}
                </div>
                
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsPasswordModalOpen(false);
                      setPasswordInput('');
                      setPasswordError(false);
                    }}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-900 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
                  >
                    Verify
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
        {isResetConfirming && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[110] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">Reset All Data?</h3>
              <p className="text-gray-500 mb-6">This will permanently delete all your transactions. This action cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsResetConfirming(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-900 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-colors"
                >
                  Reset
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <aside className={`fixed left-0 top-0 h-full w-64 border-r hidden xl:flex flex-col p-6 transition-colors duration-500 ${
        role === 'admin' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
      }`}>
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
            role === 'admin' ? 'bg-white text-gray-950' : 'bg-gray-900 text-white'
          }`}>
            <Wallet size={24} />
          </div>
          <h1 className={`text-xl font-bold tracking-tight ${
            role === 'admin' ? 'text-white' : 'text-gray-900'
          }`}>Expense Buddy</h1>
        </div>

        {/* Role Switcher */}
        <div className="mb-8 px-2">
          <p className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${
            role === 'admin' ? 'text-gray-500' : 'text-gray-400'
          }`}>Current Role</p>
          <div className={`flex p-1 rounded-xl transition-colors ${
            role === 'admin' ? 'bg-gray-800' : 'bg-gray-100'
          }`}>
            <button
              onClick={() => {
                if (role !== 'admin') {
                  setIsPasswordModalOpen(true);
                }
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                role === 'admin' ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Shield size={14} />
              Admin
            </button>
            <button
              onClick={() => setRole('user')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                role === 'user' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <UserIcon size={14} />
              User
            </button>
          </div>
        </div>

        <nav className="space-y-1 flex-1">
          <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
            role === 'admin' ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'
          }`}>
            <LayoutDashboard size={20} />
            Dashboard
          </a>
          <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
            role === 'admin' ? 'text-gray-400 hover:bg-gray-800 hover:text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
          }`}>
            <History size={20} />
            Transactions
          </a>
          <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
            role === 'admin' ? 'text-gray-400 hover:bg-gray-800 hover:text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
          }`}>
            <PieChartIcon size={20} />
            Analytics
          </a>
        </nav>

        <div className={`pt-6 border-t space-y-1 ${
          role === 'admin' ? 'border-gray-800' : 'border-gray-100'
        }`}>
          {role === 'admin' && (
            <button
              onClick={() => setIsResetConfirming(true)}
              className="w-full flex items-center gap-3 px-4 py-3 text-rose-500 hover:bg-rose-500/10 rounded-xl font-medium transition-colors"
            >
              <RotateCcw size={20} />
              Reset Data
            </button>
          )}
          <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
            role === 'admin' ? 'text-gray-400 hover:bg-gray-800 hover:text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
          }`}>
            <Settings size={20} />
            Settings
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.main 
          key={role}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          variants={containerVariants}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="xl:ml-64 p-4 md:p-8 lg:p-12 max-w-7xl mx-auto"
        >
          <motion.header variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className={`text-3xl font-bold transition-colors ${
              role === 'admin' ? 'text-white' : 'text-gray-900'
            }`}>Financial Overview</h2>
            <p className={`mt-1 transition-colors ${
              role === 'admin' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {role === 'admin' ? 'Admin Mode: Full access to manage data.' : 'User Mode: View-only access to financial data.'}
            </p>
          </div>
          <TransactionForm onAdd={handleAddTransaction} role={role} />
        </motion.header>

        {/* Summary Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <SummaryCard 
            title="Total Balance" 
            amount={summary.totalBalance} 
            icon={Wallet} 
            color="blue"
            role={role}
          />
          <SummaryCard 
            title="Total Income" 
            amount={summary.totalIncome} 
            icon={TrendingUp} 
            color="green"
            trend={12}
            role={role}
          />
          <SummaryCard 
            title="Total Expenses" 
            amount={summary.totalExpenses} 
            icon={TrendingDown} 
            color="red"
            trend={-5}
            role={role}
          />
        </motion.div>

        {/* Charts */}
        <motion.div variants={itemVariants} className="mb-10">
          <FinancialCharts transactions={transactions} role={role} />
        </motion.div>

        {/* Transaction List */}
        <motion.div variants={itemVariants} className="mb-10">
          <TransactionList 
            transactions={transactions.slice(0, 10)} 
            onDelete={handleDeleteTransaction} 
            role={role}
          />
        </motion.div>
      </motion.main>
      </AnimatePresence>
    </div>
  );
}
