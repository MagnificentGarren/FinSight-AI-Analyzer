// Currency formatting utility
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Date formatting utility
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

// Date and time formatting
export const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const isStrongPassword = (password) => {
  return password.length >= 8;
};

// Calculate percentage
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

// Group expenses by category
export const groupByCategory = (expenses) => {
  return expenses.reduce((groups, expense) => {
    const category = expense.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(expense);
    return groups;
  }, {});
};

// Calculate total by category
export const sumByCategory = (expenses) => {
  return expenses.reduce((totals, expense) => {
    const category = expense.category;
    totals[category] = (totals[category] || 0) + expense.amount;
    return totals;
  }, {});
};

// Get category color
export const getCategoryColor = (category) => {
  const colors = {
    Food: '#FFB84D',
    Transport: '#5DADE2',
    Entertainment: '#F1948A',
    Utilities: '#82E0AA',
    Health: '#BB8FCE',
    Other: '#85C1E9',
  };
  return colors[category] || '#85C1E9';
};

// Check if array is empty or falsy
export const isEmpty = (value) => {
  return !Array.isArray(value) || value.length === 0;
};

// Local storage utilities
export const storage = {
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },
  getItem: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};
