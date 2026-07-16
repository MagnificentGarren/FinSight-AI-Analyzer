import { useState } from 'react';
import { logExpense } from '../services/api';
import './ExpenseForm.css';

const EXPENSE_CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Health', 'Other'];

export default function ExpenseForm({ userId, onExpenseAdded }) {
  const [formData, setFormData] = useState({
    amount: '',
    category: EXPENSE_CATEGORIES[0],
    description: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.amount || !formData.description) {
      setError('Please fill in all fields');
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      const date = new Date(formData.date).toISOString();
      await logExpense(
        userId,
        amount,
        formData.category,
        formData.description,
        date
      );
      setFormData({
        amount: '',
        category: EXPENSE_CATEGORIES[0],
        description: '',
        date: new Date().toISOString().split('T')[0],
      });
      onExpenseAdded();
    } catch (err) {
      setError(err.message || 'Failed to log expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="expense-form-card">
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <div className="input-prefix">
              <span>$</span>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={loading}
            >
              {EXPENSE_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g., Weekly grocery shopping"
            disabled={loading}
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Adding...' : 'Add Expense'}
        </button>
      </form>
    </div>
  );
}
