import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { UserRole } from '../types';

interface SummaryCardProps {
  title: string;
  amount: number;
  icon: LucideIcon;
  trend?: number;
  color: 'blue' | 'green' | 'red' | 'purple';
  role: UserRole;
}

export function SummaryCard({ title, amount, icon: Icon, trend, color, role }: SummaryCardProps) {
  const colorClasses = {
    blue: role === 'admin' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-600 border-blue-100',
    green: role === 'admin' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border-emerald-100',
    red: role === 'admin' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-rose-50 text-rose-600 border-rose-100',
    purple: role === 'admin' ? 'bg-violet-500/10 text-violet-400 border-violet-500/20' : 'bg-violet-50 text-violet-600 border-violet-100',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "p-6 rounded-2xl border transition-all duration-500 cursor-default",
        role === 'admin' 
          ? "bg-gray-900 border-gray-800 shadow-2xl shadow-black/50 hover:shadow-black/70" 
          : "bg-white border-gray-100 shadow-sm hover:shadow-xl"
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-3 rounded-xl border", colorClasses[color])}>
          <Icon size={24} />
        </div>
        {trend !== undefined && (
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            trend >= 0 
              ? (role === 'admin' ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600")
              : (role === 'admin' ? "bg-rose-500/10 text-rose-400" : "bg-rose-50 text-rose-600")
          )}>
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <div>
        <p className={cn(
          "text-sm font-medium mb-1 transition-colors",
          role === 'admin' ? "text-gray-400" : "text-gray-500"
        )}>{title}</p>
        <h3 className={cn(
          "text-2xl font-bold transition-colors",
          role === 'admin' ? "text-white" : "text-gray-900"
        )}>
          ₹{amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h3>
      </div>
    </motion.div>
  );
}
