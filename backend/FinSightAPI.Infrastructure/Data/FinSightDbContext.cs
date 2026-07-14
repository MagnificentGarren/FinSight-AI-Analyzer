using FinSightAPI.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinSightAPI.Infrastructure.Data
{
    public class FinSightDbContext : DbContext
    {
        public FinSightDbContext(DbContextOptions<FinSightDbContext> options) : base(options)
        {
        }

        // Define our database tables
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Expense> Expenses { get; set; } = null!;
        public DbSet<Budget> Budgets { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Decimal precision for financial calculations
            modelBuilder.Entity<Expense>()
                .Property(e => e.Amount)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Budget>()
                .Property(b => b.TargetAmount)
                .HasPrecision(18, 2);

            // Configure Relationships (One User has Many Expenses)
            modelBuilder.Entity<Expense>()
                .HasOne(e => e.User)
                .WithMany(u => u.Expenses)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure Relationships (One User has Many Budgets)
            modelBuilder.Entity<Budget>()
                .HasOne(b => b.User)
                .WithMany(u => u.Budgets)
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}