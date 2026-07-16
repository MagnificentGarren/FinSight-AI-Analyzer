import { useState } from 'react';
import { setBudget } from '../services/api';
import './BudgetForm.css';

const BUDGET_CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Health', 'Other'];

export default function BudgetForm({ userId, onBudgetAdded }) {
  const [formData, setFormData] = useState({
    category: BUDGET_CATEGORIES[0],
    limit: '',
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

    if (!formData.limit) {
      setError('Please enter a budget limit');
      return;
    }

    const limit = parseFloat(formData.limit);
    if (isNaN(limit) || limit <= 0) {
      setError('Please enter a valid budget amount');
      return;
    }

    setLoading(true);
    try {
      await setBudget(userId, formData.category, limit);
      setFormData({
        category: BUDGET_CATEGORIES[0],
        limit: '',
      });
      onBudgetAdded();
    } catch (err) {
      setError(err.message || 'Failed to set budget');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="budget-form-card">
      <h2>Set Budget Limit</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={loading}
            >
              {BUDGET_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="limit">Monthly Limit</label>
            <div className="input-prefix">
              <span>$</span>
              <input
                type="number"
                id="limit"
                name="limit"
                value={formData.limit}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Setting...' : 'Set Budget'}
        </button>
      </form>
    </div>
  );
}
