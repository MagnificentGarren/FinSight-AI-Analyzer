using FinSightAPI.Domain.Entities;

namespace FinSightAPI.Infrastructure.Repositories
{
    public interface IBudgetRepository
    {
        Task<Budget?> GetByIdAsync(int id);
        Task<IEnumerable<Budget>> GetByUserIdAsync(int userId);
        Task<Budget?> GetByUserAndCategoryAsync(int userId, string category);
        Task<Budget> AddAsync(Budget budget);
        Task<bool> SaveChangesAsync();
    }
}