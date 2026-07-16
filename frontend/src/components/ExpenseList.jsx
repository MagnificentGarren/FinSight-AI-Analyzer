import './ExpenseList.css';

export default function ExpenseList({ expenses, loading }) {
  if (loading) {
    return <div className="expense-list-card"><p className="loading">Loading expenses...</p></div>;
  }

  if (!expenses || expenses.length === 0) {
    return <div className="expense-list-card"><p className="empty-state">No expenses recorded yet</p></div>;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const categoryColors = {
    Food: '#FFB84D',
    Transport: '#5DADE2',
    Entertainment: '#F1948A',
    Utilities: '#82E0AA',
    Health: '#BB8FCE',
    Other: '#85C1E9',
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="expense-list-card">
      <div className="list-header">
        <h2>Recent Expenses</h2>
        <div className="total">Total: {formatCurrency(totalExpenses)}</div>
      </div>

      <div className="expense-list">
        {expenses.map(expense => (
          <div key={expense.id} className="expense-item">
            <div className="expense-category-badge" style={{ backgroundColor: categoryColors[expense.category] }}>
              {expense.category.charAt(0)}
            </div>
            <div className="expense-details">
              <div className="expense-description">{expense.description}</div>
              <div className="expense-meta">
                <span className="category-label">{expense.category}</span>
                <span className="date-label">{formatDate(expense.date)}</span>
              </div>
            </div>
            <div className="expense-amount">
              {formatCurrency(expense.amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
