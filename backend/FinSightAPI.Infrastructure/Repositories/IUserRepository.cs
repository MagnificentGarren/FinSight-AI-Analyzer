using FinSightAPI.Domain.Entities;

namespace FinSightAPI.Infrastructure.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetByIdAsync(int id);
        Task<User?> GetByEmailAsync(string email);
        Task<User> AddAsync(User user);
        Task<bool> SaveChangesAsync();
    }
}