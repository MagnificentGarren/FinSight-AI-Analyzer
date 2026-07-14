using FinSightAPI.Domain.Entities;
using FinSightAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FinSightAPI.Infrastructure.Repositories
{
    public class BudgetRepository : IBudgetRepository
    {
        private readonly FinSightDbContext _context;

        public BudgetRepository(FinSightDbContext context)
        {
            _context = context;
        }

        public async Task<Budget?> GetByIdAsync(int id)
        {
            return await _context.Budgets.FindAsync(id);
        }

        public async Task<IEnumerable<Budget>> GetByUserIdAsync(int userId)
        {
            return await _context.Budgets
                .Where(b => b.UserId == userId)
                .ToListAsync();
        }

        public async Task<Budget?> GetByUserAndCategoryAsync(int userId, string category)
        {
            return await _context.Budgets
                .FirstOrDefaultAsync(b => b.UserId == userId && b.Category.ToLower() == category.ToLower());
        }

        public async Task<Budget> AddAsync(Budget budget)
        {
            await _context.Budgets.AddAsync(budget);
            return budget;
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}