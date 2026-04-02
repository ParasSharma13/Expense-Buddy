import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { motion } from 'motion/react';
import { Transaction, UserRole } from '../types';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { cn } from '../lib/utils';

interface FinancialChartsProps {
  transactions: Transaction[];
  role: UserRole;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];

export function FinancialCharts({ transactions, role }: FinancialChartsProps) {
  // Area Chart Data: Daily Balance for current month
  const now = new Date();
  const days = eachDayOfInterval({
    start: startOfMonth(now),
    end: endOfMonth(now),
  });

  const areaData = days.map(day => {
    const dayTransactions = transactions.filter(tx => isSameDay(new Date(tx.date), day));
    const income = dayTransactions.filter(tx => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0);
    const expense = dayTransactions.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0);
    
    return {
      date: format(day, 'MMM dd'),
      income,
      expense,
    };
  });

  // Pie Chart Data: Expenses by Category
  const expenseByCategory = transactions
    .filter(tx => tx.type === 'expense')
    .reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {} as Record<string, number>);

  const pieData = Object.entries(expenseByCategory).map(([name, value]) => ({ name, value }));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      <div className={cn(
        "lg:col-span-2 p-6 rounded-2xl border transition-all duration-500",
        role === 'admin' 
          ? "bg-gray-900 border-gray-800 shadow-2xl shadow-black/50" 
          : "bg-white border-gray-100 shadow-sm"
      )}>
        <h3 className={cn(
          "text-lg font-bold mb-6 transition-colors",
          role === 'admin' ? "text-white" : "text-gray-900"
        )}>Cash Flow (Current Month)</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke={role === 'admin' ? '#1f2937' : '#f3f4f6'} 
              />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: role === 'admin' ? '#4b5563' : '#9ca3af' }}
                interval={Math.floor(areaData.length / 5)}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: role === 'admin' ? '#4b5563' : '#9ca3af' }}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: role === 'admin' ? '#111827' : '#fff', 
                  borderRadius: '12px', 
                  border: 'none', 
                  boxShadow: role === 'admin' ? '0 20px 25px -5px rgb(0 0 0 / 0.5)' : '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                  color: role === 'admin' ? '#fff' : '#000'
                }}
                itemStyle={{ color: role === 'admin' ? '#fff' : '#000' }}
              />
              <Area 
                type="monotone" 
                dataKey="income" 
                stroke="#10b981" 
                fillOpacity={1} 
                fill="url(#colorIncome)" 
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="expense" 
                stroke="#ef4444" 
                fillOpacity={1} 
                fill="url(#colorExpense)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={cn(
        "p-6 rounded-2xl border transition-all duration-500",
        role === 'admin' 
          ? "bg-gray-900 border-gray-800 shadow-2xl shadow-black/50" 
          : "bg-white border-gray-100 shadow-sm"
      )}>
        <h3 className={cn(
          "text-lg font-bold mb-6 transition-colors",
          role === 'admin' ? "text-white" : "text-gray-900"
        )}>Spending by Category</h3>
        <div className="h-[300px] w-full">
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke={role === 'admin' ? '#111827' : '#fff'}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: role === 'admin' ? '#111827' : '#fff', 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: role === 'admin' ? '0 20px 25px -5px rgb(0 0 0 / 0.5)' : '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    color: role === 'admin' ? '#fff' : '#000'
                  }}
                  itemStyle={{ color: role === 'admin' ? '#fff' : '#000' }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 italic">
              No data to visualize
            </div>
          )}
        </div>
        <div className="mt-4 space-y-2">
          {pieData.slice(0, 4).map((entry, index) => (
            <div key={entry.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className={cn(
                  "transition-colors",
                  role === 'admin' ? "text-gray-400" : "text-gray-600"
                )}>{entry.name}</span>
              </div>
              <span className={cn(
                "font-medium transition-colors",
                role === 'admin' ? "text-white" : "text-gray-900"
              )}>₹{entry.value.toLocaleString('en-IN')}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
