import { useEffect, useState } from 'react';
import { getExpenses, getBudgets } from '../services/api';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import BudgetForm from './BudgetForm';
import BudgetList from './BudgetList';
import './Dashboard.css';

export default function Dashboard({ userId, onLogout }) {
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loadingExpenses, setLoadingExpenses] = useState(false);
  const [loadingBudgets, setLoadingBudgets] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingExpenses(true);
      setLoadingBudgets(true);

      try {
        const [expensesData, budgetsData] = await Promise.all([
          getExpenses(userId),
          getBudgets(userId),
        ]);

        setExpenses(Array.isArray(expensesData) ? expensesData : []);
        setBudgets(Array.isArray(budgetsData) ? budgetsData : []);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoadingExpenses(false);
        setLoadingBudgets(false);
      }
    };

    fetchData();
  }, [userId, refreshTrigger]);

  const handleExpenseAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleBudgetAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalBudgets = budgets.reduce((sum, budget) => sum + budget.targetAmount, 0);
  const totalSpent = budgets.reduce((sum, budget) => {
    const spent = expenses
      .filter(exp => exp.category === budget.category)
      .reduce((s, exp) => s + exp.amount, 0);
    return sum + spent;
  }, 0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>FinSight Dashboard</h1>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-label">Total Expenses</div>
          <div className="stat-value">{formatCurrency(totalExpenses)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Budgets</div>
          <div className="stat-value">{formatCurrency(totalBudgets)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Budget vs Spent</div>
          <div className={`stat-value ${totalSpent > totalBudgets ? 'over' : ''}`}>
            {formatCurrency(totalSpent)} / {formatCurrency(totalBudgets)}
          </div>
        </div>
      </div>

      <main className="dashboard-main">
        <div className="column left-column">
          <ExpenseForm userId={userId} onExpenseAdded={handleExpenseAdded} />
          <BudgetForm userId={userId} onBudgetAdded={handleBudgetAdded} />
        </div>

        <div className="column right-column">
          <ExpenseList expenses={expenses} loading={loadingExpenses} />
          <BudgetList budgets={budgets} expenses={expenses} loading={loadingBudgets} />
        </div>
      </main>
    </div>
  );
}
