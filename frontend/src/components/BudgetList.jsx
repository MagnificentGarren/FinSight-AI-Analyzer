import { useEffect, useState } from 'react';
import { getExpenses } from '../services/api';
import './BudgetList.css';

export default function BudgetList({ budgets, expenses, loading }) {
  const [budgetsWithProgress, setBudgetsWithProgress] = useState([]);

  useEffect(() => {
    const calculateProgress = () => {
      const progress = budgets.map(budget => {
        const categoryExpenses = expenses.filter(
          exp => exp.category === budget.category
        );
        const spent = categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0);
        const percentage = (spent / budget.targetAmount) * 100;

        return {
          ...budget,
          spent,
          percentage: Math.min(percentage, 100),
          remaining: budget.targetAmount - spent,
          isOverBudget: spent > budget.targetAmount,
        };
      });
      setBudgetsWithProgress(progress);
    };

    calculateProgress();
  }, [budgets, expenses]);

  if (loading) {
    return <div className="budget-list-card"><p className="loading">Loading budgets...</p></div>;
  }

  if (!budgetsWithProgress || budgetsWithProgress.length === 0) {
    return <div className="budget-list-card"><p className="empty-state">No budgets set yet</p></div>;
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="budget-list-card">
      <h2>Budget Tracking</h2>

      <div className="budgets-list">
        {budgetsWithProgress.map(budget => (
          <div key={budget.id} className={`budget-item ${budget.isOverBudget ? 'over-budget' : ''}`}>
            <div className="budget-info">
              <div className="budget-header">
                <h3>{budget.category}</h3>
                <span className={`budget-status ${budget.isOverBudget ? 'warning' : 'healthy'}`}>
                  {budget.isOverBudget ? '⚠️ Over Budget' : '✓ On Track'}
                </span>
              </div>
              <div className="budget-amounts">
                <span>Spent: <strong>{formatCurrency(budget.spent)}</strong> / {formatCurrency(budget.targetAmount)}</span>
              </div>
            </div>

            <div className="progress-bar-container">
              <div className="progress-bar">
                <div
                  className={`progress-fill ${budget.isOverBudget ? 'over-limit' : ''}`}
                  style={{ width: `${budget.percentage}%` }}
                ></div>
              </div>
              <div className="progress-text">
                {budget.percentage.toFixed(0)}%
              </div>
            </div>

            <div className="budget-remaining">
              {budget.isOverBudget ? (
                <span className="over-amount">Over by {formatCurrency(Math.abs(budget.remaining))}</span>
              ) : (
                <span className="remaining-amount">{formatCurrency(budget.remaining)} remaining</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
