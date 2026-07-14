using FinSightAPI.Domain.Entities;
using FinSightAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FinSightAPI.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly FinSightDbContext _context;

        public UserRepository(FinSightDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User> AddAsync(User user)
        {
            await _context.Users.AddAsync(user);
            return user;
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}