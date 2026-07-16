const API_BASE_URL = 'http://localhost:5157/api';

// User Registration
export const registerUser = async (username, email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Expenses
export const logExpense = async (userId, amount, category, description, date) => {
  try {
    const response = await fetch(`${API_BASE_URL}/expenses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, amount, category, description, date }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to log expense');
    }

    return await response.json();
  } catch (error) {
    console.error('Expense logging error:', error);
    throw error;
  }
};

export const getExpenses = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/expenses/user/${userId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch expenses');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch expenses error:', error);
    throw error;
  }
};

// Budgets
export const setBudget = async (userId, category, limit) => {
  try {
    const response = await fetch(`${API_BASE_URL}/budgets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, category, limit }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to set budget');
    }

    return await response.json();
  } catch (error) {
    console.error('Budget setting error:', error);
    throw error;
  }
};

export const getBudgets = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/budgets/user/${userId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch budgets');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch budgets error:', error);
    throw error;
  }
};
