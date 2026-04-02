# 💰 Expense Buddy - Personal Finance Manager

Welcome to **Expense Buddy**! This is a sleek, modern, and highly interactive personal finance dashboard designed to help you track your money with ease.

---

## 🚀 Quick Start & Admin Access

The app starts in **User Mode** by default, which allows you to view the financial data. To manage transactions or reset data, you need to switch to **Admin Mode**.

- **Admin Password:** `1234`
- **How to switch:** Click the "Admin" button in the sidebar and enter the password.

---

## 🎨 Design & Development

This project was built with a focus on **premium user experience** and **fluid interactions**. 

> **Note:** While I used advanced AI tools to accelerate the coding and implementation process, the **design vision, layout ideas, and feature requirements are entirely my own.** I wanted a dashboard that felt "alive" with animations but remained strictly professional.

---

## 🛠️ How It Works

Expense Buddy is a "Single Page Application" (SPA) built with **React** and **TypeScript**. It uses the following technologies:

- **Tailwind CSS:** For the beautiful, responsive styling.
- **Motion (Framer Motion):** For all the smooth entrance and hover animations.
- **Recharts:** To visualize your income and expenses through interactive charts.
- **Lucide React:** For the clean, modern iconography.
- **Local Storage:** Your data is saved directly in your browser, so it stays there even if you refresh the page!

---

## 📂 Project Structure

Here is a simple breakdown of how the code is organized:

```text
src/
├── components/          # Reusable UI parts
│   ├── SummaryCard      # The top balance/income/expense cards
│   ├── TransactionForm  # The popup to add new money entries (Admin only)
│   ├── TransactionList  # The table showing your history
│   ├── FinancialCharts  # The beautiful graphs and pie charts
│   └── LoadingScreen    # The cool splash screen you see at the start
├── lib/
│   └── utils.ts         # Small helpers for styling
├── types.ts             # The "blueprints" for our data (Transactions, Roles, etc.)
├── App.tsx              # The heart of the app (Logic, State, and Layout)
└── index.css            # Global styles and Tailwind setup
```

---

## ✨ Key Features

1. **Dual Themes:** A clean "Light Mode" for users and a sophisticated "Dark Mode" for Admins, making it easy to differentiate between roles.
2. **Smooth Role Switching:** Experience a fluid cross-fade and slide animation when switching between User and Admin modes.
3. **Real-time Analytics:** Interactive charts (Area and Pie) update instantly as you manage your transactions.
4. **Indian Currency Support:** Fully formatted for Rupees (₹) using the Indian numbering system (e.g., ₹1,00,000.00).
5. **Safety First:** Critical Admin actions like "Reset Data" require explicit confirmation through custom, animated modals.
6. **Responsive Design:** A desktop-first layout that scales beautifully down to mobile devices.

---

Enjoy managing your finances with **Expense Buddy**! 💸
