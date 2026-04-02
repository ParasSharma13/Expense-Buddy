import React from 'react';
import { Trash2, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Transaction, UserRole } from '../types';
import { format } from 'date-fns';

import { cn } from '../lib/utils';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  role: UserRole;
}

export function TransactionList({ transactions, onDelete, role }: TransactionListProps) {
  return (
    <div className={cn(
      "rounded-2xl border overflow-hidden transition-all duration-500",
      role === 'admin' 
        ? "bg-gray-900 border-gray-800 shadow-2xl shadow-black/50" 
        : "bg-white border-gray-100 shadow-sm"
    )}>
      <div className={cn(
        "p-6 border-b transition-colors",
        role === 'admin' ? "border-gray-800" : "border-gray-50"
      )}>
        <h2 className={cn(
          "text-lg font-bold transition-colors",
          role === 'admin' ? "text-white" : "text-gray-900"
        )}>Recent Transactions</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className={cn(
              "text-xs font-semibold uppercase tracking-wider transition-colors",
              role === 'admin' ? "bg-gray-800/50 text-gray-500" : "bg-gray-50/50 text-gray-500"
            )}>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3 text-right">Amount</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className={cn(
            "divide-y transition-colors",
            role === 'admin' ? "divide-gray-800" : "divide-gray-50"
          )}>
            <AnimatePresence initial={false}>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic">
                    No transactions yet. Add one to get started!
                  </td>
                </tr>
              ) : (
                transactions.map((tx, index) => (
                  <motion.tr
                    key={tx.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      "transition-colors group",
                      role === 'admin' ? "hover:bg-gray-800/50" : "hover:bg-gray-50/50"
                    )}
                  >
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {format(new Date(tx.date), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "p-2 rounded-lg transition-colors",
                          tx.type === 'income' 
                            ? (role === 'admin' ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600")
                            : (role === 'admin' ? "bg-rose-500/10 text-rose-400" : "bg-rose-50 text-rose-600")
                        )}>
                          {tx.type === 'income' ? <ArrowUpRight size={16} /> : <ArrowDownLeft size={16} />}
                        </div>
                        <span className={cn(
                          "text-sm font-medium transition-colors",
                          role === 'admin' ? "text-white" : "text-gray-900"
                        )}>{tx.description}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors",
                        role === 'admin' ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"
                      )}>
                        {tx.category}
                      </span>
                    </td>
                    <td className={cn(
                      "px-6 py-4 text-sm font-bold text-right transition-colors",
                      tx.type === 'income' 
                        ? (role === 'admin' ? "text-emerald-400" : "text-emerald-600")
                        : (role === 'admin' ? "text-rose-400" : "text-rose-600")
                    )}>
                      {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {role === 'admin' && (
                        <button
                          onClick={() => onDelete(tx.id)}
                          className="text-gray-400 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
