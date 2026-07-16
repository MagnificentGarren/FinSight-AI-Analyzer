# FinSight AI Analyzer - Frontend

A modern React frontend for FinSight, a financial management and analytics platform powered by AI insights.

## 🚀 Features

### User Authentication
- User registration with validation
- Email and password strength verification
- Session persistence using localStorage
- Automatic login on page refresh

### Dashboard
- Real-time expense and budget tracking
- Dashboard statistics (Total Expenses, Total Budgets, Budget vs Spent)
- Responsive grid layout
- Quick logout functionality

### Expense Management
- Log new expenses with categories and descriptions
- Categorized expense tracking (Food, Transport, Entertainment, Utilities, Health, Other)
- View expense history with date filtering
- Color-coded category badges
- Real-time expense total calculations
- Date picker for expense recording

### Budget Management
- Set monthly budget limits per category
- Visual progress bars showing budget utilization
- Over-budget alerts with warning indicators
- Budget vs actual spending comparison
- Track remaining budget per category
- Budget status indicator (On Track / Over Budget)

### User Experience
- **Error Boundary**: Global error handling with recovery options
- **Toast Notifications**: Real-time feedback for user actions
- **Skeleton Loading**: Smooth loading states with shimmer animations
- **Responsive Design**: Mobile-friendly layout
- **Modern UI**: Gradient backgrounds and smooth transitions

## 📦 Tech Stack

- **React 19.2.7** - Modern UI library
- **Vite 8.1.1** - Fast build tool and dev server
- **CSS3** - Responsive styling with flexbox and grid
- **Oxlint** - Code quality and linting

## 🛠️ Development

### Setup
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Runs on `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm preview
```

### Linting
```bash
npm run lint
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/        # React components
│   │   ├── Dashboard.jsx  # Main dashboard
│   │   ├── RegisterForm.jsx
│   │   ├── ExpenseForm.jsx
│   │   ├── ExpenseList.jsx
│   │   ├── BudgetForm.jsx
│   │   ├── BudgetList.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── Toast.jsx
│   │   └── Skeleton.jsx
│   ├── services/          # API integration
│   │   └── api.js
│   ├── utils/             # Utility functions
│   │   └── helpers.js
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # React DOM entry
│   └── index.css         # Global styles
├── public/               # Static assets
├── index.html           # HTML entry point
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies

```

## 🔌 API Integration

The frontend connects to the backend API at `http://localhost:5157/api`

### Endpoints Used:
- `POST /api/users/register` - User registration
- `POST /api/expenses` - Log new expense
- `GET /api/expenses/user/{userId}` - Fetch user expenses
- `POST /api/budgets` - Set budget limit
- `GET /api/budgets/user/{userId}` - Fetch user budgets

## 🎨 Design System

### Colors
- **Primary**: #667eea
- **Primary Dark**: #764ba2
- **Accent (Success)**: #27ae60
- **Warning**: #e74c3c
- **Background**: #f5f5f5

### Typography
- **Font Family**: System fonts with fallback
- **Heading Weight**: 600
- **Body Weight**: 400

## 🚀 Components

### Dashboard
Main hub showing all financial data and forms for adding expenses/budgets.

### RegisterForm
User registration interface with validation.

### ExpenseForm & ExpenseList
Components for managing user expenses.

### BudgetForm & BudgetList
Components for managing budget limits and tracking.

### ErrorBoundary
Catches and displays application errors gracefully.

### Toast
Notification system for user feedback.

### Skeleton
Loading placeholders for better UX during data fetching.

## 📝 Utilities

The `helpers.js` file includes:
- `formatCurrency()` - Format numbers as currency
- `formatDate()` - Format date strings
- `isValidEmail()` - Email validation
- `isStrongPassword()` - Password validation
- `calculatePercentage()` - Percentage calculations
- `getCategoryColor()` - Category-specific colors
- `storage` - Safe localStorage wrapper

## 🔒 Security

- Form validation on client-side
- Secure password handling
- HTTP API communication (upgrade to HTTPS in production)
- Error boundary prevents app crashes

## 📱 Responsive Breakpoints

- **Mobile**: < 600px
- **Tablet**: 600px - 1000px
- **Desktop**: > 1000px

## 🐛 Debugging

- Error messages displayed in console and UI
- Toast notifications for user actions
- Error boundary catches unhandled errors

## 📄 License

Proprietary - FinSight AI Analyzer

## 🤝 Support

For issues or questions, contact the development team.
