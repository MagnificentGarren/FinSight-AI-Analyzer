using FinSightAPI.Domain.Entities;

namespace FinSightAPI.Infrastructure.Repositories
{
    public interface IExpenseRepository
    {
        Task<Expense?> GetByIdAsync(int id);
        Task<IEnumerable<Expense>> GetByUserIdAsync(int userId);
        Task<Expense> AddAsync(Expense expense);
        Task<bool> SaveChangesAsync();
    }
}